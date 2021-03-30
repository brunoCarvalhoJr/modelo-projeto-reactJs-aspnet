
using backend.Models;
using backend.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Models;
using System;

namespace backend.Data
{
  public class DbInitializer
  {
    public static void Initialize(UserManager<Usuario> userManager, AgroContext context)
    {
      SeedUsers(context, userManager);
    }

    private static void SeedUsers(AgroContext context, UserManager<Usuario> userManager)
    {
      if (userManager.FindByNameAsync("paulohenriquevn").Result == null)
      {
        var user = new Usuario
        {
          Id = 1,
          Nome = "Paulo",
          UserName = "paulohenriquevn",
          Email = "paulohenriquevn@gmail.com"
        };

        context.SaveChanges();
        var result = userManager.CreateAsync(user, "123456").Result;
      }

      new SeedFazenda(context).Executar();
    }
  }
}
