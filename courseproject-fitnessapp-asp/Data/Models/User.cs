using System;
using System.ComponentModel.DataAnnotations;

namespace courseproject_fitnessapp_asp.Data
{
    public class User
    {
        [Key]
        public int id { get; set; }
        public Guid account_id { get; set; }
        public string email { get; set; }
        public string username { get; set; }
        public string gender { get; set; }
        public DateTime birthday { get; set; }
        public int goal_id { get; set; }
        public double? goal_weight { get; set; }
        public double protein_norm { get; set; }
        public double fats_norm { get; set; }
        public double carbs_norm { get; set; }
        public double kcal_norm { get; set; }
        public string? additional_info { get; set; }
        // Photo { get; set; }
    }
}
