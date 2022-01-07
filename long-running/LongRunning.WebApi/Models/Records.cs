namespace LongRunning.WebApi2.Models;

internal record ErrorMessage(string Message, Exception? Exception);
