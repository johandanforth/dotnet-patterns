
using System.Text.Json;

using LongRunning.Web.Services;

using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

services.AddAuthentication(IISDefaults.AuthenticationScheme);
services.AddHttpClient();
services.AddHttpClient("windowsAuthClient", c => { }).ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler() { UseDefaultCredentials = true });
services.AddScoped<MyDataClientService>();
services.AddControllersWithViews().AddJsonOptions(option => option.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

//test med lokal api
app.MapGet("/test", () => { return new string[] { "Johan", "Kalle" }; });

app.Run();
