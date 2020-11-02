using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WildflowerCoffeeGifts.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace WildflowerCoffeeGifts.DataAccess
{
    public class ProductsRepository
    {
        static List<Product> products = new List<Product>();

        const string _connectionString = "Server=localhost;Database=WCG;Trusted_Connection=True";
        public IEnumerable<Product> GetProducts()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select * 
                       from Products";

            var allProducts = db.Query<Product>(sql);

            return allProducts;
        }

        public Product ViewProductById(int id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select * 
                        from Products
                        where Id = @id";

            // Anca: I would like to get additional data to display for a product such as product theme name and coffe mug title and flower arrangement title - should I get the data via this query? but then, how can I access these additional properties of the foreigh keys?
            // When I tried to do this, it seemed to pull only the data from the last table (in this case FlowerArr...) and if I tried to do specific selects of specific columns, it wouldn't let me select them in VS Code. 

            //var sqlWithAdditionalData = @"select p.Id, p.Title, p.ImageUrl, p.IsActive, p.Price, p.Description, p.DateCreated, p.QuantityAvailable, pt.Theme, cm.Title, fa.Title
            //                                from Products p
            //                                    join ProductThemes pt
            //                                        on p.ProductThemeId = pt.Id
            //                                            join CoffeeMugs cm
            //                                                on p.CoffeeMugId = cm.Id
            //                                                    join FlowerArrangements fa
            //                                                        on p.FlowerArrId = fa.Id
                                            //where Id = @id";

            var parameters = new { id = id };

            var singleProduct = db.QueryFirstOrDefault<Product>(sql, parameters);

            return singleProduct;
        }

        public IEnumerable<Product> GetProductsByStatus(bool isActive)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select * from Products 
                        where isActive = @isActive";

            var parameters = new { IsActive = isActive };

            var productStatus = db.Query<Product>(sql, parameters);

            return productStatus;
        }

        public Product NewProduct(Product newProduct)
        {
            var sql = @"INSERT INTO [dbo].[Products]
                        ([Title],
                        [ImageUrl],
                        [ProductThemeId],
                        [Price],
                        [Description],
                        [CoffeeMugId],
                        [FlowerArrId],
                        [DateCreated],
                        [IsActive],
                        [QuantityAvailable])
                        Output inserted.Id
                     VALUES
                       (@title,
                        @imageUrl,
                        @productThemeId,
                        @price,
                        @description,
                        @CoffeeMugId,
                        @FlowerArrId,
                        @DateCreated,
                        @isActive,
                        @quantityAvailable)";

            using var db = new SqlConnection(_connectionString);

            var newProductId = db.ExecuteScalar<int>(sql, newProduct);

            var getProduct = @"select *
                                   from Products
                                   where Id = @id";

            var param = new { id = newProductId };

            var addNewProduct = db.QueryFirstOrDefault<Product>(getProduct, param);

            return addNewProduct;
        }

        public Product UpdateProductById(int id, Product updatedProduct)
        {
            var sql = @"UPDATE [dbo].[Products]
                        SET [Title] = @title,
                        [ImageUrl] = @imageUrl,
                        [ProductThemeId] = @productThemeId,
                        [Price] = @price,
                        [Description] = @description,
                        [CoffeeMugId] = @coffeeMugId,
                        [FlowerArrId] = @flowerArrId,
                        [DateCreated] = @dateCreated,
                        [IsActive] = @isActive,
                        [QuantityAvailable] = @quantityAvailable
                          OUTPUT INSERTED.*
                            WHERE Id = @id";
            using var db = new SqlConnection(_connectionString);

            var parameters = new
            {
                updatedProduct.Title,
                updatedProduct.ImageUrl,
                updatedProduct.ProductThemeId,
                updatedProduct.Price,
                updatedProduct.Description,
                updatedProduct.CoffeeMugId,
                updatedProduct.flowerArrId,
                updatedProduct.DateCreated,
                updatedProduct.IsActive,
                updatedProduct.QuantityAvailable,
                id
            };

            var updateProduct = db.QueryFirstOrDefault<Product>(sql, parameters);

            return updateProduct;
        }


    }
}
