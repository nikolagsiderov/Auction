using APIs.Helpers;
using Data.DTOs;
using Infrastructure.Models.Item;
using Infrastructure.Services.Declarations;
using Microsoft.AspNetCore.Mvc;

namespace APIs.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemsController : ControllerBase
    {
        private IItemService _itemService;
        private IFileService _fileService;

        public ItemsController(IItemService itemService, IFileService fileService)
        {
            _itemService = itemService;
            _fileService = fileService;
        }

        [Authorize]
        [Route("create")]
        [HttpPost]
        public IActionResult Create([FromForm] CreateItem model)
        {
            try
            {
                var user = (User)HttpContext.Items["User"]!;
                var ID = _itemService.Create(model, user);

                byte[] fileBytes;
                var files = HttpContext.Request.Form.Files;

                foreach (var file in files)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        file.CopyTo(memoryStream);
                        fileBytes = memoryStream.ToArray();
                    }

                    try
                    {
                        var image = _fileService.SaveToDatabase(fileBytes, ID, user);
                        _fileService.SaveToStorage(fileBytes, image);
                    }
                    catch (Exception ex)
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                    }
                }

                return Ok(ID);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize]
        [Route("bid")]
        [HttpPost]
        public IActionResult Bid([FromBody] ItemBid model)
        {
            try
            {
                var user = (User)HttpContext.Items["User"]!;
                _itemService.Bid(model, user);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize]
        [Route("buynow")]
        [HttpPost]
        public IActionResult BuyNow([FromBody] ItemBuyNow model)
        {
            try
            {
                var user = (User)HttpContext.Items["User"]!;
                _itemService.BuyNow(model, user);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public IActionResult Items()
        {
            return Ok(_itemService.GetCollection());
        }

        [Route("{id}")]
        [HttpGet]
        public IActionResult Items(long id)
        {
            return Ok(_itemService.GetEntityByID(id));
        }

        [Route("identity")]
        [HttpGet]
        public IActionResult Identity()
        {
            var items = _itemService.GetCollection();
            var result = items.Select(x => x.ID);

            return Ok(result);
        }

        [Route("image/{imageName}")]
        [HttpGet]
        public IActionResult GetImage(string imageName)
        {
            return new FileContentResult(_fileService.GetImage(imageName), @"image/png");
        }
    }
}