using System.Web;
using System.Web.Optimization;

namespace DemoTheHeGEO
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/ajax").Include(
                       "~/Scripts/jquery.unobtrusive-ajax.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/main").Include(
                      "~/Scripts/main.js"));
            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/admin/vendor/bootstrap/css/bootstrap.min.css",
                      "~/Content/admin/vendor/font-awesome/css/font-awesome.min.css",
                      "~/Content/admin/vendor/datatables/dataTables.bootstrap4.css",
                      "~/Content/admin/css/sb-admin.css"
                      ));
            bundles.Add(new ScriptBundle("~/admin/js").Include(
                       "~/Content/admin/vendor/popper/popper.min.js",
                        "~/Scripts/bootstrap-modal/js/bootstrap-modal.js",
                       "~/Scripts/bootstrap-modal/js/bootstrap-modalmanager.js",
                       "~/Content/admin/vendor/bootstrap/js/bootstrap.min.js",
                       "~/Content/admin/vendor/jquery-easing/jquery.easing.min.js",
                       "~/Content/admin/vendor/vendor/datatables/jquery.dataTables.js",
                       "~/Content/admin/vendor/vendor/datatables/dataTables.bootstrap4.js",
                       "~/Scripts/main.js",
                       "~/Content/admin/main.js"
                       ));
            bundles.Add(new StyleBundle("~/admin/css").Include(
                    "~/Content/admin/vendor/bootstrap/css/bootstrap.min.css",
                    "~/Scripts/bootstrap-modal/css/bootstrap-modal.css",
                    "~/Content/admin/vendor/font-awesome/css/font-awesome.min.css",
                    "~/Content/admin/vendor/datatables/dataTables.bootstrap4.css",
                    "~/Content/sb-admin.css"
                    ));
        }
    }
}
