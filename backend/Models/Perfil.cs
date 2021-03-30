using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;
using Microsoft.AspNetCore.Identity;

namespace Models
{
  [Table("perfil", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public partial class Perfil : IdentityRole<int>
  {
    #region Properties

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
