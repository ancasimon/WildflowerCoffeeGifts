using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WildflowerCoffeeGifts.Models;
using Microsoft.Data.SqlClient;
using Dapper;


namespace WildflowerCoffeeGifts.DataAccess
{
    public class PaymentTypeRepository
    {
        static List<PaymentType> paymentType = new List<PaymentType>();

        const string _connectionString = "Server=localhost;Database=WCG;Trusted_Connection=True";

        public IEnumerable<PaymentType> GetAllPaymentTypes()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = "select * from PaymentTypes";

            var allPaymentTypes = db.Query<PaymentType>(sql);

            return allPaymentTypes;
        }

        public PaymentType GetSinglePaymentTypeById(int id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select * 
                        from PaymentTypes
                        where Id = @id";

            var parameters = new { id = id };

            var singlePaymentType = db.QueryFirstOrDefault<PaymentType>(sql, parameters);

            return singlePaymentType;
        }

        // Anca: Adding a method to get the latest payment type for a given user:
        public PaymentType GetLatestPaymentTypeForUser(int userId)
        {
            using var db = new SqlConnection(_connectionString);
            var sqlForLatestPaymentTypeForUser = @"select top(1) *
                                                  from PaymentTypes
                                                  where UserId = @userId AND IsActive = 1
                                                  order by Id desc";
            var parameterForUserId = new { userId };

            var latestPaymentTypeForUser = db.QueryFirstOrDefault<PaymentType>(sqlForLatestPaymentTypeForUser, parameterForUserId);

            return latestPaymentTypeForUser;
        }

        // updated method below to use uid!!
        public IEnumerable<PaymentType> GetAllPaymentTypesByUserUid(string uid)
        {
            using var db = new SqlConnection(_connectionString);
            var sqlForAllPaymentTypesByUserUid = @"select * 
                                                from PaymentTypes pt
                                                        join Users u
                                                            on pt.UserId = u.Id
                                                    where u.Uid = @uid AND pt.IsActive = 1
                                                    order by pt.Id desc";
            var parameterForUserUid = new { uid };
            var allPaymentTypes = db.Query<PaymentType>(sqlForAllPaymentTypesByUserUid, parameterForUserUid);

            return allPaymentTypes;
        }

        public IEnumerable<PaymentType> GetPaymentTypesByStatus(bool isActive)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select * from PaymentTypes
                        where isActive = @isActive";

            var parameters = new { IsActive = isActive };

            var allPaymentTypesByStatus = db.Query<PaymentType>(sql, parameters);

            return allPaymentTypesByStatus;
        }

        public PaymentType AddNewPayment(PaymentType newPayment)
        {
            var sql = @"INSERT INTO [dbo].[PaymentTypes]
                        ([PaymentOption],
                         [UserId],
                         [AccountNo],
                         [ExpirationYear],
                         [ExpirationMonth],
                         [IsActive],
                         [Ccv])
                         Output inserted.Id
                        VALUES 
                         (@paymentOption,
                          @userId,
                          @accountNo,
                          @expirationYear,
                          @expirationMonth,
                          @isActive,
                          @ccv)";

            using var db = new SqlConnection(_connectionString);

            var newPaymentTypeId = db.ExecuteScalar<int>(sql, newPayment);

            var getPaymentType = @"select *
                                   from PaymentTypes
                                   where Id = @id";

            var parameters = new { id = newPaymentTypeId };

            var addNewPayment = db.QueryFirstOrDefault<PaymentType>(getPaymentType, parameters);

            return addNewPayment;
        }

        public PaymentType UpdatePaymentType(int id, PaymentType updatedInfo)
        {
            var sql = @"UPDATE [dbo].[PaymentTypes]
                          SET [PaymentOption] = @paymentOption,
                          [UserId] = @userId,
                          [AccountNo] = @accountNo,
                          [ExpirationYear] = @expirationYear,
                          [ExpirationMonth] = @expirationMonth,
                          [IsActive] = @isActive,
                          [Ccv] = @ccv
                          OUTPUT INSERTED.*
                            WHERE Id = @id";
            using var db = new SqlConnection(_connectionString);

            var parameters = new
            {
                updatedInfo.PaymentOption,
                updatedInfo.UserId,
                updatedInfo.AccountNo,
                updatedInfo.ExpirationYear,
                updatedInfo.ExpirationMonth,
                updatedInfo.IsActive,
                updatedInfo.Ccv,
                id
            };

            var updatedPaymentType = db.QueryFirstOrDefault<PaymentType>(sql, parameters);

            return updatedPaymentType;
        }

    }
}
