# compression

Use server-based response compression technologies in IIS, Apache, or Nginx. The performance of the middleware probably won't match that of the server modules. HTTP.sys server server and Kestrel server don't currently offer built-in compression support.

Use Response Compression Middleware when you're:
- Unable to use the following server-based compression technologies:
- IIS Dynamic Compression module
- Apache mod_deflate module
- Nginx Compression and Decompression

Hosting directly on:
- HTTP.sys server (formerly called WebListener)
- Kestrel server