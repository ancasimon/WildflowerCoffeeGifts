using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WildflowerCoffeeGifts.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public bool IsCompleted { get; set; }
        public decimal TotalPrice { get; set; }
        public int PaymentTypeId { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string DeliveryAddress { get; set; }
        public bool IsActive { get; set; } = true;

    }
}
