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

        const string _connectionString = "Server=localhost;Database=WCGAnca;Trusted_Connection=True";
        public List<ProductCount> GetProductsTopThreeAndCount()
        {
            using var db = new SqlConnection(_connectionString);
            var allProducts = db.Query<ProductCount>(@"select distinct(p.ProductThemeId), p1.Theme as [Theme], count(p.id)as count
                                                        from Products p
                                                        join ProductThemes p1 
                                                        on p1.Id = p.ProductThemeId
                                                        group by p.ProductThemeId, p1.Theme");
            foreach (var item in allProducts.ToList())
            {
                var query = @"Select Top(3)p.Title, p.id
                                from products p
                                where ProductThemeId = @pthemeid and IsActive =1
                                order by p.Title asc";
                var parameters = new { pthemeid = item.ProductThemeId };
                var product = db.Query<ProductCount>(query, parameters).ToList();
                item.TopThreeProducts = product;
            }
            return allProducts.ToList();
        }
    }
}
