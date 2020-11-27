using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace courseproject_fitnessapp_asp.Data
{
    public class Account
    {
       // public Guid id { get; set; }
       public string id { get; set; }
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
