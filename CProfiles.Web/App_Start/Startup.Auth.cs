using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin.Security.Providers.LinkedIn;
using Owin;
using Microsoft.Owin.Security.Facebook;

namespace CProfiles.Web
{
    public partial class Startup
    {
        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            // Enable the application to use a cookie to store information for the signed in user
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/Login")
            });
            // Use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Uncomment the following lines to enable logging in with third party login providers
            //app.UseMicrosoftAccountAuthentication(
            //    clientId: "000000004C14CB77",
            //    clientSecret: "jDpRcoE2B6c2QyXowqf-mQSs6jhyEJg6");

            //app.UseTwitterAuthentication(
            //   consumerKey: "",
            //   consumerSecret: "");    
            var facebook = new FacebookAuthenticationOptions();
            facebook.AppId = "799303593470744";
            facebook.AppSecret = "778c1b6233044d2ff483648f6f6f081f";

            facebook.Provider = new FacebookAuthenticationProvider()
            {
                OnAuthenticated = async context =>
                {
                    context.Identity.AddClaim(new System.Security.Claims.Claim("FacebookAccessToken", context.AccessToken));
                    foreach (var claim in context.User)
                    {
                        var claimType = string.Format("urn:facebook:{0}", claim.Key);
                        string claimValue = claim.Value.ToString();
                        if (!context.Identity.HasClaim(claimType, claimValue))
                            context.Identity.AddClaim(new System.Security.Claims.Claim(claimType, claimValue, "XmlSchemaString", "Facebook"));

                    }

                }
            };
            facebook.SignInAsAuthenticationType = DefaultAuthenticationTypes.ExternalCookie;
            app.UseFacebookAuthentication(facebook);

            //app.UseGoogleAuthentication();



            var linkedin = new LinkedInAuthenticationOptions();
            linkedin.ClientId = "775uyaqv9v2zhx";
            linkedin.ClientSecret = "xPguLm68a67fFu5Z";
            linkedin.Provider = new LinkedInAuthenticationProvider()
            {
                OnAuthenticated = async context =>
                {
                    context.Identity.AddClaim(new System.Security.Claims.Claim("urn:linkedin:accesstoken", context.AccessToken));
                    foreach (var claim in context.User)
                    {
                        var claimType = string.Format("urn:linkedin:{0}", claim.Key);
                        string claimValue = claim.Value.ToString();
                        if (!context.Identity.HasClaim(claimType, claimValue))
                            context.Identity.AddClaim(new System.Security.Claims.Claim(claimType, claimValue, "XmlSchemaString", "LinkedIn"));

                    }

                }
            };
            linkedin.SignInAsAuthenticationType = DefaultAuthenticationTypes.ExternalCookie;
            app.UseLinkedInAuthentication(linkedin);
            //app.UseLinkedInAuthentication("775uyaqv9v2zhx", "xPguLm68a67fFu5Z");
        }
    }
}