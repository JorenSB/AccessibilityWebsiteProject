// using Microsoft.EntityFrameworkCore;
// using System;
// using System.Collections.Generic;
// using DotNetEnv;

// public class ApplicationDbContext : DbContext
// {
//     public DbSet<User> Users { get; set; }
//     public DbSet<Company> Companies { get; set; }

//     public DbSet<Expert> Experts { get; set; }

//     public string DbPath { get; }

//      public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
//     {
//         DotNetEnv.Env.Load();
//     }

//     protected override void OnModelCreating(ModelBuilder modelBuilder)
//     {
//         base.OnModelCreating(modelBuilder);
//         modelBuilder.Entity<User>(entity => entity.ToTable("Users"));
//         modelBuilder.Entity<Company>(entity => entity.ToTable("Companies"));
//         modelBuilder.Entity<Expert>(entity => entity.ToTable("Experts"));
//     }

//     protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//     {
//         var username = Environment.GetEnvironmentVariable("DB_USERNAME") ?? "default_username";
//         var password = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "default_password";

//         var connectionString = $"Server=tcp:accessibilityserver.database.windows.net,1433;Initial Catalog=AccessibilityDB;Persist Security Info=False;User ID={username};Password={password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

//         optionsBuilder.UseSqlServer(connectionString, providerOptions => providerOptions.CommandTimeout(60));
        
// }


// }

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;

public class ApplicationDbContext : IdentityDbContext<User>
{
    public DbSet<Company> Companies { get; set; }
    public DbSet<Expert> Experts { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        DotNetEnv.Env.Load();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Company>(entity => entity.ToTable("Companies"));
        modelBuilder.Entity<Expert>(entity => entity.ToTable("Experts"));
        // Voeg eventueel andere configuraties toe
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var username = Environment.GetEnvironmentVariable("DB_USERNAME") ?? "default_username";
        var password = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "default_password";

        var connectionString = $"Server=tcp:accessibilityserver.database.windows.net,1433;Initial Catalog=AccessibilityDB;Persist Security Info=False;User ID={username};Password={password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        optionsBuilder.UseSqlServer(connectionString, providerOptions => providerOptions.CommandTimeout(60));
    }
}
