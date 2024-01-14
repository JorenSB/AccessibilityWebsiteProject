using System.ComponentModel.DataAnnotations.Schema;

public class Address {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int AddressID {get; set;}
    public string Streetname { get; set; }
    public int HouseNumber { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
}