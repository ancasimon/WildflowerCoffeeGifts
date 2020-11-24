using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WildflowerCoffeeGifts.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DateCreated { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; } = true;
        public string Address { get; set; }
        public string City { get; set; }
        public Int64 PhoneNumber { get; set; }
        public UsStates UsState { get; set; }
        public int Zipcode { get; set; }
        public string Uid { get; set; }
    }
}
