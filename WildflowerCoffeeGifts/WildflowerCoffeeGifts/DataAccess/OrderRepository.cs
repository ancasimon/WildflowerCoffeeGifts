using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using WildflowerCoffeeGifts.Models;

namespace WildflowerCoffeeGifts.DataAccess
{
    public class OrderRepository
    {
        static List<Order> orders = new List<Order>();

        const string _connectionString = "Server=localhost;Database=WCG;Trusted_Connection=True";

        public IEnumerable<Order> GetAllOrders()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = "select * from Orders";

            var allOrders = db.Query<Order>(sql);

            return allOrders;
        }

        // Get single order with just order table details:
        public Order GetOrderById(int id)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlQuery = @"select * from Orders where Id = @id";

            var parameters = new { id }; //simplified display of id = id!

            var selectedOrder = db.QueryFirstOrDefault<Order>(sqlQuery, parameters);

            return selectedOrder;
        }

        // Get single order with related ProductOrder records too!
        public Order GetOrderByIdWithLineItems(int id)
        {
            using var db = new SqlConnection(_connectionString);
            // get the list of ProductOrder records associated with this order it:
            var queryForLineItems = @"select *
                                      from ProductOrders po
                                      where po.OrderId = @id";
            var parameters = new { id };
            var orderLineItems = db.Query<ProductOrder>(queryForLineItems, parameters);

            // get the details of the order id passed in as a parameter:
            var queryForOrder = @"select *
                                  from Orders o
                                  where o.Id = @id";
            var selectedOrder = db.QueryFirstOrDefault<Order>(queryForOrder, parameters);

            // assign the ProductOrder records returned by the first query above to the LineItems List property on the order object:
            selectedOrder.LineItems = (List<ProductOrder>)orderLineItems;

            return selectedOrder;
        }
    }
}
