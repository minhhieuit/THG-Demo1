using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DemoTheHeGEO.Controllers
{
    public class HomeController : Controller
    {
        public DemoContext db = new DemoContext();
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            return View();
        }

        public ActionResult _Search()
        {
            var Categories = db.Categories.Where(o=>o.ParentID!=null).Select(o => new
            {
                CategoryID = o.ID,
                CategoryName = o.Name,
                ParentCate = db.Categories.FirstOrDefault(i => i.ID == o.ParentID && o.ParentID != null).Name
            }).ToList();
            ViewBag.Categories = new SelectList(Categories, "CategoryID", "CategoryName", "ParentCate", 1);
            return PartialView();
        }
    }
}
