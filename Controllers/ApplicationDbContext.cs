using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using Model.Users.Expert;

public class ApplicationDbContext : IdentityDbContext<User>
{
    //hieronder sets die je nodig hebt toevoegen.
    public DbSet<Company> Companies { get; set; }
    public DbSet<Expert> Experts { get; set; }
    public DbSet<Guardian> Guardians { get; set; }
    public DbSet<Disability> Disabilities { get; set; }
    public DbSet<DisabilityAid> DisabilityAids { get; set; }


    

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        DotNetEnv.Env.Load();
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
    }

    //prod connection
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

        var username = Environment.GetEnvironmentVariable("DB_USERNAME") ?? "default_username";
        var password = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "default_password";

        //local db connection
        var connectionString = "Server=LAPTOP-06LLPTJA\\SQLEXPRESS;Database=accesibilityProj;Trusted_Connection=True;TrustServerCertificate=True;Connection Timeout=30;";


        //prod db connection
        
        //var connectionString = $"Server=tcp:accessibility1.database.windows.net,1433;Initial Catalog=Accessibility2;Persist Security Info=False;User ID={username};Password={password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        optionsBuilder.UseSqlServer(connectionString, providerOptions => providerOptions.CommandTimeout(60));
        
    }

    
    
}
