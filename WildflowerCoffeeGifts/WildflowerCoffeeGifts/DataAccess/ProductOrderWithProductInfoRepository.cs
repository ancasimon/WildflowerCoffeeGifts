using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WildflowerCoffeeGifts.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace WildflowerCoffeeGifts.DataAccess
{
    public class ProductOrderWithProductInfoRepository
    {
        static List<ProductOrderWithProductInfo> productOrderWithInfo = new List<ProductOrderWithProductInfo>();

        const string _connectionString = "Server=localhost;Database=WCGAnca;Trusted_Connection=True";

        public ProductOrderWithProductInfo Update(int id, ProductOrderWithProductInfo lineItem)
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
                lineItem.Title,
                lineItem.Price,
                lineItem.Subtotal,
                id
            };

            var updatedLineItem = db.QueryFirstOrDefault<ProductOrderWithProductInfo>(sqlUpdate, parameters);

            return updatedLineItem;
        }

        public ProductOrderWithProductInfo AddLineItem(ProductOrderWithProductInfo newLineItem)
        {
            var sqlInsert = @"INSERT INTO [dbo].[ProductOrders]
                                            ([ProductId]
                                            ,[OrderId]
                                            ,[Qty]
                                            ,[IsActive])
                                    Output inserted.Id
                                    VALUES
                                        (@productId, @orderId, @qty, @isActive)";
            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sqlInsert, newLineItem);

            var sqlGetLineItem = "select * from ProductOrders where Id = @id";
            var parameters = new { id = newId };

            var newProductOrder = db.QueryFirstOrDefault<ProductOrderWithProductInfo>(sqlGetLineItem, parameters);

            return newProductOrder;
        }
    }
}
