using System;
using System.ComponentModel.DataAnnotations;

namespace courseproject_fitnessapp_asp.Data
{
    public class Diary
    {
        [Key]
        public int id { get; set; }
        public DateTime date_record { get; set; }
        public string record { get; set; }
        public int user_id { get; set; }
    }
}
