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
        public int Price { get; set; }
        public string Description { get; set; }

        // if reach stretch goal use these
        // public int CoffeeMugId { get; set; }
        // public int FlowerArrangementId { get; set; }
    }
}
