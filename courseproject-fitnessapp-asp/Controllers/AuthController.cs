using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using courseproject_fitnessapp_asp;
using courseproject_fitnessapp_asp.Data;
using courseproject_fitnessapp_asp_common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace courseproject_fitnessapp_asp_auth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IOptions<AuthOptions> authOptions;
        private readonly ApplicationContext _context;

        public AuthController(IOptions<AuthOptions> authOptions, ApplicationContext context)
        {
            this.authOptions = authOptions;
            this._context = context;
        }

        [HttpPost, Route("Login")]
        public IActionResult Login([FromBody] Login request)
        {
            var user = AuthenticateUser(request.Username, request.Password);

            if (user != null)
            {
                var token = GenerateJWT(user);

                return Ok(new
                {
                    access_token = token
                });
            }
            return Unauthorized();
        }

        private Account AuthenticateUser(string username, string password)
        {
            return _context.accounts.SingleOrDefault(u => u.username == username && u.password == password);
        }

        private string GenerateJWT(Account user)
        {
            var authParams = authOptions.Value;

            var securityKey = authParams.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Email, user.username),
                new Claim(JwtRegisteredClaimNames.Sub, user.id.ToString())
            };

            claims.Add(new Claim("role", user.role.ToString()));

            var token = new JwtSecurityToken(authParams.Issuer,
                authParams.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParams.TokenLifetime),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}