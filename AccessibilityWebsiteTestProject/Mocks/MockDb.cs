using Microsoft.EntityFrameworkCore;
using Model.Users.Expert;
using Microsoft.Extensions.DependencyInjection;


public class MockDbContext : ApplicationDbContext
{
    public MockDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Expert> MockExperts { get; set; }
    public DbSet<Disability> MockDisabilities{get;set;}
    public DbSet<DisabilityAid> MockDisabilityAids{get;set;}

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);

        // Ensure that the context is configured to use the in-memory database
        optionsBuilder.UseInMemoryDatabase("MockDatabase");
    }
}

public class MockDbContextFactory
{
    public static MockDbContext CreateMockContext()
    {
        // Unique database name for each test
        var databaseName = Guid.NewGuid().ToString();

        var serviceProvider = new ServiceCollection()
            .AddEntityFrameworkInMemoryDatabase()
            .BuildServiceProvider();

        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName)
            .UseInternalServiceProvider(serviceProvider)
            .Options;

        using (var context = new MockDbContext(options))
        {
            // Initialize dbsets
            context.MockExperts = context.Set<Expert>();
            context.MockDisabilities= context.Set<Disability>();
            context.MockDisabilityAids = context.Set<DisabilityAid>();

            // Add data to DbSet<Expert>
            context.MockExperts.AddRange(new List<Expert>
            {
                new Expert
                {
                    Id = "2",
                    UserName = "test@example.com",
                    FirstName = "John",
                    LastName = "Doe",
                    PhoneNumber = "123456789",
                    BirthDate = new DateTime(1990, 1, 1),
                    Disabilities = new List<Disability> { new Disability { DisabilityName = "doof" } },
                    DisabilityAids = new List<DisabilityAid>{new DisabilityAid { DisabilityAidId = "1",  DisabilityAidName = "gehoor apparaat"}},
                    CommercialContact = true,
                    PhonePreference = true,
                    EmailPreference = false
                }
            });
            // Add data to DbSet<disabilities>
            context.MockDisabilities.AddRange(new List<Disability>
            {
                new Disability
                {
                    DisabilityId = "2",
                    DisabilityName = "doof"
                }
            });
            // Add data to DbSet<disabilityAids>
            context.MockDisabilityAids.AddRange(new List<DisabilityAid>
            {
                new DisabilityAid
                {
                    DisabilityAidId = "2",
                    DisabilityAidName = "gehoor apparaat"
                }
            });

            context.SaveChanges();
        }

        var finalOptions = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName)
            .UseInternalServiceProvider(serviceProvider)
            .Options;

        var finalContext = new MockDbContext(finalOptions);

        return finalContext;
    }
}
