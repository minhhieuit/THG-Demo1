using DemoTheHeGEO.Areas.Admin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DemoTheHeGEO.Areas.Admin.Controllers
{
    public class CategoryController : Controller
    {
        DemoContext db = new DemoContext();
        // GET: Admin/Category
        public ActionResult Index()
        {
            var Categories = db.Categories.ToList();
            return View(Categories);
        }
        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Create(Category entity)
        {

            if (ModelState.IsValid)
            {
                db.Entry<Category>(entity).State = System.Data.Entity.EntityState.Added;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            else
            {
                return View(entity);
            }
        }
        [HttpGet]
        public ActionResult Edit(int id)
        {
            if (id > 0)
            {
                var Cate = db.Categories.Find(id);
                var Category = new CategoryModel
                {
                    ParentID = Cate.ParentID,
                    Name=Cate.Name,
                    Status = (Status)Cate.Status
                };

                var Categories = db.Categories.Select(o => new
                {
                    CategoryID = o.ID,
                    CategoryName = o.Name,
                    ParentCate = db.Categories.FirstOrDefault(i => i.ID == o.ParentID && o.ParentID != null).Name,
                    Selected = Cate.ParentID
                }).ToList();
                ViewBag.Categories = new SelectList(Categories, "CategoryID", "CategoryName", "ParentCate", Cate.ParentID);
                return View(Category);

            }
            return View();
        }
        [HttpPost]
        public ActionResult Edit(Category entity)
        {
            int ParentID = Convert.ToInt32(Request.Form["CategoryID"]);
            if (ModelState.IsValid)
            {
                entity.ParentID = ParentID;
                db.Entry<Category>(entity).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            else
            {
                return View(entity);
            }
        }
        public ActionResult Details(int id)
        {
            var Category = db.Categories.Find(id);
            var Cate = new CategoryModel
            {
                Name = Category.Name,
                ParentID = Category.ParentID,
                Status = (Status)Category.Status
            };
            return View(Cate);

        }
        public ActionResult Delete(int? id)
        {
            var Category = db.Categories.Find(id);
            if (Category != null)
            {
                db.Categories.Remove(Category);
                db.SaveChanges();
                return Json(new { status = "success" });
            }
            else
            {
                return Json(new { status = "error" });
            }
        }
    }
}