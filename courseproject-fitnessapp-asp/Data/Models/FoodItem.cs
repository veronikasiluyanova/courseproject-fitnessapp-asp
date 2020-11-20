using System.ComponentModel.DataAnnotations;

namespace courseproject_fitnessapp_asp.Data
{
    public class FoodItem
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public int food_type_id { get; set; }
        public float protein { get; set; }
        public float fats { get; set; }
        public float carbs { get; set; }
        public float kcal { get; set; }
    }
}
