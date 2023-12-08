using Data.DTOs;

namespace Infrastructure.Models.Authentication
{
    public class AuthenticateResponse
    {
        public AuthenticateResponse(User user, string accessToken, string refreshToken)
        {
            ID = user.ID;
            Email = user.Email;
            AccessToken = accessToken;
            RefreshToken = refreshToken;
        }

        public int ID { get; set; }

        public string Email { get; set; }

        public string AccessToken { get; set; }

        public string RefreshToken { get; set; }
    }
}
