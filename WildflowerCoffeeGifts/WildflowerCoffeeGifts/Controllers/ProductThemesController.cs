using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WildflowerCoffeeGifts.DataAccess;
using WildflowerCoffeeGifts.Models;

namespace WildflowerCoffeeGifts.Controllers
{
    [Route("api/themes")]
    [ApiController]
    public class ProductThemesController : ControllerBase
    {
        ProductThemeRepository _themeRepo;
        public ProductThemesController()
        {
            _themeRepo = new ProductThemeRepository();
        }

        [HttpGet]
        public IActionResult GetAllThemes()
        {
            var allThemes = _themeRepo.GetAllThemes();

            return Ok(allThemes);
        }

        // Get themes by status (to see only active/not deleted records or only inactive/deleted themes):
        [HttpGet("bystatus/{isActive}")]
        public IActionResult GetThemesByStatus(bool isActive)
        {
            var themesByStatus = _themeRepo.GetThemesByStatus(isActive);

            return Ok(themesByStatus);
        }


        [HttpGet("{id}")]
        public IActionResult GetThemeById(int id)
        {
            var selectedTheme = _themeRepo.GetThemeById(id);
            if (selectedTheme == null) return NotFound("We did not find a product theme with that ID. Please try again.");
            return Ok(selectedTheme);
        }

        [HttpPost]
        public IActionResult CreateTheme(ProductTheme newTheme)
        {
            var brandNewTheme = _themeRepo.AddTheme(newTheme);

            return Created($"/api/themes/{newTheme.Id}", brandNewTheme);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTheme(int id, ProductTheme theme)
        {
            var updatedTheme = _themeRepo.Update(id, theme);

            if(_themeRepo.GetThemeById(id) == null)
            {
                return NotFound("We could not delete this record because we did not find a product theme with that ID. Please try again.");
            }

            return Ok(updatedTheme);
        }
    }
}
