using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CProfiles.Entity
{
    public class UserBase
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Pays { get; set; }
        public string Sexe { get; set; }
        [DataType(DataType.Date)]
        public DateTime DateNaissance { get; set; } 
        public virtual Image Photo { get; set; }
        public virtual ICollection<CustomFieldValue> CustomFieldValues { get; set; }
    }
}
