using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using DotNetEnv;

public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Company> Companies { get; set; }

    public DbSet<Expert> Experts { get; set; }

    public string DbPath { get; }

    public ApplicationDbContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "blogging.db");
        DotNetEnv.Env.Load();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var username = Environment.GetEnvironmentVariable("DB_USERNAME") ?? "default_username";
        var password = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "default_password";

        var connectionString = $"Server=tcp:accessibilityserver.database.windows.net,1433;Initial Catalog=AccessibilityDB;Persist Security Info=False;User ID={username};Password={password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        optionsBuilder.UseSqlServer(connectionString, providerOptions => providerOptions.CommandTimeout(60));
}


}