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

    }
}
