using courseproject_fitnessapp_asp_common;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace courseproject_fitnessapp_asp
{
    public class Startup
    {
        private string _connectionString = null;
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            _connectionString = "Host=localhost;Port=5432;Database=FitnessApp_DB;User ID=vs;Password=password;"; //Configuration["DefaultConnection"];


            services.AddRouting();

            services.AddControllers();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddDbContext<ApplicationContext>(options => options.UseNpgsql(_connectionString));

            var authOptionsConfiguration = Configuration.GetSection("Auth");
            var authOptions = Configuration.GetSection("Auth").Get<AuthOptions>();
            services.Configure<AuthOptions>(authOptionsConfiguration);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = authOptions.Issuer,

                        ValidateAudience = true,
                        ValidAudience = authOptions.Audience,

                        ValidateLifetime = true,

                        IssuerSigningKey = authOptions.GetSymmetricSecurityKey(),
                        ValidateIssuerSigningKey = true
                    };
                });

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();            

            app.UseStaticFiles();  
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseCors();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                //endpoints.MapControllerRoute(
                //    name: "default",
                //    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");

                }
            });
        }
    }
}
