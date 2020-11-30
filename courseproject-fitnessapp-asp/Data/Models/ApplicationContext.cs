﻿using courseproject_fitnessapp_asp.Data;
using Microsoft.EntityFrameworkCore;


namespace courseproject_fitnessapp_asp
{
    public class ApplicationContext : DbContext 
    {
        public DbSet<FoodItem> food { get; set; }
        public DbSet<FoodType> foodtypes { get; set; }
        public DbSet<Account> accounts { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<Goal> goals { get; set; }
        public DbSet<Activity> activity { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
             : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();
            return base.SaveChanges();
        }

    }
}
