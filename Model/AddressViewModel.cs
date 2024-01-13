public class AddressViewModel {
    public string Streetname { get; set; }
    public int HouseNumber { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public AddressViewModel(Address address)
    {
        if (address != null)
        {
            Streetname = address.Streetname;
            HouseNumber = address.HouseNumber;
            City = address.City;
            Country = address.Country;
        }
    }
}