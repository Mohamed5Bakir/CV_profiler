using System.Collections.Generic;

namespace CProfiles.Entity
{
    public class UserBase
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public virtual Image Photo { get; set; }
        public virtual ICollection<CustomFieldValue> CustomFieldValues { get; set; }
    }
}
