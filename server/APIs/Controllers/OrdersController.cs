using APIs.Helpers;
using Infrastructure.Services.Declarations;
using Microsoft.AspNetCore.Mvc;

namespace APIs.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class OrdersController : ControllerBase
    {
        private IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public JsonResult Orders()
        {
            return new JsonResult(_orderService.GetCollection());
        }

        [Route("{id}")]
        [HttpGet]
        public JsonResult Orders(long id)
        {
            return new JsonResult(_orderService.GetEntityByID(id));
        }

        [Route("identity")]
        [HttpGet]
        public JsonResult Identity()
        {
            var orders = _orderService.GetCollection();
            var result = orders.Select(x => x.ID);

            return new JsonResult(result);
        }
    }
}