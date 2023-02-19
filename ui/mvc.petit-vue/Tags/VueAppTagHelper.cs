using Microsoft.AspNetCore.Razor.TagHelpers;
using mvc.vue.Extensions;

namespace mvc.vue.Tags;

[HtmlTargetElement("vue-app")]
[HtmlTargetElement("vue-component")]
public class VueTagHelper : TagHelper
{
	public override void Process(TagHelperContext context, TagHelperOutput output)
	{
		var dir = "apps";
		if (context.TagName.IndexOf("-", StringComparison.Ordinal) > 0)
		{
			dir = context.TagName.Substring(context.TagName.IndexOf("-", StringComparison.Ordinal) + 1) + "s";
		}

		output.TagName = "";
		output.TagMode = TagMode.StartTagAndEndTag;
		TagHelperExt.OutputRawContent(context, output, dir);
	}
}