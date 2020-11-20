using System;
using System.ComponentModel.DataAnnotations;

namespace courseproject_fitnessapp_asp.Data
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Surname { get; set; }
        public string Firstname { get; set; }
        public string Gender { get; set; }
        public DateTime birthday { get; set; }
        public int Goal_id { get; set; }
        public double? Goal_weight { get; set; }
        public double Protein_norm { get; set; }
        public double Fats_norm { get; set; }
        public double Carbs_norm { get; set; }
        public double Kcal_norm { get; set; }
        public string Additional_info { get; set; }
        // Photo { get; set; }
    }
}
