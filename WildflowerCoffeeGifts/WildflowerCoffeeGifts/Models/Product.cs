using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WildflowerCoffeeGifts.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public int ProductThemeId { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public int CoffeeMugId { get; set; }
        public int flowerArrId { get; set; }
        public int QuantityAvailable { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
