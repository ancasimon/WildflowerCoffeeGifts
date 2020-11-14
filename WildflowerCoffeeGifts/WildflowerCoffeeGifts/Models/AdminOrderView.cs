using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WildflowerCoffeeGifts.Models
{
    public class AdminOrderView
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Qty { get; set; }
        public decimal TotalPrice { get; set; } = 0;
        public DateTime PurchaseDate { get; set; }
        public bool IsActive { get; set; } = true;
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public bool IsCompleted { get; set; }
        public string PaymentOption { get; set; }
    }
}
