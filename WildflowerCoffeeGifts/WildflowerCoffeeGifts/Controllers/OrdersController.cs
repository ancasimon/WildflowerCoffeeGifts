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

        [HttpGet("bystatus/{isActive}")]
        public IActionResult GetOrdersByStatus(bool isActive)
        {
            var ordersByStatus = _orderRepo.GetOrdersByStatus(isActive);
            return Ok(ordersByStatus);
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderById(int id)
        {
            if (_orderRepo.GetOrderById(id) == null) return NotFound("We could not find this order. Please enter a valid order ID.");

            var selectedOrder = _orderRepo.GetOrderByIdWithLineItems(id);

            return Ok(selectedOrder);
        }

        // method for getting the cart!!!
        [HttpGet("cart/{userId}")]
        public IActionResult GetCart(int userId)
        {
            if (_orderRepo.GetCart(userId) == null) return NoContent();

            var selectedOrder = _orderRepo.GetCart(userId);

            return Ok(selectedOrder);
        }

        [HttpPost]
        public IActionResult CreateOrder(Order newOrder)
        {
            var brandNewOrder = _orderRepo.AddOrder(newOrder);

            return Created($"/api/orders/{brandNewOrder.Id}", brandNewOrder);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateOrder(int id, Order order)
        {
            var updatedOrder = _orderRepo.Update(id, order);

            if(_orderRepo.GetOrderById(id) == null)
            {
                return NotFound("We could not find an order with this ID. Please try again.");
            }

            return Ok(updatedOrder);
        }

    }
}
