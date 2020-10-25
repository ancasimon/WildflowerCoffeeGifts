using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WildflowerCoffeeGifts.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace WildflowerCoffeeGifts.DataAccess
{
    public class UsersRepository
    {
        static List<User> users = new List<User>();

        const string _connectionString = "Server=localhost;Database=WCG;Trusted_Connection=True";

        public IEnumerable<User> GetAllUsers()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = "select * from Users";

            var allUsers = db.Query<User>(sql);

            return allUsers;
        }

        public User GetUsersById(int id)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                            from Users
                            where Id = @id";

            var parameters = new { id = id };

            var selectedUser = db.QueryFirstOrDefault<User>(query, parameters);

            return selectedUser;
        }
    }
}
