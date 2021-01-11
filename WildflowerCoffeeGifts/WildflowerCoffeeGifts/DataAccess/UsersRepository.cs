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

        const string _connectionString = "Server=localhost;Database=WCGAnca;Trusted_Connection=True";

        public string Address { get; set; }
        public string City { get; set; }
        public Int64 PhoneNumber { get; set; }
        public UsStates UsState { get; set; }
        public string Uid { get; set; }

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
                                 ,[Address]
                                 ,[City]
                                 ,[PhoneNumber]
                                 ,[UsState]
                                 )
                                Output inserted.id
                                VALUES
                                (@Email,@FirstName,@LastName,@Email,GETDATE(),@Password,@IsActive,@Uid, @Address, @City, @PhoneNumber, @UsState)";
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

        // NEW method to get the user ID by the Firebase UID now that we have authentication via Firebase:
        public int GetUserIdByUid(string uid)
        {
            using var db = new SqlConnection(_connectionString);

            var queryForUserByUid = @"select *
                            from Users
                            where Uid = @uid";

            var parameterForUserUid = new { uid };

            var selectedUserId = db.ExecuteScalar<int>(queryForUserByUid, parameterForUserUid);

            return selectedUserId;
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
                                 ,[Address] = @Address
                                 ,[City] = @City
                                 ,[PhoneNumber] = @PhoneNumber
                                 ,[UsState] = @UsState
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
                 user.Address,
                 user.City,
                 user.PhoneNumber,
                 user.UsState,
                 id
              };

            var updatedUser = db.QueryFirstOrDefault<User>(sql, parameters);
            return updatedUser;
           
        }
    }
}
