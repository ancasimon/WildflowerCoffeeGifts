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

        // Not sure we will need this -- writing it here for now - I will deleted it later if we don't need it!!! (no correpsonding method in the Controller at this time)
        public ProductOrder GetSingleItemInOrderById(int id)
        {
            using var db = new SqlConnection(_connectionString);
            var sqlQuery = "select * from ProductOrders where Id = @id";
            var parameters = new { id };
            var selectedItemInOrder = db.QueryFirstOrDefault<ProductOrder>(sqlQuery, parameters);
            return selectedItemInOrder;
        }
    }
}
