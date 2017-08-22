using DemoTheHeGEO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DemoTheHeGEO.Areas.Admin.Controllers
{
    public class AdminController : Controller
    {
        DemoContext db = new DemoContext();
        // GET: Admin/Home
        public ActionResult Index()
        {
            var Places = db.Places.ToList();
            return View(Places);
        }

        [HttpGet]
        public ActionResult Create()
        {
            var Categories = db.Categories.Where(o=>o.ParentID!=null).Select(o => new
            {
                CategoryID = o.ID,
                CategoryName = o.Name,
                ParentCate = db.Categories.FirstOrDefault(i => i.ID == o.ParentID && o.ParentID != null).Name
            }).ToList();
            ViewBag.Categories = new SelectList(Categories, "CategoryID", "CategoryName", "ParentCate", 1);
            var Districts = db.Districts.Select(o => new
            {
                DistrictID = o.ID,
                DistrictName = o.Name
            }).ToList();
            ViewBag.Districts = new SelectList(Districts, "DistrictID", "DistrictName");
            return View();
        }

        [HttpPost]
        public ActionResult Create(Place entity)
        {
            if (ModelState.IsValid)
            {
                db.Entry<Place>(entity).State = System.Data.Entity.EntityState.Added;
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
                var Place = db.Places.Find(id);
                var Categories = db.Categories.Select(o => new
                {
                    CategoryID = o.ID,
                    CategoryName = o.Name,
                    ParentCate = db.Categories.FirstOrDefault(i => i.ID == o.ParentID && o.ParentID != null).Name,
                    Selected = Place.CategoryID
                }).ToList();
                ViewBag.Categories = new SelectList(Categories, "CategoryID", "CategoryName", "ParentCate", Place.CategoryID);
                var Districts = db.Districts.Select(o => new
                {
                    DistrictID = o.ID,
                    DistrictName = o.Name,
                    Selected = Place.DistrictID
                }).ToList();
                ViewBag.Districts = new SelectList(Districts, "DistrictID", "DistrictName", Place.DistrictID);
                return View(Place);

            }
            return View();
        }
        [HttpPost]
        public ActionResult Edit(Place entity)
        {
            if (ModelState.IsValid)
            {
                db.Entry<Place>(entity).State = System.Data.Entity.EntityState.Modified;
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
            var Place = db.Places.Find(id);
            return View(Place);

        }
        public ActionResult Delete(int? id)
        {
            var Places = db.Places.Find(id);
            if (Places != null)
            {
                db.Places.Remove(Places);
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