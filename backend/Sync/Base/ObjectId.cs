
using System;

namespace Sync.Base
{
  public class ObjectId
  {
    public Guid Id { get; set; }

    public ObjectId(){}

    public ObjectId(Guid id)
    {
      this.Id = id;
    }
  }
}