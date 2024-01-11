using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;

public class ApplicationDbContext : IdentityDbContext<User>
{
    //hieronder sets die je nodig hebt toevoegen.
    public DbSet<Company> Companies { get; set; }
    public DbSet<Expert> Experts { get; set; }
    

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        DotNetEnv.Env.Load();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //hier wordt de table aangemaakt dus voeg wederom je set toe
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Company>(entity => entity.ToTable("Companies"));
        modelBuilder.Entity<Expert>(entity => entity.ToTable("Experts"));
        // Voeg eventueel andere configuraties toe
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var DBname = Environment.GetEnvironmentVariable("DB_NAME") ?? "default_username";
        var DBhost = Environment.GetEnvironmentVariable("DB_HOST") ?? "default_password";
        var DBport = Environment.GetEnvironmentVariable("DB_PORT") ?? "default_password";

        var username = Environment.GetEnvironmentVariable("DB_USERNAME") ?? "default_username";
        var password = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "default_password";

        var connectionString = $"Server=tcp:{DBhost},{DBport};Initial Catalog={DBname};Persist Security Info=False;User ID={username};Password={password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
        optionsBuilder.UseSqlServer(connectionString, providerOptions => providerOptions.CommandTimeout(60));

        //Local
        //optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS02;Database=testDB;Trusted_Connection=True;TrustServerCertificate=True;Connection Timeout=30;");
    }
}
