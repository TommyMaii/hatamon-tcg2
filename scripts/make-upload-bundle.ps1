
Remove-Item -Recurse -Force upload-bundle -ErrorAction SilentlyContinue
New-Item -ItemType Directory upload-bundle | Out-Null
Copy-Item dist\* -Destination upload-bundle -Recurse
New-Item -ItemType Directory upload-bundle\functions\api -Force | Out-Null
Copy-Item functions\api\* upload-bundle\functions\api\ -Recurse
if (Test-Path public\_redirects) { Copy-Item public\_redirects upload-bundle\_redirects }
Compress-Archive -Path upload-bundle\* -DestinationPath upload-bundle.zip -Force
