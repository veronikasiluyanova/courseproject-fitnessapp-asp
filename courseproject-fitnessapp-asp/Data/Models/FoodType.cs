using System.ComponentModel.DataAnnotations;

namespace courseproject_fitnessapp_asp.Data
{
    public class FoodType
    {
        [Key]
        public int id { get; set; }
        public string food_type { get; set; }
    }
}
