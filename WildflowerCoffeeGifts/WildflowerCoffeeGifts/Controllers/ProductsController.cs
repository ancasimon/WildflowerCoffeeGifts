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
    
    [Route("api/products")]
    [ApiController]
    [Authorize]
    // [AllowAnonymous] add this to any method that does not require auth
    public class ProductsController : FirebaseEnabledController
    {
        ProductsRepository _productsRepo;
        ProductWithRelatedDataRepository _productsWithRelatedDataRepo;
        public ProductsController()
        {
            _productsRepo = new ProductsRepository();
            _productsWithRelatedDataRepo = new ProductWithRelatedDataRepository();
        }

        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetAllProducts()
        {
            var allProducts = _productsRepo.GetProducts();

            return Ok(allProducts);
        }

        [HttpGet("Top")]
        public IActionResult GetProductsTopTwenty()
        {
            var topProducts = _productsRepo.GetProductsTopTwenty();

            return Ok(topProducts);
        }


        [HttpGet("{id}")]
        public IActionResult ViewSingleProduct(int id)
        {
            // var singleProduct = _productsRepo.ViewProductById(id); // Anca: changed this method to call the product model that includes the related data as well!!!
            var singleProduct = _productsWithRelatedDataRepo.ViewProductWithDataById(id);

            if (singleProduct == null) return NotFound("Nothing was found with this id! Try again.");

            return Ok(singleProduct);
        }

        [HttpGet("search/{searchWord}")]
        public IActionResult SearchProducts(string searchWord)
        {
            var searchProducts = _productsRepo.FindAProduct(searchWord);

            if (searchProducts == null)
            {
                return NotFound("We don't have a record of anything with this search result! Try something different!");
            } 
            return Ok(searchProducts);

        }

        [HttpGet("bystatus/{isActive}")]
        public IActionResult GetProductsByStatus(bool isActive)
        {
            var productStatus = _productsRepo.GetProductsByStatus(isActive);

            return Ok(productStatus);
        }

        [HttpPost]
        public IActionResult AddNewProduct(Product newItem)
        {
            var createNewProduct = _productsRepo.NewProduct(newItem);

            return Created($"/api/products/{newItem.Id}", createNewProduct);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, Product updatedProduct)
        {
            var updateProduct = _productsRepo.UpdateProductById(id, updatedProduct);

            if (_productsRepo.ViewProductById(id) == null)
            {
                return NotFound("We don't have a record of anything with this id! Try a different one!");
            }

            return Ok(updateProduct);
        }

    }
}
