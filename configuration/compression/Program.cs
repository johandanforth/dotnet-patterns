using System.IO.Compression;

using Microsoft.AspNetCore.ResponseCompression;

var builder = WebApplication.CreateBuilder(args);

//NOTE: can also use BrotliCompression, which compresses more, but is slower
builder.Services.Configure<GzipCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Optimal;
});
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true; //NOTE: Enabling compression on HTTPS requests may be a security risk
    options.Providers.Add<GzipCompressionProvider>();
});

var app = builder.Build();

app.UseResponseCompression();

app.MapGet("/", () => "Hello World!");
app.MapGet("/favicon.ico", () => Results.File(File.ReadAllBytes("favicon.ico")));

app.Run();
