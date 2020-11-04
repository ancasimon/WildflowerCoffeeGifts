using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WildflowerCoffeeGifts.Models
{
    public class ProductCount
    {
        public int Id { get; set; }
        public string Theme { get; set; }
        public bool IsActive { get; set; }
        public int Count { get; set; }
    }
}
