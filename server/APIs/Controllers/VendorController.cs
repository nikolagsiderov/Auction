using APIs.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace APIs.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class VendorController : ControllerBase
    {
        public VendorController()
        {
        }

        [Route("dashboard")]
        [HttpGet]
        public JsonResult Dashboard()
        {
            // Make some calculations here...
            // For now we will use mock data...
            var result = new List<object>()
            {
            new
            {
                id = 1,
                title = "Покупки",
                amount1 = "32,350",
                amount2 = 9350,
                color = "info.main",
                percentage = "25.25%"
            },
            new
            {
                id = 1,
                title = "Нещо си",
                amount1 = "32,350",
                amount2 = 9350,
                color = "info.main",
                percentage = "25.25%"
            },
            new
            {
                id = 1,
                title = "Друго",
                amount1 = "32,350",
                amount2 = 9350,
                color = "info.main",
                percentage = "25.25%"
            },
            new
            {
                id = 1,
                title = "Трето",
                amount1 = "32,350",
                amount2 = 9350,
                color = "info.main",
                percentage = "25.25%"
            }
            };

            return new JsonResult(result);
        }
    }
}
