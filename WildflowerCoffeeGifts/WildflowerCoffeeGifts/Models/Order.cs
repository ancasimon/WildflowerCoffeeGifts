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
        public decimal TotalPrice { get; set; } = 0;
        public int PaymentTypeId { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string DeliveryAddress { get; set; }
        public bool IsActive { get; set; } = true;
        public List<ProductOrderWithProductInfo> LineItems { get; set; } = new List<ProductOrderWithProductInfo>();
        public string DeliveryCity { get; set; }
        public UsStates DeliveryState { get; set; }
        public string RecipientEmail { get; set; }
        public Int64 RecipientPhone { get; set; }
        public string RecipientFirstName { get; set; }
        public string RecipientLastName { get; set; }

    }
}
