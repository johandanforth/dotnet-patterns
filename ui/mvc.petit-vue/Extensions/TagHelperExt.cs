using Microsoft.AspNetCore.Razor.TagHelpers;

namespace mvc.vue.Extensions;

public static class TagHelperExt
{
	public static void OutputRawContent(TagHelperContext context, TagHelperOutput output,
        string dir)
    {
        var nameAttr = context.AllAttributes["name"];
        var name = nameAttr?.Value.ToString();
        if (string.IsNullOrEmpty(name))
            return;

        var currDir = Directory.GetCurrentDirectory();
        var filePath = currDir + "/wwwroot/Vue/" + dir + "/" + name + ".vue";

        if (!File.Exists(filePath))
            throw new Exception("Vue " + dir + " does not exist: " + name);

        var vueContent = File.ReadAllText(filePath);
        output.Content.SetHtmlContent(vueContent);
    }
}