using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WildflowerCoffeeGifts.Models;
using Dapper;
using Microsoft.Data.SqlClient;

namespace WildflowerCoffeeGifts.DataAccess
{
    public class ProductCountRepository
    {

        static List<ProductCount> productCount = new List<ProductCount>();

        const string _connectionString = "Server=localhost;Database=WCG;Trusted_Connection=True";
        public IEnumerable<ProductCount> GetThemebyCount()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select distinct(p.Theme), count(p1.productthemeid)as count
            from ProductThemes p
            join Products p1 
            on p.Id = p1.ProductThemeId
            group by p1.ProductThemeId, p.Theme";
            var count = db.Query<ProductCount>(sql);
 
            return count;
        }
    }
}
