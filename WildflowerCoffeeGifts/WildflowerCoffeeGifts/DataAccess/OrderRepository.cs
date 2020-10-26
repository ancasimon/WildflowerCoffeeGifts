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

        public Order GetOrderById(int id)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlQuery = @"select * from Orders where Id = @id";

            var parameters = new { id }; //simplified display of id = id!

            var selectedOrder = db.QueryFirstOrDefault<Order>(sqlQuery, parameters);

            return selectedOrder;
        }
    }
}
