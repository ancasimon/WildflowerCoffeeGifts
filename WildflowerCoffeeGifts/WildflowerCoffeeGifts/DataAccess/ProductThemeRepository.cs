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

        public void AddTheme(ProductTheme themeToAdd)
        {
            var sql = @"INSERT INTO [dbo].[ProductThemes]
                                    ([Theme],
                                     [IsActive])
                                Output inserted.Id
                                VALUES
                                    (@theme, @isActive)";
            
            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, themeToAdd);
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
