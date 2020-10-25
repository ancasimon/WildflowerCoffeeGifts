using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WildflowerCoffeeGifts.DataAccess;
using WildflowerCoffeeGifts.Models;

namespace WildflowerCoffeeGifts.Controllers
{
    [Route("api/paymentType")]
    [ApiController]
    public class PaymentTypeController : ControllerBase
    {
        PaymentTypeRepository _paymentTypeRepo;
        public PaymentTypeController()
        {
            _paymentTypeRepo = new PaymentTypeRepository();
        }

        [HttpGet]
        public IActionResult GetAllPaymentTypes()
        {
            var allPaymentTypes = _paymentTypeRepo.GetAllPaymentTypes();
            return Ok(allPaymentTypes);

        }

    }
}
