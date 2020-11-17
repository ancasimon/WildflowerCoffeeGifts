using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WildflowerCoffeeGifts.Models
{
    public class ProductOrderWithProductInfo
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public int Qty { get; set; }
        public bool IsActive { get; set; } = true;
        public string Title { get; set; } // product title from the Products table
        public decimal Price { get; set; } // product price from the Products table
        public decimal Subtotal { get; set; } // added this property for the calculation of the line item subtotal
        public string ImageUrl { get; set; } // product image from the Products table
    }
}
