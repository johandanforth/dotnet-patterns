
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System.Web;

namespace mvc.vue.Extensions
{
	public static class HtmlExt
	{
		public static string Vue(this HtmlHelper helper, string filepath)
		{
			var filePath = "/wwwroot/Vue/" + filepath + ".vue";
			if (File.Exists(filePath))
			{
				var vueContent = File.ReadAllText(filePath);
				return vueContent;

			}

			throw new Exception("File does not exist: " + filePath);
		}
	}
}
