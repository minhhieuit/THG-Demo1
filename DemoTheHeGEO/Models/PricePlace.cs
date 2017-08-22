using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace DemoTheHeGEO.Models
{
    public class SearchObj
    {
        public int Type { get; set; }
        public decimal? PriceBegin { get; set; }
        public decimal? PriceEnd { get; set; }
        public int? District { get; set; }
        public int? Category { get; set; }
        public string Content { get; set; }
    }

    public class PlaceObj
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public double? MapLatitude { get; set; }
        public double? MapLongitude { get; set; }
        public decimal? Price { get; set; }
        [DisplayName("Category")]
        public Category Category { get; set; }
        public District District { get; set; }

    }

    public enum SearchParaType
    {
        FullSearch = 0,
        DistrictSearch = 1,
    }
}