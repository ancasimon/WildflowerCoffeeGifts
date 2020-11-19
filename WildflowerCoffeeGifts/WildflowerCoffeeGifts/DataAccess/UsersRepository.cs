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

        public void Add(User userToAdd)
        {
            var sql = @"INSERT INTO [dbo].[Users]
                                 ([UserName]
                                 ,[FirstName]
                                 ,[LastName]
                                 ,[Email]
                                 ,[DateCreated]
                                 ,[Password]
                                 ,[IsActive]
                                 ,[Uid]   
                                 )
                                Output inserted.id
                                VALUES
                                (@Email,@FirstName,@LastName,@Email,GETDATE(),@Password,@IsActive,@Uid)";
            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, userToAdd);

            userToAdd.Id = newId;

        }

        public IEnumerable<User> GetAllUsers()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = "select * from Users where IsActive = 1";

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
        public User GetUsersByIdProfile(int id)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                            from Users
                            where Id = @id";

            var parameters = new { id = id };

            var selectedUser = db.QueryFirstOrDefault<User>(query, parameters);

            return selectedUser;
        }
        public User Update(int id, User user)
        {
            var sql = @"UPDATE Users
                        SET [UserName] = @Username
                                 ,[FirstName] = @FirstName
                                 ,[LastName] = @LastName
                                 ,[Email] = @Email
                                 ,[DateCreated] = @DateCreated
                                 ,[Password] = @Password
                                 ,[IsActive] = @IsActive
                    output inserted.*
                    Where id = @id";

            using var db = new SqlConnection(_connectionString);

            var parameters = new
            { 
                 user.UserName,
                 user.FirstName,
                 user.LastName,
                 user.Email,
                 user.DateCreated,
                 user.Password,
                 user.IsActive,
                 id
              };

            var updatedUser = db.QueryFirstOrDefault<User>(sql, parameters);
            return updatedUser;
           
        }
    }
}
