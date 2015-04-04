using System;
using CProfiles.Entity;
using System.Linq;
using System.Data.Entity;


namespace CProfiles.Web.Models
{
    public class CustomFieldServices
    {
        ApplicationDbContext _db;

        public CustomFieldServices()
        {
            _db = new ApplicationDbContext();
        }
        public void SetField(UserBase user, CustomField cf, object value)
        {
            var User = _db.Users.Find(user.ID);
            CustomFieldValue cfv = new CustomFieldValue
            {
                UserBase = user,
                CustomField = cf
            };

             SetValue(ref cfv, value);
            _db.CustomFieldValues.Add(cfv);
            _db.SaveChanges();
        }
        public void AddField(string InfoName, FieldDataType DataType, string GroupName, TextType TextType = TextType.Libre, IntType IntType = IntType.Nombre, int? minValue = null, int? maxValue = null, bool HaveMany = false, bool Required = false,string Defaults=null)
        {
            CustomField cf = new CustomField
            {
                InfoName = InfoName,
                DataType = DataType,
                HaveMany = HaveMany,
                required=Required,
                Defaults=Defaults
            };
            switch (DataType)
            {
                case FieldDataType.String: { cf.TextType = TextType; break; };
                case FieldDataType.Int: { cf.IntType = IntType; cf.Min = minValue; cf.Max = maxValue; break; };
                case FieldDataType.Decimal:
                case FieldDataType.Double: { cf.Min = minValue;cf.Max=maxValue ; break; };
                case FieldDataType.DateTime: { ;break; };
                default: { ;break; };
            }
            var group = _db.CustomGroups.Where(g => g.GroupName == GroupName).Single();
            group.CustomFields.Add(cf);
            _db.Entry(group).State = EntityState.Modified;
            _db.SaveChanges();
        }
        public object GetValue(CustomFieldValue value)
        {
            Type t = GetDataType(value.CustomField);
            switch (t.ToString())
            {
                case "System.String": return value.StringValue;
                case "System.Int32": return value.IntValue;
                case "System.Decimal": return value.DecimalValue;
                case "System.Double": return value.DoubleValue;
                case "System.DateTime": return value.DateTimeValue;
                default: return null;
            }
        }
        public void SetValue(ref CustomFieldValue Field, object value)
        {
            Type t = GetDataType(Field.CustomField);
            switch (t.ToString())
            {
                case "System.String": { Field.StringValue = value as string; break; }
                case "System.Int32": { Field.IntValue = (int)value; break; }
                case "System.Decimal": { Field.DecimalValue = (decimal)value; break; }
                case "System.Double": { Field.DoubleValue = (double)value; break; }
                case "System.DateTime": { Field.DateTimeValue = (DateTime)value; break; }
                default: { break; }
            }
        }
        public Type GetDataType(CustomField CustomField)
        {
            switch (CustomField.DataType)
            {
                case FieldDataType.String: return typeof(String);
                case FieldDataType.Int: return typeof(Int32);
                case FieldDataType.Decimal: return typeof(Decimal);
                case FieldDataType.Double: return typeof(Double);
                case FieldDataType.DateTime: return typeof(DateTime);
                default: return null;
            }
        }

    }
}
