using System;
using System.ComponentModel.DataAnnotations;

namespace courseproject_fitnessapp_asp.Data.Models
{
    public class FoodDiaryRecord
    {
        [Key]
        public int id { get; set; }
        public int food_id { get; set; }
        public float gramms { get; set; }
        public int meal_id { get; set; }
        public DateTime date_diary { get; set; }
        public int user_id { get; set; }
    }
}
