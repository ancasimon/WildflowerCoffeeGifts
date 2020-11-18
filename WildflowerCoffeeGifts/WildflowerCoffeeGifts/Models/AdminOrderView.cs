using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WildflowerCoffeeGifts.Models
{
    public class AdminOrderView
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public decimal TotalPrice { get; set; } = 0;
        public List<ProductOrderWithProductInfo> LineItems { get; set; } = new List<ProductOrderWithProductInfo>();

    }
}
