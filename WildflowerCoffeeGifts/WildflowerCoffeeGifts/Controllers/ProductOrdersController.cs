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
        OrderRepository _orderRepo;
        public ProductOrdersController()
        {
            _productOrderRepo = new ProductOrderRepository();
            _orderRepo = new OrderRepository();
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
            if (_orderRepo.GetOrderById(orderId) == null) return NotFound("We could not find this order. Please enter a valid order ID."); // ANCA QUESTION: How can I reference the other repo here???

            var allItemsInSingleOrder = _productOrderRepo.GetProductOrdersByOrderId(orderId);

            return Ok(allItemsInSingleOrder);
        }
    }
}
