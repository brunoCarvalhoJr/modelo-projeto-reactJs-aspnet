using System;
using System.Collections.Generic;

namespace Sync.Base
{
  public interface IBaseAdapter<TEntityTarget, TEntitySource>
  {
    List<TEntityTarget> Pull(List<TEntitySource> source);

    List<TEntitySource> Push(List<TEntityTarget> source);

    TEntityTarget PullConvertEntity(TEntitySource source);

    TEntitySource PushConvertEntity(TEntityTarget source);
  }
}
