using Data.DTOs;
using Infrastructure.Models.Authentication;

namespace Infrastructure.Services.Declarations
{
    public interface IAuthenticationService
    {
        AuthenticateResponse? Authenticate(AuthenticateRequest model);
        AuthenticateResponse? SignUp(SignUpUser user);
        AuthenticateResponse? Renew(string refreshToken);
        User? GetUser(long id);
    }
}
