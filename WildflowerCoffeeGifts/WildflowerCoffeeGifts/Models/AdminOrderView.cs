using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WildflowerCoffeeGifts.Models
{
    public class AdminOrderView
    {
        public int id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime PurchaseDate { get; set; }
        public bool IsCompleted { get; set; }
        public string PaymentType { get; set; }

        public List<AdminOrderItem> LineItems { get; set; } = new List<AdminOrderItem>();

    }
}
