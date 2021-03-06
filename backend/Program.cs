using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Models;

namespace backend
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var host = CreateHostBuilder(args).Build();

      CreateDbIfNotExists(host);

      host.Run();
    }

    private static void CreateDbIfNotExists(IHost host)
    {
      using (var scope = host.Services.CreateScope())
      {
        var services = scope.ServiceProvider;
        try
        {
          var context = services.GetRequiredService<AgroContext>();
          var userManager = services.GetRequiredService<UserManager<Usuario>>();
          context.Database.EnsureCreated();
          DbInitializer.Initialize(userManager, context);
        }
        catch (Exception ex)
        {
          var logger = services.GetRequiredService<ILogger<Program>>();
          logger.LogError(ex, "An error occurred creating the DB.");
        }
      }
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
              webBuilder.UseStartup<Startup>()
#if DEBUG
                .UseUrls("http://localhost:5000")
#else
                .UseUrls("http://159.65.216.107:5000")
#endif
                .UseKestrel(options =>
            {
              options.Limits.MaxRequestBodySize = long.MaxValue;
            });
            });
  }
}
