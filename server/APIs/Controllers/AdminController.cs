using APIs.Helpers;
using Infrastructure.Models.Settings;
using Infrastructure.Services.Declarations;
using Microsoft.AspNetCore.Mvc;

namespace APIs.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private ISettingsService _settingsService;

        public AdminController(ISettingsService settingsService) 
        {
            _settingsService = settingsService;
        }

        [Route("settings/getAuctionSettings")]
        [HttpPost]
        public IActionResult GetAuctionSettings()
        {
            try
            {
                return new JsonResult(_settingsService.GetAuctionSettings());
            }
            catch (Exception ex)
            {
                //throw ex;
            }

            return Ok();
        }

        [Route("settings/saveAuctionSettings")]
        [HttpPost]
        public IActionResult SaveAuctionSettings([FromBody] SaveAuctionSettings model)
        {
            try
            {
                _settingsService.SaveAuctionSettings(model);
            }
            catch (Exception ex)
            {
                //throw ex;
            }

            return Ok();
        }
    }
}
