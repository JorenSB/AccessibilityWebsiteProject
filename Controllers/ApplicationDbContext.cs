using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Model.Users.Expert;

public class ApplicationDbContext : IdentityDbContext<User>
{
    //hieronder sets die je nodig hebt toevoegen.
    public DbSet<Company> Companies { get; set; }
    public DbSet<Expert> Experts { get; set; }
    public DbSet<Guardian> Guardians { get; set; }
    public DbSet<Disability> Disabilities { get; set; }
    public DbSet<DisabilityAid> DisabilityAids { get; set; }
    public DbSet<Admin> Admins { get; set; }
    public DbSet<Study> Studies { get; set; }
    public DbSet<Result> Results { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        DotNetEnv.Env.Load();
        // Database.EnsureCreated();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Tabelnamen configureren
        modelBuilder.Entity<Company>(entity => entity.ToTable("Companies"));
        modelBuilder.Entity<Expert>(entity => entity.ToTable("Experts"));
        modelBuilder.Entity<Guardian>(entity => entity.ToTable("Guardians"));
        modelBuilder.Entity<Disability>(entity => entity.ToTable("Disabilities"));
        modelBuilder.Entity<DisabilityAid>(entity => entity.ToTable("DisabilityAids"));

        // relaties

        modelBuilder.Entity<Expert>()
             .HasMany(e => e.Disabilities)
             .WithMany()
             .UsingEntity(j => j.ToTable("ExpertDisabilities"));

        modelBuilder.Entity<Expert>()
        .HasMany(e => e.DisabilityAids)
        .WithMany()
        .UsingEntity(j => j.ToTable("ExpertDisabilityAids"));
        modelBuilder.Entity<Study>(entity => entity.ToTable("Studies"));
        modelBuilder.Entity<Result>(entity => entity.ToTable("Results"));
        modelBuilder.Entity<Admin>(entity => entity.ToTable("Admins"));
        // Voeg eventueel andere configuraties toe
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // Gets the Variables from the .env file
        var isProd = Environment.GetEnvironmentVariable("DB_PROD")?.Equals("true", StringComparison.OrdinalIgnoreCase) ?? false;
        var database = Environment.GetEnvironmentVariable("DB_NAME");
        var host = Environment.GetEnvironmentVariable("DB_HOST");
        var username = Environment.GetEnvironmentVariable("DB_USERNAME");
        var password = Environment.GetEnvironmentVariable("DB_PASSWORD");
        var timeout = Environment.GetEnvironmentVariable("DB_TIMEOUT");

        // Common options
        var persistSecurityInfo = "False";
        var multipleActiveResultSets = "False";
        var connectionString = $"Server={host};Database={database};Timeout={timeout};Persist Security Info={persistSecurityInfo};MultipleActiveResultSets={multipleActiveResultSets};User ID={username};Password={password};";

        // Environment-specific options
        if (isProd)
        {
            connectionString += $";TrustServerCertificate=False;Encrypt=True;Trusted_Connection=False;";
        }
        else
        {
            connectionString += $";TrustServerCertificate=True;Encrypt=False;Trusted_Connection=True;";
        }

        optionsBuilder.UseSqlServer(connectionString);
    }
}