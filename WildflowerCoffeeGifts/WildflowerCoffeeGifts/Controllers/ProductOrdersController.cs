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
    [Route("api/lineitems")]
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

        [HttpGet("inorder/{orderId}")]
        public IActionResult GetItemsInSingleOrder(int orderId)
        {
            if (_orderRepo.GetOrderById(orderId) == null) return NotFound("We could not find this order. Please enter a valid order ID.");

            var allItemsInSingleOrder = _productOrderRepo.GetProductOrdersByOrderId(orderId);

            return Ok(allItemsInSingleOrder);
        }

        // added another method for getting line items for a single order that also filters results by status:
        [HttpGet("inorder/{orderId}/{isActive}")]
        public IActionResult GetItemsInSingleOrder(int orderId, bool isActive)
        {
            if (_orderRepo.GetOrderById(orderId) == null) return NotFound("We could not find this order. Please enter a valid order ID."); 

            var allItemsInSingleOrder = _productOrderRepo.GetProductOrdersByOrderIdAndByStatus(orderId, isActive);

            return Ok(allItemsInSingleOrder);
        }

        [HttpPost]
        public IActionResult CreateProductOrder(ProductOrder newLineItem)
        {
            var brandNewProductOrder = _productOrderRepo.AddProductOrder(newLineItem);

            return Created($"/api/lineitems/{newLineItem.Id}", brandNewProductOrder);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProductOrder(int id, ProductOrder lineItem)
        {
            var updatedLineItem = _productOrderRepo.Update(id, lineItem);

            if(_productOrderRepo.GetSingleItemInOrderById(id) == null)
            {
                return NotFound("We could not find a line item with this ID. Please try again.");
            }

            return Ok(updatedLineItem);
        }
    }
}
