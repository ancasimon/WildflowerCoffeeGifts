using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WildflowerCoffeeGifts.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace WildflowerCoffeeGifts.DataAccess
{
    public class ProductThemeRepository
    {
        static List<ProductTheme> productThemes = new List<ProductTheme>();

        const string _connectionString = "Server=localhost;Database=WCG;Trusted_Connection=True";

        public IEnumerable<ProductTheme> GetAllThemes()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = "select * from ProductThemes";

            var allThemes = db.Query<ProductTheme>(sql);

            return allThemes;
        }

        // Get themes by status so you can see active themes only (not deleted, wheree IsActive property is false/0) or deleted / aka inactive themes (where IsActive is true or 1):
        public IEnumerable<ProductTheme> GetThemesByStatus(bool isActive)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = "select * from ProductThemes where IsActive = @isActive";

            var parameters = new { isActive = isActive };

            var themesByStatus = db.Query<ProductTheme>(sql, parameters);

            return themesByStatus;
        }

        // Get inactive / "deleted" themes only: 
        //public IEnumerable<ProductTheme> GetAllDeletedThemes()
        //{
        //    using var db = new SqlConnection(_connectionString);
        //    var sql = "select * from ProductThemes where IsActive = 0";

        //    var deletedThemes = db.Query<ProductTheme>(sql);

        //    return deletedThemes;
        //}

        public ProductTheme GetThemeById(int id)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                            from ProductThemes
                            where Id = @id";

            var parameters = new { id = id };

            var selectedTheme = db.QueryFirstOrDefault<ProductTheme>(query, parameters);

            return selectedTheme;
        }

        public ProductTheme AddTheme(ProductTheme themeToAdd)
        {
            var sql = @"INSERT INTO [dbo].[ProductThemes]
                                    ([Theme],
                                     [IsActive])
                                Output inserted.Id
                                VALUES
                                    (@theme, @isActive)";
            
            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, themeToAdd);

            var queryGetTheme = @"select *
                                from ProductThemes
                                Where Id = @id";

            var parameters = new { id = newId };

            var newTheme = db.QueryFirstOrDefault<ProductTheme>(queryGetTheme, parameters);

            return newTheme;
        }

        public ProductTheme Update(int id, ProductTheme theme)
        {
            var sql = @"UPDATE [dbo].[ProductThemes]
                            SET [Theme] = @theme,
                                [IsActive] = @isActive
                            OUTPUT INSERTED.*
                            WHERE Id = @id";
            using var db = new SqlConnection(_connectionString);

            var parameters = new
            {
                theme.Theme,
                theme.IsActive,
                id //shortcut for id = id since both the parameter and the property are called id
            };

            var updatedTheme = db.QueryFirstOrDefault<ProductTheme>(sql, parameters);

            return updatedTheme;
        }
    }
}
