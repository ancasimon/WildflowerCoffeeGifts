using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WildflowerCoffeeGifts.Models
{
    public class AdminOrderItem
    {
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public int Qty { get; set; }
        public bool IsActive { get; set; } = true;
        public string Title { get; set; } // product title from the Products table
        public decimal TotalPrice { get; set; } // product price from the Products table

    }
}
