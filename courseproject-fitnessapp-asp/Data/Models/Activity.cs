using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace courseproject_fitnessapp_asp.Data
{
    public class Activity
    {
        [Key]
        public int id { get; set; }
        public string activity_name { get; set; }
        public double coefficient { get; set; }
    }
}
