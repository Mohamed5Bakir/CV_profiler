using System;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace CProfiles.Web.Models
{
    public class ExternalLoginConfirmationViewModel
    {

        [Required]
        [Display(Name = "Nom d'utilisateur")]
        public string UserName { get; set; }


        [Display(Name = "Nom")]
        public string LastName { get; set; }

        [Display(Name = "Prénom")]
        public string FirstName { get; set; }

        [Display(Name = "Pays")]
        public string Pays { get; set; }

        [Display(Name = "Sexe")]
        public string Sexe { get; set; }

        [Display(Name = "Date de naissance")]
        [DataType(DataType.Date)]
        public DateTime DateNaissance { get; set; } 

        [Display(Name = "Photo")]
        public string ImageUrl { get; set; }
    }

    public class ManageUserViewModel
    {
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Mot de passe actuel")]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Nouveau mot de passe")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirmer mot de passe")]
        [Compare("NewPassword", ErrorMessage = "Le nouveau mot de passe et confirmation ne correspondent pas.")]
        public string ConfirmPassword { get; set; }
    }

    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Nom d'utilisateur")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Mot de passe")]
        public string Password { get; set; }

        [Display(Name = "Se souvenir de moi?")]
        public bool RememberMe { get; set; }
    }

    public class RegisterViewModel
    {
        [Required]
        [Display(Name = "Nom d'utilisateur")]
        public string UserName { get; set; }

        [Required]
        [Display(Name = "Prénom ")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Nom")]
        public string LastName { get; set; }

        [Display(Name = "Pays")]
        public string Pays { get; set; }

        [Display(Name = "Sexe")]
        public string Sexe { get; set; }

        [Display(Name = "Date de naissance")]
        [DataType(DataType.Date)]
        public DateTime DateNaissance { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Mot de passe")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirmer mot de passe")]
        [Compare("Password", ErrorMessage = "Le mot de passe et confirmation ne correspondent pas")]
        public string ConfirmPassword { get; set; }

    }
    public class EditInfoModel
    {
        [Required]
        [Display(Name = "Nom d'utilisateur")]
        public string UserName { get; set; }

        [DataType(DataType.Upload)]
        [Display(Name = "Photo")]
        public HttpPostedFileBase ImageUpload { get; set; }


        [Display(Name = "Preview Photo")]
        public string PhotoUrl { get; set; }
    } 
}
