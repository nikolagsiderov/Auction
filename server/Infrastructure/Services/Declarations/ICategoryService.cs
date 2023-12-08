using Data.DTOs;
using Infrastructure.Models.Category;

namespace Infrastructure.Services.Declarations
{
    public interface ICategoryService
    {
        IEnumerable<Category> GetCollection();
        Category? GetEntityByID(long id);
        Category? GetEntityByTitle(string title);
        void Create(CreateCategory model, User user);
    }
}
