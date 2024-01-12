using System.ComponentModel.DataAnnotations;

public class Address {
    [Key]
    public int AddressID {get; set;}
    public string Streetname { get; set; }
    public int HouseNumber { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
}