using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WildflowerCoffeeGifts.DataAccess;
using WildflowerCoffeeGifts.Models;
using Microsoft.AspNetCore.Authorization;

namespace WildflowerCoffeeGifts.Controllers
{

    [Route("api/users")]
    [ApiController]
    [Authorize]
    // [AllowAnonymous] add this to any method that does not require auth
    public class UsersController : FirebaseEnabledController
    {
        UsersRepository _userRepo;
        public UsersController()
        {
            _userRepo = new UsersRepository();
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var allUsers = _userRepo.GetAllUsers();

            return Ok(allUsers);
        }

        [HttpGet("{id}")]
        public IActionResult GetUsersById(int id)
        {
            var selectedUser = _userRepo.GetUsersById(id);
            if (selectedUser == null) return NotFound("We did not find a user with that ID. Please try again.");
            return Ok(selectedUser);
        }

        // trying!! get user by uid??
        [HttpGet("uid/{uid}")]
        public IActionResult GetUserByUid(int uid)
        {
            var selectedUser = _userRepo.GetUserByUid(uid);
            if (selectedUser == null) return NotFound("We did not find a user with that UID. Please try again.");
            return Ok(selectedUser);
        }

        [HttpPost]
        public IActionResult CreateUser(User user) 
        {
            _userRepo.Add(user);
            return Created($"/api/users/{user.Id}", user);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, User user)
        {
            var updatedUser = _userRepo.Update(id, user);

            return Ok(updatedUser);
        }

    }
}
