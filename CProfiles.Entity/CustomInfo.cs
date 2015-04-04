using System;
using System.Collections.Generic;

namespace CProfiles.Entity
{
    public class CustomGroup
    {
        public int ID { get; set; }
        public string GroupName { get; set; }   
        public string GroupColor{ get; set; }
        public int GroupOrder { get; set; }
        public virtual ICollection<CustomField> CustomFields { get; set; }
    }
    public class CustomField
    {
        public int ID { get; set; }
        public string InfoName { get; set; }
        public bool HaveMany { get; set; }
        public bool required { get; set; }
        public FieldDataType DataType { get; set; }
        public int? Min { get; set; }
        public int? Max { get; set; }
        public TextType TextType { get; set; }
        public IntType IntType { get; set; }
        public string RegEX { get; set; }
        public string Defaults { get; set; }
    }
    public class CustomFieldValue
    {
        public int ID { get; set; }
        public string StringValue { get; set; }
        public int? IntValue { get; set; }
        public decimal? DecimalValue { get; set; }
        public double? DoubleValue { get; set; }
        public DateTime? DateTimeValue { get; set; }
        public virtual UserBase UserBase { get; set; }
        public virtual CustomField CustomField { get; set; }
    }
    public enum FieldDataType
    {
        String = 1,
        Int,
        Decimal,
        Double,
        DateTime,
        List
    }
    public enum TextType
    {
        Libre = 1,
        Email,
        URL,
        Téléphone,
    }
    public enum IntType
    {
        Nombre = 1,
        Evaluation,
    }
}
