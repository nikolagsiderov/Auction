using Data;
using Data.DTOs;
using Infrastructure.Models.Category;
using Infrastructure.Services.Declarations;

namespace Infrastructure.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly DataContext _dataContext;

        public CategoryService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void Create(CreateCategory model, User user)
        {
            var category = model.ToDTO();
            category.CreatedByID = user.ID;

            _dataContext.Categories.Add(category);
            _dataContext.SaveChanges();
        }

        public IEnumerable<Category> GetCollection()
        {
            var result = _dataContext.Categories.ToList();
            return result;
        }

        public Category? GetEntityByID(long id)
        {
            return _dataContext.Categories.FirstOrDefault(x => x.ID == id);
        }

        public Category? GetEntityByTitle(string title)
        {
            return _dataContext.Categories.FirstOrDefault(x => x.Title == title);
        }
    }
}
