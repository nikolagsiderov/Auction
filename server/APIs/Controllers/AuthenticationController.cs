using Infrastructure.Models.Authentication;
using Infrastructure.Services.Declarations;
using Microsoft.AspNetCore.Mvc;

namespace APIs.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("signup")]
        public IActionResult SignUp(SignUpUser user)
        {
            var response = _authenticationService.SignUp(user);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        // Login
        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _authenticationService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [HttpPost("renew")]
        public IActionResult Renew([FromBody] RefreshTokenRequest request)
        {
            var response = _authenticationService.Renew(request.Value);

            if (response == null)
                return BadRequest(new { message = "Authentication failed." });

            return Ok(response);
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Return empty string
            // and set to auth_jwt_refresh_token cookie
            // on client side
            return Ok(string.Empty);
        }
    }
}
