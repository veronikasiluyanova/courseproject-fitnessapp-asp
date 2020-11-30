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
        public float start_weight { get; set; }
        public float goal_weight { get; set; }
        public float height { get; set; }
        public int activity { get; set; }
        public float protein_norm { get; set; }
        public float fats_norm { get; set; }
        public float carbs_norm { get; set; }
        public float kcal_norm { get; set; }
    }
}
