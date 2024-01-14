using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;

public class ApplicationDbContext : IdentityDbContext<User>
{
    //hieronder sets die je nodig hebt toevoegen.
    public DbSet<Company> Companies { get; set; }
    public DbSet<Expert> Experts { get; set; }
    public DbSet<Study> Studies { get; set; }
    public DbSet<Result> Results { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        DotNetEnv.Env.Load();
        // Database.EnsureCreated();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //hier wordt de table aangemaakt dus voeg wederom je set toe
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Company>(entity => entity.ToTable("Companies"));
        modelBuilder.Entity<Expert>(entity => entity.ToTable("Experts"));
        modelBuilder.Entity<Study>(entity => entity.ToTable("Studies"));
        modelBuilder.Entity<Result>(entity => entity.ToTable("Results"));
        // Voeg eventueel andere configuraties toe
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var IP = Environment.GetEnvironmentVariable("DB_IP") ?? "default_ip";
        var port = Environment.GetEnvironmentVariable("DB_PORT") ?? "default_port";
        var database = Environment.GetEnvironmentVariable("DB_NAME") ?? "default_datbase";
        var username = Environment.GetEnvironmentVariable("DB_USERNAME") ?? "default_username";
        var password = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "default_password";

        var connectionString = $"Server=tcp:accessibility1.database.windows.net,1433;Initial Catalog=Accessibility2;Persist Security Info=False;User ID={username};Password={password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        optionsBuilder.UseSqlServer(connectionString, providerOptions => providerOptions.CommandTimeout(60));
            }
}
 