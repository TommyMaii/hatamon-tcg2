
export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const body = await request.json(); // { items: [{ id, qty }] }

    const PRICE_MAP = {
      'booster-box-surging-sparks': env.PRICE_SURGING_SPARKS,
      'etb-destined-rivals': env.PRICE_DESTINED_RIVALS,
      'bundle-prismatic-evolutions': env.PRICE_PRISMATIC_EVOLUTIONS,
      'etb-black-bolt': env.PRICE_BLACK_BOLT,
      'etb-white-flame': env.PRICE_WHITE_FLAME,
    };

    const line_items = [];
    for (const item of body?.items || []) {
      const priceId = PRICE_MAP[item.id];
      if (priceId) {
        line_items.push({ price: priceId, quantity: Math.max(1, Math.min(item.qty || 1, 99)) });
      }
    }

    if (!line_items.length) {
      return new Response(JSON.stringify({ error: 'No valid items' }), {
        status: 400, headers: { 'Content-Type': 'application/json' }
      });
    }

    const origin = new URL(request.url).origin;
    const form = new URLSearchParams({
      mode: 'payment',
      success_url: `${origin}/takk`,
      cancel_url: `${origin}/kasse`,
    });
    line_items.forEach((li, i) => {
      form.append(`line_items[${i}][price]`, li.price);
      form.append(`line_items[${i}][quantity]`, String(li.quantity));
    });

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
    });

    const data = await res.json();
    if (!res.ok) {
      return new Response(JSON.stringify({ error: data?.error?.message || 'Stripe error' }), {
        status: res.status, headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ url: data.url }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: `Function error: ${err.message}` }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }
}
