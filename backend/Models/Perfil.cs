using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Models
{
  /// <summary>
  /// Papéis
  /// </summary>
  [Table("perfil", Schema = "monitoramento")]
  public partial class Perfil : IdentityRole<int>
  {
    #region Properties

    /// <summary>
    /// Nome
    /// </summary>
    [StringLength(40)]
    public override string Name
    {
      get => base.Name;
      set => base.Name = value;
    }

    #endregion Properties

    #region Contructors

    public Perfil()
    {

    }

    #endregion Contructors
  }
}
