
using LongRunning.WebApi2.Services;
using LongRunning.WebApi2.Settings;

using Microsoft.AspNetCore.Server.IISIntegration;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

string MyAllowedSpecificOrigins = "_myAllowedSpecificOrigins";

//config options settings
services.Configure<SearchServiceOptions>(builder.Configuration.GetSection(nameof(SearchServiceOptions)));

services.AddCors(options =>
{

    options.AddPolicy(MyAllowedSpecificOrigins, corsPolicyBuilder =>
    {
        corsPolicyBuilder.WithOrigins("https://allowedhost.se");
    });
});

services.AddSingleton<IBackgroundTaskQueue>(ctx => new BackgroundTaskQueue(50));    //capacity
services.AddSingleton<SearchService>();
services.AddHostedService<QueuedHostedBackgroundService>(); //this processes the queue

services.AddAuthentication(IISDefaults.AuthenticationScheme);

services.AddControllers();
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(MyAllowedSpecificOrigins);
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers().RequireCors(MyAllowedSpecificOrigins);

app.Run();
