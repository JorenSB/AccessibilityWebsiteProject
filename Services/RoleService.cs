using Microsoft.AspNetCore.Identity;

public interface IRoleService
{
    Task CreateRoles();
}

public class RoleService : IRoleService
{
    private readonly RoleManager<IdentityRole> _roleManager;

    public RoleService(RoleManager<IdentityRole> roleManager)
    {
        _roleManager = roleManager ?? throw new ArgumentNullException(nameof(roleManager));
    }

    public async Task CreateRoles()
    {
        await CreateRole("Admin");
        await CreateRole("Expert");
        await CreateRole("Company");
    }

    private async Task CreateRole(string roleName)
    {
        if (!await _roleManager.RoleExistsAsync(roleName))
        {
            await _roleManager.CreateAsync(new IdentityRole(roleName));
        }
    }
}
