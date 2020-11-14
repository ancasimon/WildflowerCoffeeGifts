using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
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
        ProductOrderWithProductInfoRepository _productOrderWithInfoRepo;
        public ProductOrdersController()
        {
            _productOrderRepo = new ProductOrderRepository();
            _orderRepo = new OrderRepository();
            _productOrderWithInfoRepo = new ProductOrderWithProductInfoRepository();
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

        //[HttpPost]
        //public IActionResult CreateProductOrder(ProductOrder newLineItem)
        //{
        //    var brandNewProductOrder = _productOrderRepo.AddProductOrder(newLineItem);

        //    return Created($"/api/lineitems/{newLineItem.Id}", brandNewProductOrder);
        //}

        [HttpPut("{id}")]
        public IActionResult UpdateProductOrder(int id, ProductOrder lineItem)
        {
            var updatedLineItem = _productOrderRepo.Update(id, lineItem);

            if (_productOrderRepo.GetSingleItemInOrderById(id) == null)
            {
                return NotFound("We could not find a line item with this ID. Please try again.");
            }

            return Ok(updatedLineItem);
        }

        [HttpPut("withInfo/{id}")]
        public IActionResult UpdateProductOrderWithInfo(int id, ProductOrderWithProductInfo lineItem)
        {
            var updatedLineItem = _productOrderWithInfoRepo.Update(id, lineItem);

            if (_productOrderRepo.GetSingleItemInOrderById(id) == null)
            {
                return NotFound("We could not find a line item with this ID. Please try again.");
            }

            return Ok(updatedLineItem);
        }
        
        // new method to update the product order quantity if it already exists in an order / in the cart or to create it if not:
        [HttpPut("{productId}/{orderId}/{qty}")]
        public IActionResult UpdateProductOrderQuantityInCart(int productId, int orderId, int qty)
        {
            var lineItem = _productOrderRepo.Update(productId, orderId, qty);

            if (_productOrderRepo.GetLineItemByProductAndOrder(productId, orderId) == null)
            {
                return NotFound("We could not find a line item with this productID and this orderID. Please try again.");
            }

            return Ok(lineItem);
        }

        //new method to post a ProductOrder based on productId and orderId:
        [HttpPost("{productId}/{orderId}/{qty}")]
        public IActionResult CreateProductOrderBasedOnProductAndOrderIds(int productId, int orderId, int qty)
        {
            var newLineItem = _productOrderRepo.AddProductOrderWithProductAndOrderIds(productId, orderId, qty);

            return Created($"/api/lineitems/{newLineItem.Id}", newLineItem);
        }

        [HttpPost]
        public IActionResult CreateProductOrderWIthInfo(ProductOrderWithProductInfo newLineItem)
        {
            var brandNewProductOrder = _productOrderWithInfoRepo.AddLineItem(newLineItem);

            return Created($"/api/lineitems/{newLineItem.Id}", brandNewProductOrder);
        }
    }
}
