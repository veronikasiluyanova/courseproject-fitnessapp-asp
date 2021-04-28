using Microsoft.AspNet.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using courseproject_fitnessapp_asp.Data;

namespace courseproject_fitnessapp_asp
{
    public class JwtHandler
    {
        //private readonly IConfiguration _configuration;
        //private readonly IConfigurationSection _jwtSettings;
        //private readonly UserManager<IUser> _userManager;
        //public JwtHandler(IConfiguration configuration, UserManager<User> userManager)
        //{
        //    _userManager = userManager;
        //    _configuration = configuration;
        //    _jwtSettings = _configuration.GetSection("JwtSettings");
        //}

        //public SigningCredentials GetSigningCredentials()
        //{
        //    var key = Encoding.UTF8.GetBytes(_jwtSettings.GetSection("securityKey").Value);
        //    var secret = new SymmetricSecurityKey(key);

        //    return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        //}

        //public async Task<List<Claim>> GetClaims(Account user)
        //{
        //    var claims = new List<Claim>
        //    {
        //        new Claim(ClaimTypes.Name, user.Email)
        //    };

        //    var roles = await _userManager.GetRolesAsync(user);
        //    foreach (var role in roles)
        //    {
        //        claims.Add(new Claim(ClaimTypes.Role, role));
        //    }

        //    return claims;
        //}

        //public JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        //{
        //    var tokenOptions = new JwtSecurityToken(
        //        issuer: _jwtSettings.GetSection("validIssuer").Value,
        //        audience: _jwtSettings.GetSection("validAudience").Value,
        //        claims: claims,
        //        expires: DateTime.Now.AddMinutes(Convert.ToDouble(_jwtSettings.GetSection("expiryInMinutes").Value)),
        //        signingCredentials: signingCredentials);

        //    return tokenOptions;
        //}
    }

}
