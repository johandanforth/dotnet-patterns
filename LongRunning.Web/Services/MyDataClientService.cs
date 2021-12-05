
using System.Text.Json;

namespace LongRunning.Web.Services;

public class MyDataClientService
{
    private IConfiguration _configurations;
    private IHttpClientFactory _clientFactory;
    private JsonSerializerOptions _jsonSerializerOptions;

    public MyDataClientService(
    IConfiguration configurations,
    IHttpClientFactory clientFactory)
    {
        _configurations = configurations;
        _clientFactory = clientFactory;
        _jsonSerializerOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
        };
    }

    public async Task<List<string>> GetMyData()
    {
        try
        {
            var client = _clientFactory.CreateClient("windowsAuthClient");
            client.BaseAddress = new Uri(_configurations["MyApiUrl"]);

            var response = await client.GetAsync("api/MyData");
            if (response.IsSuccessStatusCode)
            {
                var data = await JsonSerializer.DeserializeAsync<List<string>>(
                await response.Content.ReadAsStreamAsync());

                return data;
            }

            var error = await response.Content.ReadAsStringAsync();
            throw new ApplicationException($"Status code: {response.StatusCode}, Error: {response.ReasonPhrase}, Message: {error}");

        }
        catch (Exception e)
        {
            throw new ApplicationException($"Exception {e}");
        }
    }
}
