using DokkyFlights.API.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace DokkyFlights.API.Data
{
    public class Entities : DbContext
    {
        public Entities(DbContextOptions<Entities> options) : base(options) { }
        public DbSet<Passenger> Passangers => Set<Passenger>();
        public DbSet<Flight> Flights => Set<Flight>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Passenger>().HasKey(p => p.Email);

            modelBuilder.Entity<Flight>().Property(p => p.RemainingNumberOfSeats).IsConcurrencyToken();
        
            modelBuilder.Entity<Flight>().OwnsOne(f => f.Departure);
            modelBuilder.Entity<Flight>().OwnsOne(f => f.Arrival);

            modelBuilder.Entity<Flight>().OwnsMany(f => f.Bookings);
        }
    }
}
