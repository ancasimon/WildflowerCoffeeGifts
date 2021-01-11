using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WildflowerCoffeeGifts.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace WildflowerCoffeeGifts.DataAccess
{
    public class ProductWithRelatedDataRepository
    {
        const string _connectionString = "Server=localhost;Database=WCGAnca;Trusted_Connection=True";

        public ProductWithRelatedData ViewProductWithDataById(int id)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlWithAdditionalData = @"select p.Id, p.Title, p.ImageUrl, p.IsActive, p.Price, p.Description, p.DateCreated, p.QuantityAvailable, pt.Id AS ProductThemeId, pt.Theme AS ProductThemeName, cm.Id AS CoffeeMugId, cm.Title AS CoffeeMugName, fa.Id AS FlowerArrId, fa.Title AS FlowerArrName
                                            from Products p
                                                join ProductThemes pt
                                                    on p.ProductThemeId = pt.Id
                                                        join CoffeeMugs cm
                                                            on p.CoffeeMugId = cm.Id
                                                                join FlowerArrangements fa
                                                                    on p.FlowerArrId = fa.Id
                                            where p.Id = @id";

            var parameters = new { id = id };

            var singleProduct = db.QueryFirstOrDefault<ProductWithRelatedData>(sqlWithAdditionalData, parameters);

            return singleProduct;
        }

    }
}
