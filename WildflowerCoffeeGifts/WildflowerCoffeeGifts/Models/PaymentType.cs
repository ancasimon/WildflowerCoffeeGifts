using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WildflowerCoffeeGifts.Models
{
    public class PaymentType
    {
        public int Id { get; set; }
        // changed to PaymentOption due to class being called PaymentType
        public string PaymentOption { get; set; }
        public int UserId { get; set; }
        public int AccountNo { get; set; }
        public int ExpirationMonth { get; set; }
        public int ExpirationYear { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
