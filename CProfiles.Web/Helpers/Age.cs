using System;
using System.Web.Mvc;

namespace CProfiles.Web.Helpers
{
    public static class AgeExtension
    {
        public static string Age(this HtmlHelper helper, DateTime birthday)
        {
            DateTime now = DateTime.Today;
            int age = now.Year - birthday.Year;
            if (now < birthday.AddYears(age)) age--;

            return age.ToString();
        }
    }
}