using System;
using System.Collections.Generic;

namespace Sync.Base
{
  public interface IBaseAdapter<TEntityTarget, TEntitySource>
  {
    List<TEntityTarget> Get(List<TEntitySource> source);
  }
}
