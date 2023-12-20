using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccessibilityWebsiteProject.Migrations
{
    /// <inheritdoc />
    public partial class addeduserscompaniesandexperts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Wachtwoord = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    telefoonnummer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    rol = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    information = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KvkNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    firstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    lastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    contactPreference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    canContactForCommercialPurposes = table.Column<bool>(type: "bit", nullable: true),
                    birthday = table.Column<DateTime>(type: "datetime2", nullable: true),
                    profileComplete = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
