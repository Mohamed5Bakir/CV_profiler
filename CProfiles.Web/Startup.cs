using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CProfiles.Web.Startup))]
namespace CProfiles.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
