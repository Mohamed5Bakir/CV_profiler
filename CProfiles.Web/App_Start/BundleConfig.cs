using System.Web;
using System.Web.Optimization;

namespace CProfiles.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery-ui.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                    "~/Scripts/bootstrap.js",
                    "~/Scripts/bootstrap-datepicker.js",
                    "~/Scripts/bootstrap-datepicker.fr.js",
                    "~/Scripts/respond.js",
                    "~/Scripts/validator.js",
                    "~/Scripts/slidebars.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/Cyn-bootstrap.css",
                      "~/Content/font-awesome.css",
                      "~/Content/jquery-ui.css",
                      "~/Content/jquery-ui.structure.css",
                      "~/Content/bootstrap-datepicker3.css",
                      "~/Content/site.css",
                       "~/Content/badgeCorner.css",
                       "~/Content/slidebars.css"));

            bundles.Add(new StyleBundle("~/Content/UserProfile").Include(
                      "~/Content/UserProfile.css"));
            bundles.Add(new ScriptBundle("~/bundles/UserProfile").Include(
                     "~/Scripts/UserProfile.js"));
        }
    }
}
