﻿using System;
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

        const string _connectionString = "Server=localhost;Database=WCGAnca;Trusted_Connection=True";

        public IEnumerable<Order> GetAllOrders()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = "select * from Orders";

            var allOrders = db.Query<Order>(sql);

            List<Order> ordersList = new List<Order>();
            ordersList = allOrders.ToList();

            foreach (var item in allOrders)
            {
                // get order id:
                var orderId = item.Id;

                // get all the line items for this order:
                var queryForLineItems = @"select *
                                      from ProductOrders po
                                      where po.OrderId = @id";
                var parameters = new { id = orderId };
                var orderLineItems = db.Query<ProductOrderWithProductInfo>(queryForLineItems, parameters);

                List<ProductOrderWithProductInfo> orderLineItemsList = orderLineItems.ToList();

                // assign the ProductOrder records returned by the query above to the LineItems List property on the order object:
                item.LineItems.AddRange(orderLineItemsList);
            }
            return allOrders;
        }

        // Get orders by status -> so that we can get only active / not deleted orders and all inactive / deleted orders:
        public IEnumerable<Order> GetOrdersByStatus(bool isActive)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = "select * from Orders Where IsActive = @isActive";
            var boolParameter = new { isActive = isActive };

            var ordersByStatus = db.Query<Order>(sql, boolParameter);

            List<Order> ordersList = new List<Order>();
            ordersList = ordersByStatus.ToList();

            foreach (var item in ordersByStatus)
            {
                // get order id:
                var orderId = item.Id;

                // get all the line items for this order:
                var queryForLineItems = @"select *
                                      from ProductOrders po
                                      where po.OrderId = @id";
                var parameters = new { id = orderId };
                var orderLineItems = db.Query<ProductOrder>(queryForLineItems, parameters);

                // get the details of the order id passed in as a parameter:
                var queryForOrder = @"select *
                                  from Orders o
                                  where o.Id = @id";
                var selectedOrder = db.QueryFirstOrDefault<Order>(queryForOrder, parameters);

                // assign the ProductOrder records returned by the first query above to the LineItems List property on the order object:
                selectedOrder.LineItems = (List<ProductOrderWithProductInfo>)orderLineItems;
                //push to a new variable!! and return that variable!
                ordersList.Add(selectedOrder);
            }

            var finalList = ordersList.AsEnumerable();

            return finalList;
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
            var orderLineItems = db.Query<ProductOrderWithProductInfo>(queryForLineItems, parameters);

            // get the details of the order id passed in as a parameter:
            var queryForOrder = @"select *
                                  from Orders o
                                  where o.Id = @id";
            var selectedOrder = db.QueryFirstOrDefault<Order>(queryForOrder, parameters);

            // assign the ProductOrder records returned by the first query above to the LineItems List property on the order object:
            selectedOrder.LineItems = (List<ProductOrderWithProductInfo>)orderLineItems;

            return selectedOrder;
        }

        // DEFINITION OF EXISTING CART: Get current incomplete/pending order for a given user (with related ProductOrder records too)!
        public Order GetCart(int id)
        {
            using var db = new SqlConnection(_connectionString);

            // get the details of the order id for the userId passed in as a parameter:
            var parameterUserId = new { id };
            var queryForOrder = @"select *
                                from Orders o
                                where IsCompleted = 0 AND UserID = @id AND IsActive = 1"; //what is on the left side of the equation here is the variable I am declaring - and I am filling it with the data on the right, which is the parameter we are passing in to the method / and the variable is calling that parameter!!          
            var selectedOrder = db.QueryFirstOrDefault<Order>(queryForOrder, parameterUserId);


            // OPTION to start using uid above!!!!
            //var parameterUserId = new { Uid = userId };
            //var queryForOrder = @"select *
            //                    from Orders o
            //                        join Users u
            //                            on o.UserId = u.Id
            //                    where u.Uid = @Uid AND o.IsCompleted = 0 AND o.IsActive=1";

            if (selectedOrder != null)
            {
                // get the list of ProductOrder records associated with this order it:
                var orderId = selectedOrder.Id;
                var parameterOrderId = new { OrderId = orderId };
                var queryForLineItems = @"select po.Id, po.IsActive, po.OrderId, po.ProductId, po.Qty, p.Title, p.ImageUrl, p.Price, p.Price*po.Qty AS Subtotal
                                      from ProductOrders po
	                                    join Products p
		                                    on po.ProductId = p.Id
                                      where po.OrderId = @OrderId AND po.IsActive=1";

                var orderLineItems = db.Query<ProductOrderWithProductInfo>(queryForLineItems, parameterOrderId);
                // assign the ProductOrder records returned by the first query above to the LineItems List property on the order object:
                selectedOrder.LineItems = (List<ProductOrderWithProductInfo>)orderLineItems;

                if (selectedOrder.LineItems.Count == 0)
                {
                    selectedOrder.TotalPrice = 0;
                }
                else
                {
                    var queryForTotalPrice = @"select SUM(x.Subtotal)
                                            from (
                                            select p.Price*po.Qty AS Subtotal                                    
                                            from ProductOrders po
                                            join Products p
                                            on po.ProductId = p.Id
                                            where po.OrderId = @OrderId AND po.IsActive=1) x";
                    var totalPrice = db.QueryFirst<decimal>(queryForTotalPrice, parameterOrderId);
                    selectedOrder.TotalPrice = totalPrice;
                }
            }

            return selectedOrder;
        }

        // deleted from below:  ,[PurchaseDate] - we set it up to get set by default in the database to use current date
        public Order AddOrder(Order orderToAdd)
        {
            var sqlInsert = @"INSERT INTO [dbo].[Orders]
                                               ([UserId]
                                                ,[IsCompleted]
                                                ,[TotalPrice]
                                                ,[PaymentTypeId]
                                                ,[DeliveryAddress]
                                                ,[DeliveryCity]
                                                ,[DeliveryState]
                                                ,[RecipientEmail]
                                                ,[RecipientPhone]
                                                ,[RecipientFirstName]
                                                ,[RecipientLastName]
                                                ,[IsActive])
                                            Output inserted.Id
                                            VALUES
                                            (@userId, @isCompleted, @totalPrice, @paymentTypeId, @deliveryAddress, @deliveryCity, @deliveryState, @recipientEmail, @recipientPhone, @recipientFirstName, @recipientLastName, @isActive)";
            using var db = new SqlConnection(_connectionString);
            var newId = db.ExecuteScalar<int>(sqlInsert, orderToAdd);

            var sqlGetOrder = "select * from Orders where Id = @id";
            var parameters = new { id = newId };
            var newOrder = db.QueryFirstOrDefault<Order>(sqlGetOrder, parameters);

            return newOrder;
        }


        // created a new method that gets the latest payment type record for the user -and if none is available, then it creates a default payment type - and then creates an order for that user, using that payment type:
        public Order CreateShoppingCart(int userId)
        {
            using var db = new SqlConnection(_connectionString);
            // get the latest payment type for the user:
            var parameterUserId = new { userId };
            var queryForLatestPaymentType = @"select *
                                            from PaymentTypes
                                            where UserId = @userId and IsActive = 1
                                            order by Id desc";
            var latestPayment = db.QueryFirstOrDefault<PaymentType>(queryForLatestPaymentType, parameterUserId);
            if (latestPayment == null)
            {
                var createDefaultPaymentType = @"INSERT INTO [dbo].[PaymentTypes]
                                                                    ([PaymentOption],
                                                                     [UserId],
                                                                     [AccountNo],
                                                                     [ExpirationYear],
                                                                     [ExpirationMonth],
                                                                     [IsActive])
                                                Output inserted.Id
                                                VALUES 
                                                    ('Please specify a payment type.',
                                                    @userId,
                                                    '',
                                                    '',
                                                    '',
                                                    1)";

                var newPaymentTypeId = db.ExecuteScalar<int>(createDefaultPaymentType, parameterUserId);

                var getPaymentType = @"select *
                                   from PaymentTypes
                                   where Id = @id";

                var parameterForNewPaymentType = new { id = newPaymentTypeId };

                var newPaymentType = db.QueryFirstOrDefault<PaymentType>(getPaymentType, parameterForNewPaymentType);

                latestPayment = newPaymentType;
            }

            var latestPaymentTypeId = latestPayment.Id;

            // create the new order for the cart:
            var createOrder = @"INSERT INTO [dbo].[Orders]
                                               ([UserId]
                                                ,[IsCompleted]
                                                ,[TotalPrice]
                                                ,[PaymentTypeId]
                                                ,[DeliveryAddress]
                                                ,[IsActive])
                                            Output inserted.Id
                                            VALUES
                                            (@userId, 0, 0, @latestPaymentTypeId, 'Please enter an address.', 1)";

            var parametersForNewOrder = new { userId, latestPaymentTypeId };
            var newOrderId = db.ExecuteScalar<int>(createOrder, parametersForNewOrder);

            var sqlGetOrder = "select * from Orders where Id = @id";
            var parameters = new { id = newOrderId };
            var newOrder = db.QueryFirstOrDefault<Order>(sqlGetOrder, parameters);

            return newOrder;
        }

        public Order Update(int id, Order order)
        {
            var sqlUpdate = @"UPDATE [dbo].[Orders]
                                    SET [UserId] = @userId
                                        ,[IsCompleted] = @isCompleted
                                        ,[TotalPrice] = @totalPrice
                                        ,[PaymentTypeId] = @paymentTypeId
                                        ,[PurchaseDate] = @purchaseDate
                                        ,[DeliveryAddress] = @deliveryAddress
                                        ,[DeliveryCity] = @deliveryCity
                                        ,[DeliveryState] = @deliveryState
                                        ,[RecipientEmail] = @recipientEmail
                                        ,[RecipientPhone] = @recipientPhone
                                        ,[RecipientFirstName] = @recipientFirstName
                                        ,[RecipientLastName] = @recipientLastName
                                        ,[IsActive] = @isActive
                                    OUTPUT INSERTED.*
                                    WHERE Id = @id";
            using var db = new SqlConnection(_connectionString);
            var parameters = new
            {
                order.UserId,
                order.IsCompleted,
                order.TotalPrice,
                order.PaymentTypeId,
                order.PurchaseDate,
                order.DeliveryAddress,
                order.DeliveryCity,
                order.DeliveryState,
                order.RecipientEmail,
                order.RecipientPhone,
                order.RecipientFirstName,
                order.RecipientLastName,
                order.IsActive,
                id
            };
            var updatedOrder = db.QueryFirstOrDefault<Order>(sqlUpdate, parameters);

            return updatedOrder;
        }

        public IEnumerable<AdminOrderView> AdminViewOfPlacedOrders()
        {
            using var db = new SqlConnection(_connectionString);

            var sqlQuery = @"select 
	                            O.Id as OrderId,
	                            U.FirstName,
	                            U.LastName,
	                            U.Email,
                                O.isCompleted,
                                O.PurchaseDate,
                                PT.PaymentOption
	                            from Orders O
		                            inner join Users U on
		                            O.UserId = U.Id
			                            inner join ProductOrders PO on
			                            O.Id = PO.OrderId
                                            inner join PaymentTypes PT on
	    		                            O.PaymentTypeId = PT.Id
                                WHERE O.IsActive = 1
								GROUP BY O.Id, U.FirstName,
	                            U.LastName,
	                            U.Email,
                                O.isCompleted,
                                O.PurchaseDate,
                                PT.PaymentOption";

            var allOrders = db.Query<AdminOrderView>(sqlQuery);

            List<AdminOrderView> ordersList = new List<AdminOrderView>();
            ordersList = allOrders.ToList();

            foreach (var item in ordersList)
            {

                /*var addedTotalSql = @"select O.Id, sum(O.TotalPrice) as totalPrice
	                              from Orders O
		                            inner join Users U on
		                            O.UserId = U.Id
			                            inner join ProductOrders PO on
			                            O.Id = PO.OrderId
			                            where O.Id = PO.OrderId
			                            GROUP BY O.Id";*/

                // item.TotalPrice = db.QueryFirstOrDefault<decimal>(addedTotalSql);

                var orderId = item.OrderId;

                var queryForLineItems = @"select
                                        PO.Id,
	                                    O.Id as OrderId,
							            P.Title,
	                                    PO.Qty,
	                                    P.Price,
										P.Price*PO.Qty AS Subtotal
                                        from Orders O
	                                        inner join ProductOrders PO on
	                                        O.Id = PO.OrderId
		                                        inner join Products P on
		                                        PO.ProductId = P.Id
			                                        inner join Users U on
			                                        O.UserId = U.Id
                                        where O.Id = @id AND PO.IsActive = 1";
                var parameters = new { id = orderId };
                var orderLineItems = db.Query<AdminOrderItem>(queryForLineItems, parameters);

                List<AdminOrderItem> orderLineItemsList = orderLineItems.ToList();

                item.LineItems.AddRange(orderLineItemsList);

                if (item.LineItems.Count == 0)
                {
                    item.TotalPrice = 0;
                }
                else
                {

                        var selectedOrderId = item.OrderId;
                        var idParameter = new { id = selectedOrderId };
                        var queryForTotalPrice = @"select SUM(x.Subtotal)
                                            from (
                                            select p.Price*po.Qty AS Subtotal                                    
                                            from ProductOrders po
                                            join Products p
                                            on po.ProductId = p.Id
                                            where po.OrderId = @id AND po.IsActive=1) x";
                        var totalPrice = db.QueryFirst<decimal>(queryForTotalPrice, idParameter);
                        item.TotalPrice = totalPrice;

                }

            }
            return allOrders;
        }
    }
}
    
