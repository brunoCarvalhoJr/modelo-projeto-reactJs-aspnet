using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace Models
{
  [Table("usuario", Schema = "monitoramento")]
  public partial class Usuario : IdentityUser<int>
  {
    #region Properties

    [StringLength(40)]
    [Required]
    public string Nome { get; set; }

    [StringLength(40)]
    public override string Email
    {
      get => base.Email;
      set => base.Email = value;
    }

    [StringLength(14)]
    public string CpjCnpj { get; set; }

    public bool Desativado { get; set; }

    #endregion

    #region Contructors

    public Usuario()
    {
    }

    #endregion Contructors
  }
}
