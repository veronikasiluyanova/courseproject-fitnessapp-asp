using System.ComponentModel.DataAnnotations;

namespace courseproject_fitnessapp_asp.Data
{
    public class Goal
    {
        [Key]
        public int id { get; set; }
        public string goal_name { get; set; }
    }
}
