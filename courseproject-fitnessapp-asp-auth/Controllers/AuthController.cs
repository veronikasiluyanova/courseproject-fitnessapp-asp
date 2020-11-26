using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using courseproject_fitnessapp_asp;
using courseproject_fitnessapp_asp_auth.Models;
using courseproject_fitnessapp_asp_common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Npgsql;

namespace courseproject_fitnessapp_asp_auth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        //private readonly ApplicationContext _context;
        private readonly IOptions<AuthOptions> authOptions;
        private List<Account> accounts = new List<Account>();
        private NpgsqlConnection conn;
        public AuthController(IOptions<AuthOptions> authOptions)
        {
           // _context = context;
            this.authOptions = authOptions;
            conn = new NpgsqlConnection("Host=127.0.0.1;Port=5432;Database=FitnessApp_DB;User ID=vs;Password=password;");
            conn.Open();
            QueryUsers(conn);
            conn.Close();
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
            return accounts.SingleOrDefault(u => u.username == username && u.password == password);
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

             foreach(var r in user.role)
            {
                claims.Add(new Claim("role", r.ToString()));
            }

            var token = new JwtSecurityToken(authParams.Issuer,
                authParams.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParams.TokenLifetime),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private void QueryUsers(NpgsqlConnection conn)
        {
            string sql = "select id, username, password, role from accounts";

            NpgsqlCommand cmd = new NpgsqlCommand(sql, conn);

            using (NpgsqlDataReader reader = cmd.ExecuteReader())
            {
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Role[] r = new Role[] { Role.User };

                        if (reader.GetInt32("role") == 1)
                            r = new Role[] { Role.Admin };

                        accounts.Add(
                        new Account
                        {
                            id = reader.GetGuid("id"),//= Guid.Parse("e2371dc9-a849-4f3c-9004-df8fc921c13a"),
                            username = reader.GetString("username"),//"user@email.com",
                            password = reader.GetString("password"),
                            role = r
                        });

                    }
                }
            }
        }
    }
}