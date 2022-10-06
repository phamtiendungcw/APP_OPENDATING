using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto register)
        {
            if (await UserExit(register.Username))
                return BadRequest("User name is taken");
            using var hmac = new HMACSHA512();

            var user = new AppUser()
            {
                Username = register.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.Username,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto login)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Username == login.Username);

            if (user == null)
                return Unauthorized("Invalid user name");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                    return Unauthorized("Invalid password");
            }

            return new UserDto()
            {
                Username = user.Username,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExit(string userName)
        {
            return await _context.Users.AnyAsync(x => x.Username == userName.ToLower());
        }
    }
}
