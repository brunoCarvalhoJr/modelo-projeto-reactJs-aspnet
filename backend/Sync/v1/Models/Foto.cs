using System;
using Sync.Base;

namespace Sync.v1.Models
{
  public class Foto : ObjectId
  {
    public String Uri { get; set; }
    public String Nome { get; set; }
    public String Path { get; set; }
    public DateTime Date;
  }
}
