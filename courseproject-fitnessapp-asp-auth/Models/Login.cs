using System.ComponentModel.DataAnnotations;

namespace courseproject_fitnessapp_asp_auth.Models
{
    public class Login
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
