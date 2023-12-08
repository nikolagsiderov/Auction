using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using System.Reflection;

namespace Data
{
    public static class Configuration
    {
        private static IConfigurationRoot appSettingsBuild
        {
            get 
            {
                var env = Environment.GetEnvironmentVariable("DOTNET_ENVIRONMENT")!;

                if (env.Equals("prod"))
                {
                    var envPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!;
                    var provider = new PhysicalFileProvider(Path.Combine(envPath, @"../../../../config"));
                    var build = new ConfigurationBuilder()
                        .AddJsonFile(provider, $"appsettings.json", true, true)
                        .Build();

                    return build;
                }
                else
                {
                    var envPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!;
                    var provider = new PhysicalFileProvider(Path.Combine(envPath, @"../../../../config"));
                    var build = new ConfigurationBuilder()
                        .AddJsonFile(provider, $"appsettings.{env}.json", true, true)
                        .Build();

                    return build;
                }
            }
        }

        public static string DatabaseConnectionString
        {
            get
            {
                var databaseName = appSettingsBuild
                    .GetSection("Database")
                    .GetSection("Name")
                    .Value!;
                var companyName = appSettingsBuild
                    .GetSection("Company")
                    .GetSection("Name")
                    .Value!;
                var driveName = Path.GetPathRoot(Environment.SystemDirectory);

                return string.Format("Data Source={0}{1}\\{2}", driveName, companyName, databaseName)!;
            }
        }

        public static string AccessTokenSecret
        {
            get
            {
                return appSettingsBuild
                    .GetSection("Authentication")
                    .GetSection(nameof(AccessTokenSecret))
                    .Value!;
            }
        }

        public static string RefreshTokenSecret
        {
            get
            {
                return appSettingsBuild
                    .GetSection("Authentication")
                    .GetSection(nameof(RefreshTokenSecret))
                    .Value!;
            }
        }

        public static string StorageDirectory
        {
            get
            {
                var systemDir = Path.GetPathRoot(Environment.SystemDirectory);
                var result = $"{systemDir}Beeds\\storage";

                return result;
            }
        }
    }
}
