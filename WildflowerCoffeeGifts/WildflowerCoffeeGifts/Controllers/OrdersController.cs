using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WildflowerCoffeeGifts.DataAccess;
using WildflowerCoffeeGifts.Models;
using Microsoft.AspNetCore.Authorization;

namespace WildflowerCoffeeGifts.Controllers
{
    [Route("api/orders")]
    [ApiController]
    [Authorize]
    // [AllowAnonymous] add this to any method that does not require auth
    public class OrdersController : FirebaseEnabledController
    {
        OrderRepository _orderRepo;
        UsersRepository _userRepo;
        public OrdersController()
        {
            _orderRepo = new OrderRepository();
            _userRepo = new UsersRepository();
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
        [HttpGet("cart/{uid}")]
        public IActionResult GetCart(string uid)
        {
            var currentUserId = _userRepo.GetUserIdByUid(uid);
            if (_orderRepo.GetCart(currentUserId) == null) return NoContent();

            var selectedOrder = _orderRepo.GetCart(currentUserId);

            return Ok(selectedOrder);
        }

        // writing a new method here to create a shopping cart order:
        [HttpPost("cart/{userId}")]
        public IActionResult CreateShoppingCart(int userId)
        {
            var newCart = _orderRepo.CreateShoppingCart(userId);
            return Created($"/api/orders/cart/{newCart.Id}", newCart);
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

        [HttpGet("history")]
        public IActionResult GetAllProductOrderDetails()
        {
            var orderDetails = _orderRepo.AdminViewOfPlacedOrders();

            return Ok(orderDetails);
        }

    }
}
