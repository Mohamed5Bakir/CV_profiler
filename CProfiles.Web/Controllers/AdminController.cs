using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CProfiles.Web.Controllers
{
    [Authorize(Roles = "Administrator")]
    public class AdminController : Controller
    {
        public ActionResult AddGroup()
        {
            return View();
        }
        public ActionResult AddField()
        {
            return View();
        }
	}
}