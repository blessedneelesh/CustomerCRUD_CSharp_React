using CustomerMaintenance.Models.DataLayer;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<CustomerMAContext>(ServiceLifetime.Transient);

//builder.Services.AddTransient<CustomerMAContext>();

/*builder.Services.AddDbContext<CustomerMAContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CustomerContext"),
    sqlServerOptionsAction: sqlOptions => // by neelesh transient failure because of no db.
    {
        sqlOptions.EnableRetryOnFailure();
    }));
*/
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(builder => builder
       .AllowAnyHeader()
       .AllowAnyMethod()
       .AllowAnyOrigin()
    );

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
