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
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        OrderRepository _orderRepo;
        public OrdersController()
        {
            _orderRepo = new OrderRepository();
        }

        [HttpGet]
        public IActionResult GetAllOrders()
        {
            var allOrders = _orderRepo.GetAllOrders();

            return Ok(allOrders);
        }
    }
}
