using CProfiles.Entity;
using CProfiles.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Helpers;
using System.Data.Entity;

namespace CProfiles.Web.Controllers
{
    public class AdminJsonController : Controller
    {
        ApplicationDbContext _db = new ApplicationDbContext();
        CustomFieldServices service = new CustomFieldServices();
        public ActionResult GetGroups()
        {
            var groups = _db.CustomGroups.OrderBy(g => g.GroupOrder).ToList();
            return Json(groups, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddGroup(string GroupName, string GroupColor)
        {
            int currentMaxOrder = _db.CustomGroups.Count();
            if (_db.CustomGroups.Where(g => g.GroupName == GroupName).FirstOrDefault() == null)
            {
                _db.CustomGroups.Add(new Entity.CustomGroup { GroupName = GroupName, GroupColor = GroupColor, GroupOrder = currentMaxOrder + 1 });
                _db.SaveChanges();
                return Json("OK");
            }
            else
            {

                return Json("NO");
            }
        }

        public ActionResult UpdateGroupOrder()
        {
            var json = System.Web.Helpers.Json.Decode(Request["Ids"]);
            object[] ids = json;
            var groups = _db.CustomGroups.OrderBy(g => g.GroupOrder).ToList();
            try
            {
                foreach (var group in groups)
                {
                    group.GroupOrder = Array.FindIndex(ids, i => int.Parse(i.ToString()) == group.GroupOrder) + 1;
                    _db.Entry(group).State = EntityState.Modified;
                }
                _db.SaveChanges();
                return Json("ok");
            }
            catch (Exception)
            {


                return Json("no");
            }

        }

        public ActionResult AddField(string InfoName, FieldDataType DataType, int GroupID, TextType TextType = TextType.Libre, IntType IntType = IntType.Nombre, int? minValue = null, int? maxValue = null, string HaveMany = "no", string Required = "no", int Echelle = 5, string Defaults = null)
        {
            string def = "";
            if (Defaults != null)
            {
                var Listedefaults = Defaults.Trim().Split('\r', '\n');
                foreach (var item in Listedefaults)
                {
                    def += String.IsNullOrWhiteSpace(item) ? "" : ";" + item;
                }
            }
            var group = _db.CustomGroups.Find(GroupID);
            var fields = group.CustomFields;
            if (fields.Where(g => g.InfoName == InfoName).FirstOrDefault() == null)
            {
                if (maxValue == null) maxValue = Echelle;
                service.AddField(InfoName, DataType, group.GroupName, TextType, IntType, minValue, maxValue, HaveMany == "on", Required == "on", def);
                return Json("OK");
            }
            else
            {

                return Json("NO");
            }
        }
    }
}