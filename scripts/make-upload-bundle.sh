
#!/usr/bin/env bash
set -e
rm -rf upload-bundle
mkdir -p upload-bundle/functions/api
cp -r dist/* upload-bundle/
cp -r functions/api/* upload-bundle/functions/api/
[ -f public/_redirects ] && cp public/_redirects upload-bundle/_redirects || true
(cd upload-bundle && zip -r ../upload-bundle.zip .)
