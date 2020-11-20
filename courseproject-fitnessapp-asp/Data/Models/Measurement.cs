using System;
using System.ComponentModel.DataAnnotations;

namespace courseproject_fitnessapp_asp.Data
{
    public class Measurement
    {
        [Key]
        public int id { get; set; }
        public DateTime date_measurement { get; set; }
        public float height { get; set; }
        public float weight { get; set; }
        public float chest { get; set; }
        public float waist { get; set; }
        public float hip { get; set; }
        public int user_id { get; set; }
    }
}
