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
            return Ok(db.Categories.FirstOrDefault(o=>o.ID == id));
        }

        [HttpGet]
        public IHttpActionResult GetAllMarkers()
        {
            var Places = db.Places.Select(o=> new {
                lat = o.MapLatitude,
                lng = o.MapLongitude,
                name = o.Name
            }).ToList();
            return Ok(Places);
        }
        // GET api/values/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
