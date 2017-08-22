namespace DemoTheHeGEO
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Place")]
    public partial class Place
    {
        public int ID { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(12)]
        public string Phone { get; set; }

        [Display(Name = "Email address")]
        [Required(ErrorMessage = "The email address is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        [StringLength(255)]
        public string Email { get; set; }

        [StringLength(255)]
        public string Website { get; set; }

        [Column(TypeName = "text")]
        public string Description { get; set; }

        [StringLength(50)]
        public string Address { get; set; }

        public double? MapLatitude { get; set; }

        public double? MapLongitude { get; set; }

        [Column(TypeName = "money")]
        public decimal? Price { get; set; }

        public int? CategoryID { get; set; }

        public int? DistrictID { get; set; }
        [Display(Name = "Category")]
        public virtual Category Category { get; set; }
        [Display(Name = "District")]
        public virtual District District { get; set; }
    }
}
