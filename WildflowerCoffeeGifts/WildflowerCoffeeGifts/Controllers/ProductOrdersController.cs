using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WildflowerCoffeeGifts.DataAccess;

namespace WildflowerCoffeeGifts.Controllers
{
    [Route("api/itemsinorder")]
    [ApiController]
    public class ProductOrdersController : ControllerBase
    {
        ProductOrderRepository _productOrderRepo;
        public ProductOrdersController()
        {
            _productOrderRepo = new ProductOrderRepository();
        }

        [HttpGet]
        public IActionResult GetAllProductOrders()
        {
            var allProductOrdersEver = _productOrderRepo.GetAllProductOrders();
            return Ok(allProductOrdersEver);
        }

        [HttpGet("{orderId}")]
        public IActionResult GetItemsInSingleOrder(int orderId)
        {
            var allItemsInSingleOrder = _productOrderRepo.GetProductOrdersByOrderId(orderId);

            return Ok(allItemsInSingleOrder);
        }
    }
}
