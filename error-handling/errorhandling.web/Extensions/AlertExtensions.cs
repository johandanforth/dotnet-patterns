using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Mvc;

namespace errorhandling.web.Extensions;


public class Alert
{

    public Alert(string alertLevel, string message)
    {
        AlertLevel = alertLevel;
        Message = message;
    }

    public string AlertClass => "alert-" + AlertLevel;
    public string AlertLevel { get; set; }
    public string Message { get; set; }
}

public class AlertDecoratorResult : ActionResult
{
    public AlertDecoratorResult(ActionResult innerResult, string alertLevel, string message)
    {
        InnerResult = innerResult;
        AlertLevel = alertLevel;
        Message = message;
    }

    public ActionResult InnerResult { get; set; }

    public string AlertLevel { get; set; }

    public string Message { get; set; }


    public override async Task ExecuteResultAsync(ActionContext context)
    {
        if(context.HttpContext.RequestServices.GetService(typeof(ITempDataDictionaryFactory))
            is not ITempDataDictionaryFactory factory)
            return;

        var tempData = factory.GetTempData(context.HttpContext);

        var alerts = tempData.GetAlerts();
        if(alerts == null)
            alerts = new List<Alert>();
        alerts.Add(new Alert(AlertLevel, Message));
        tempData.Put("_Alerts", alerts);

        await InnerResult.ExecuteResultAsync(context);
    }
}


public static class AlertExtensions
{
    public static void Info(this ITempDataDictionary tempData, string message)
    {
        var alerts = tempData.GetAlerts();
        alerts.Add(new Alert("info", message));
        tempData.Put("_Alerts", alerts);
    }

    public static void Success(this ITempDataDictionary tempData, string message)
    {
        var alerts = tempData.GetAlerts();
        alerts.Add(new Alert("success", message));
        tempData.Put("_Alerts", alerts);
    }

    public static void Warning(this ITempDataDictionary tempData, string message)
    {
        var alerts = tempData.GetAlerts();
        alerts.Add(new Alert("warning", message));
        tempData.Put("_Alerts", alerts);
    }

    public static void Error(this ITempDataDictionary tempData, string message)
    {
        var alerts = tempData.GetAlerts();
        alerts.Add(new Alert("error", message));
        tempData.Put("_Alerts",alerts);
    }

    public static List<Alert> GetAlerts(this ITempDataDictionary tempData)
    {
        var alerts = tempData.Get<List<Alert>>("_Alerts");
        return alerts == null ? new List<Alert>() : alerts;
    }

    public static ActionResult WithSuccess(this ActionResult result, string message)
    {
        return new AlertDecoratorResult(result, "success", message);
    }

    public static ActionResult WithInfo(this ActionResult result, string message)
    {
        return new AlertDecoratorResult(result, "info", message);
    }

    public static ActionResult WithWarning(this ActionResult result, string message)
    {
        return new AlertDecoratorResult(result, "warning", message);
    }

    public static ActionResult WithError(this ActionResult result, string message)
    {
        return new AlertDecoratorResult(result, "error", message);
    }
}