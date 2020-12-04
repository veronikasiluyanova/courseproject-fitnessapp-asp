using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace courseproject_fitnessapp_asp.Data.Models
{
    public class WaterDiaryRecord
    {
        [Key]
        public int id { get; set; }
        public float ml { get; set; }
        public DateTime date_water { get; set; }
        public int user_id { get; set; }
    }
}
