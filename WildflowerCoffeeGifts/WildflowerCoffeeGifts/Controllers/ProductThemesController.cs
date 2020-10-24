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

        [HttpGet("{id}")]
        public IActionResult GetThemeById(int id)
        {
            var selectedTheme = _themeRepo.GetThemeById(id);
            if (selectedTheme == null) return NotFound("We did not find a theme with that ID. Please try again.");
            return Ok(selectedTheme);
        }

        [HttpPost]
        public IActionResult CreateTheme(ProductTheme newTheme)
        {
            _themeRepo.AddTheme(newTheme);

            return Created($"/api/themes/{newTheme.Id}", newTheme);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTheme(int id, ProductTheme theme)
        {
            var updatedTheme = _themeRepo.Update(id, theme);

            return Ok(updatedTheme);
        }
    }
}
