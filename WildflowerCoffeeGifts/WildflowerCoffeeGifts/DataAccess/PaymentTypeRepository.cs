﻿using System;
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

    }
}