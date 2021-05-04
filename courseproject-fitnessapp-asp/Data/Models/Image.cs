using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace courseproject_fitnessapp_asp.Data.Models
{
    public class Image
    {
        [Key]
        public int id { get; set; }
        //public int user_id { get; set; }
        public byte[] image { get; set; }
    }
}
