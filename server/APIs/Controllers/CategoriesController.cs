using APIs.Helpers;
using Data.DTOs;
using Infrastructure.Models.Category;
using Infrastructure.Services.Declarations;
using Microsoft.AspNetCore.Mvc;

namespace APIs.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [Authorize]
        [Route("create")]
        [HttpPost]
        public IActionResult Create([FromBody] CreateCategory model)
        {
            try
            {
                var user = (User)HttpContext.Items["User"]!;
                _categoryService.Create(model, user);
            }
            catch (Exception ex)
            {
                //throw ex;
            }

            return Ok();
        }

        [HttpGet]
        public JsonResult Categories()
        {
            return new JsonResult(_categoryService.GetCollection());
        }

        [Route("{id}")]
        [HttpGet]
        public JsonResult Categories(long id)
        {
            return new JsonResult(_categoryService.GetEntityByID(id));
        }

        [Route("identity")]
        [HttpGet]
        public JsonResult Identity()
        {
            var categories = _categoryService.GetCollection();
            var result = categories.Select(x => x.ID);

            return new JsonResult(result);
        }
    }
}
