using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using WildflowerCoffeeGifts.Models;

namespace WildflowerCoffeeGifts.DataAccess
{
    public class ProductOrderRepository
    {
        static List<ProductOrder> productOrders = new List<ProductOrder>();

        const string _connectionString = "Server=localhost;Database=WCG;Trusted_Connection=True";

        // Get all product orders - more just for testing purposes:
        public IEnumerable<ProductOrder> GetAllProductOrders()
        {
            using var db = new SqlConnection(_connectionString);
            var sqlQuery = "select * from ProductOrders";
            var allProductOrders = db.Query<ProductOrder>(sqlQuery);
            return allProductOrders;
        }
    
        // Get product orders for a specific order - what we will actually use functionally:
        public IEnumerable<ProductOrder> GetProductOrdersByOrderId(int orderId)
        {
            using var db = new SqlConnection(_connectionString);
            var sqlQuery = "select * from ProductOrders where OrderId = @orderId";
            var parameters = new { orderId };
            var itemsInOrder = db.Query<ProductOrder>(sqlQuery, parameters);
            return itemsInOrder;
        }

        // Adding  version of getting all line items by their status - we will probably use this to get all active/not-deleted line items for an order:
        public IEnumerable<ProductOrder> GetProductOrdersByOrderIdAndByStatus(int orderId, bool isActive)
        {
            using var db = new SqlConnection(_connectionString);
            var sqlQuery = "select * from ProductOrders where OrderId = @orderId and IsActive = @isActive";
            var parameters = new { orderId, isActive };
            var itemsInOrder = db.Query<ProductOrder>(sqlQuery, parameters);
            return itemsInOrder;
        }

        // we can use this for validation purposes: 
        public ProductOrder GetSingleItemInOrderById(int id)
        {
            using var db = new SqlConnection(_connectionString);
            var sqlQuery = "select * from ProductOrders where Id = @id";
            var parameters = new { id };
            var selectedItemInOrder = db.QueryFirstOrDefault<ProductOrder>(sqlQuery, parameters);
            return selectedItemInOrder;
        }

        public ProductOrder AddProductOrder(ProductOrder newLineItem)
        {
            var sqlInsert = @"INSERT INTO [dbo].[ProductOrders]
                                            ([ProductId]
                                            ,[OrderId]
                                            ,[Qty]
                                            ,[IsActive])
                                    Output inserted.Id
                                    VALUES
                                        (@productId, @orderId, @qty, @isACtive)";
            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sqlInsert, newLineItem);

            var sqlGetLineItem = "select * from ProductOrders where Id = @id";
            var parameters = new { id = newId };

            var newProductOrder = db.QueryFirstOrDefault<ProductOrder>(sqlGetLineItem, parameters);

            return newProductOrder;
        }

        public ProductOrder Update(int id, ProductOrder lineItem)
        {
            var sqlUpdate = @"UPDATE [dbo].[ProductOrders]
                                    SET [ProductId] = @productId
                                        ,[OrderId] = @orderId
                                        ,[Qty] = @qty
                                        ,[IsActive] = @isActive
                                    OUTPUT INSERTED.*
                                    WHERE Id = @id";
            using var db = new SqlConnection(_connectionString);

            var parameters = new
            {
                lineItem.ProductId,
                lineItem.OrderId,
                lineItem.Qty,
                lineItem.IsActive,
                id
            };

            var updatedLineItem = db.QueryFirstOrDefault<ProductOrder>(sqlUpdate, parameters);

            return updatedLineItem;
        }
    }
}
