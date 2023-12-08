using Infrastructure.Services.Declarations;
using Infrastructure.Services;
using APIs.Helpers;
using Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSqlite<DataContext>(Configuration.DatabaseConnectionString);

builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<ISettingsService, SettingsService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IItemService, ItemService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsEnvironment("dev") || app.Environment.IsEnvironment("sta"))
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

if (app.Environment.IsEnvironment("dev"))
{
    app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod());
}

app.UseMiddleware<JwtMiddleware>();
app.MapControllers();

app.Run();
