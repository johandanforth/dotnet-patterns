using Microsoft.AspNetCore.Authentication.Negotiate;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var services = builder.Services;
services.AddControllersWithViews();

services.AddAuthentication(NegotiateDefaults.AuthenticationScheme)
   .AddNegotiate();

services.AddAuthorization(options =>
{
    // By default, all incoming requests will be authorized according to the default policy.
    options.FallbackPolicy = options.DefaultPolicy;
});
services.AddRazorPages();
services.AddHttpContextAccessor();
services.AddHttpClient("webapi", c =>
    {
        c.BaseAddress = new Uri(builder.Configuration.GetValue<string>("webapiurl"));
    })
    .ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler()
    {
        UseDefaultCredentials = true
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if(!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
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

app.Run();
