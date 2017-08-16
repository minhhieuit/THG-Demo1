namespace DemoTheHeGEO
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class DemoContext : DbContext
    {
        public DemoContext()
            : base("name=DemoContext")
        {
        }

        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Place> Places { get; set; }
        public virtual DbSet<PlaceCategory> PlaceCategories { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Place>()
                .Property(e => e.Phone)
                .IsFixedLength();

            modelBuilder.Entity<Place>()
                .Property(e => e.Email)
                .IsFixedLength();

            modelBuilder.Entity<Place>()
                .Property(e => e.Website)
                .IsFixedLength();

            modelBuilder.Entity<Place>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Place>()
                .Property(e => e.Price)
                .HasPrecision(19, 4);
        }
    }
}
