using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WildflowerCoffeeGifts.Models
{
    public class ProductWithRelatedData
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public int ProductThemeId { get; set; }
        public string ProductThemeName { get; set; } // Anca: Added
        public int Price { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public int CoffeeMugId { get; set; }
        public string CoffeeMugName { get; set; } // Anca: Added
        public int flowerArrId { get; set; }
        public string FlowerArrName { get; set; } // Anca: Added
        public bool IsActive { get; set; } = true;
        public int QuantityAvailable { get; set; }
    }
}
