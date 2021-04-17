using backend.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Models;
using NetTopologySuite.Features;
using NetTopologySuite.Geometries;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using Sync.v1;

namespace backend
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddCors();

      services.AddDbContextPool<AgroContext>(optionsAction =>
      {
        optionsAction.EnableSensitiveDataLogging();
        optionsAction.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"), x => x.UseNetTopologySuite());
        optionsAction.UseLazyLoadingProxies(true);
      });

      services.AddIdentity<Usuario, Perfil>(options =>
        {
          options.Password.RequireDigit = false;
          options.Password.RequireLowercase = false;
          options.Password.RequireUppercase = false;
          options.Password.RequireNonAlphanumeric = false;
          options.SignIn.RequireConfirmedEmail = false;
          options.SignIn.RequireConfirmedPhoneNumber = false;
          options.Lockout.AllowedForNewUsers = true;
        })
        .AddEntityFrameworkStores<AgroContext>()
        .AddDefaultTokenProviders();

      services.AddControllers(options =>
      {
        options.ModelMetadataDetailsProviders.Add(new SuppressChildValidationMetadataProvider(typeof(Point)));
        options.ModelMetadataDetailsProviders.Add(new SuppressChildValidationMetadataProvider(typeof(Feature)));
        options.ModelMetadataDetailsProviders.Add(new SuppressChildValidationMetadataProvider(typeof(Coordinate)));
        options.ModelMetadataDetailsProviders.Add(new SuppressChildValidationMetadataProvider(typeof(LineString)));
        options.ModelMetadataDetailsProviders.Add(new SuppressChildValidationMetadataProvider(typeof(MultiLineString)));
        options.ModelMetadataDetailsProviders.Add(new SuppressChildValidationMetadataProvider(typeof(FeatureCollection)));
      }).AddNewtonsoftJson(options =>
      {
        options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
        // options.SerializerSettings.DateFormatString = "dd/MM/yyyy HH:mm:ss";
        options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;
        options.SerializerSettings.DateFormatHandling = DateFormatHandling.IsoDateFormat;
        options.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
        foreach (var converter in NetTopologySuite.IO.GeoJsonSerializer.Create(new GeometryFactory(new PrecisionModel(), 4326)).Converters)
        {
          options.SerializerSettings.Converters.Add(converter);
        }
      }).SetCompatibilityVersion(CompatibilityVersion.Version_3_0);


      services.AddDatabaseDeveloperPageExceptionFilter();
      services.AddScoped<SyncPullService>();
      services.AddScoped<SyncPushService>();
      services.AddScoped<SyncPopulateService>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      //app.UseCors("CorsPolicy");
      app.UseCors(x => x
               .AllowAnyMethod()
               .AllowAnyHeader()
               .SetIsOriginAllowed(origin => true) // allow any origin
               .AllowCredentials()); // allow credentials
      // for Linux compatibility
      app.UseForwardedHeaders(new ForwardedHeadersOptions
      {
        ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
      });
      app.UseDefaultFiles();
      app.UseStaticFiles();
      app.UseRouting();
      app.UseAuthentication();
      app.UseAuthorization();
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
