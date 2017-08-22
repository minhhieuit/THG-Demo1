using DemoTheHeGEO.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DemoTheHeGEO.Controllers
{
    public class PlaceController : ApiController
    {
        // GET api/values
        DemoContext db = new DemoContext();
        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            return Ok(db.Categories.FirstOrDefault(o => o.ID == id));
        }

        [HttpGet]
        public IHttpActionResult GetAllMarkers()
        {
            var Places = db.Places.Select(o => new PlaceObj
            {
                ID = o.ID,
                Name = o.Name,
                Email = o.Email,
                Website = o.Website,
                Description = o.Description,
                Phone = o.Phone,
                Address = o.Address,
                Price = o.Price,
                MapLatitude = o.MapLatitude,
                MapLongitude = o.MapLongitude,
                Category = o.Category,
            }).ToList();
            return Ok(Places);
        }

        [HttpGet]
        public IHttpActionResult GetCenter(int District)
        {
            var district = db.Districts.Where(o => o.ID == District).FirstOrDefault();
            return Ok(district);
        }

        [HttpGet]
        public IHttpActionResult GetMarkerByName(string name)
        {
            if (name != null)
            {
                if (db.Places.Where(o => o.Name.Contains(name)).Any())
                {
                    return Ok(db.Places.Where(o => o.Name.Contains(name)).Select(o => new
                    {
                        lat = o.MapLatitude,
                        lng = o.MapLongitude,
                        name = o.Name,
                        category = db.Categories.Where(i => i.ID == o.CategoryID).Select(s => s.Name)
                    }).ToList());
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {

                return Ok();
            }
        }

        [HttpPost]
        public IEnumerable<object> Post([FromBody] List<SearchObj> value)
        {

            foreach (var item in value)
            {
                if (item.Type == (int)SearchParaType.FullSearch)
                {
                    var Places = db.Places.Where(p =>
                    (
                        ((item.PriceBegin == null || item.PriceBegin <= p.Price)
                        && (item.PriceEnd == null || item.PriceEnd >= p.Price))
                        && (item.Category == null || p.CategoryID == item.Category)
                    )
                    ).Select(o => new PlaceObj
                    {
                        ID = o.ID,
                        Name = o.Name,
                        Email = o.Email,
                        Website = o.Website,
                        Description = o.Description,
                        Phone = o.Phone,
                        Address = o.Address,
                        Price = o.Price,
                        MapLatitude = o.MapLatitude,
                        MapLongitude = o.MapLongitude,
                        Category = o.Category,
                    }).ToList();

                    return Places;
                }
                else
                {
                    return null;
                }
            }
            return null;
        }
    }
}
