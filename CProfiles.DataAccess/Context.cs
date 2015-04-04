using CProfiles.Entity;
using System.Data.Entity;

namespace CProfiles.DataAccess
{
    public class Context : DbContext
    {
        public Context()
            : base("DefaultConnexion")
        {
        }
        public DbSet<UserBase> Users { get; set; }
        public DbSet<CustomField> CustomFields { get; set; }
        public DbSet<CustomFieldValue> CustomFieldValues { get; set; }
        public DbSet<CustomGroup> CustomGroups { get; set; }
    }
}
