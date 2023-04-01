namespace LongRunning.WebApi.Models;

internal record ErrorMessage(string Message, Exception? Exception);
