using System;

namespace courseproject_fitnessapp_asp_auth.Models
{
    public class Account
    {
        public Guid id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public Role role { get; set; }
    }

    public enum Role
    {
        User,
        Admin
    }
}
