using System.ComponentModel.DataAnnotations;

namespace courseproject_fitnessapp_asp.Data
{
    public class Recipe
    {
        [Key]
        public int id { get; set; }
        public string recipe { get; set; }
    }
}
