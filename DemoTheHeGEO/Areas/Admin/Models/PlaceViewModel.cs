using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DemoTheHeGEO.Areas.Admin.Models
{
    public class PlaceViewModel
    {
        public Category Category { get; set; }
        public District District { get; set; }
    }
    public class CategoryModel
    {
        public int ID { get; set; }

        public int? ParentID { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        public Status Status { get; set; }
    }
    public enum Status
    {
        Disable = 0,
        On = 1,
        Off = 2
    }
}