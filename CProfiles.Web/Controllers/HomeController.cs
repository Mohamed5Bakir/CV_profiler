using System.Web.Mvc;
using CProfiles.Web.Filters;
using CProfiles.Web.Models;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;

namespace CProfiles.Web.Controllers
{
    [AuthorizeEx(RedirectUrl = "~/Home/Intro")]
    public class HomeController : Controller
    {
        ApplicationDbContext _db = new ApplicationDbContext();
        CustomFieldServices service = new CustomFieldServices();
        UserManager<ApplicationUser> manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
        public async Task<ActionResult> Index()
        {
            ApplicationUser user = await manager.FindByIdAsync(User.Identity.GetUserId());
            return View(user);
        }
        public ActionResult PDF()
        {
            return new Rotativa.ViewAsPdf()
            {
                FileName = "CV.pdf",
                PageSize = Rotativa.Options.Size.A4,
            };
        }
        [AllowAnonymous]
        public ActionResult Intro()
        {
            return View();
        }
        [AllowAnonymous]
        public ActionResult Test()
        {
            return View();
        }


    }
}