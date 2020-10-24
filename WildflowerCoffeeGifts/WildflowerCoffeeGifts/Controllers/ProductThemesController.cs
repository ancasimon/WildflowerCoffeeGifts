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
    }
}
