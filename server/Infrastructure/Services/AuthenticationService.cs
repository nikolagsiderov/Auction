using Data;
using Data.DTOs;
using Infrastructure.Models.Authentication;
using Infrastructure.Services.Declarations;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Infrastructure.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly DataContext _dataContext;

        public AuthenticationService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public User? GetUser(long id)
        {
            return _dataContext.Users.FirstOrDefault(x => x.ID == id);
        }

        public AuthenticateResponse? SignUp(SignUpUser user)
        {
            byte[] passwordHash;
            byte[] passwordSalt;

            CreatePasswordHash(user.Password, out passwordHash, out passwordSalt);

            var newUser = new User()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            _dataContext.Add(newUser);
            _dataContext.SaveChanges();

            // authentication successful so generate jwt tokens
            var accessToken = GenerateJwtAccessToken(newUser);
            var refreshToken = GenerateJwtRefreshToken(newUser);

            return new AuthenticateResponse(newUser, accessToken, refreshToken);
        }

        public AuthenticateResponse? Authenticate(AuthenticateRequest model)
        {
            var user = _dataContext.Users.FirstOrDefault(x => x.Email == model.Email);

            // return null if user not found
            if (user == null || VerifyPasswordHash(model.Password, user.PasswordHash, user.PasswordSalt).Equals(false)) return null;

            // authentication successful so generate jwt tokens
            var accessToken = GenerateJwtAccessToken(user);
            var refreshToken = GenerateJwtRefreshToken(user);

            return new AuthenticateResponse(user, accessToken, refreshToken);
        }

        public AuthenticateResponse? Renew(string refreshToken)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(Configuration.RefreshTokenSecret);
                tokenHandler.ValidateToken(refreshToken, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var refreshTokenJwt = (JwtSecurityToken)validatedToken;
                var userId = int.Parse(refreshTokenJwt.Claims.First(x => x.Type == "id").Value);

                var user = _dataContext.Users.FirstOrDefault(x => x.ID == userId)!;
                var newAccessToken = GenerateJwtAccessToken(user);
                var newRefreshToken = GenerateJwtRefreshToken(user);

                return new AuthenticateResponse(user, newAccessToken, newRefreshToken);
            }
            catch
            {
                return null;
            }
        }

        private string GenerateJwtAccessToken(User user)
        {
            // Generate JWT token that is valid for 15 minutes
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Configuration.AccessTokenSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.ID.ToString()), new Claim("email", user.Email), new Claim("fullName", $"{user.FirstName} {user.LastName}") }),
                Expires = DateTime.UtcNow.AddMinutes(15), // Token expires in 15 minutes
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string GenerateJwtRefreshToken(User user)
        {
            // Generate JWT token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Configuration.RefreshTokenSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.ID.ToString()), new Claim("email", user.Email), new Claim("fullName", $"{user.FirstName} {user.LastName}") }),
                Expires = DateTime.UtcNow.AddDays(7), // Token expires in 7 days
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
        {
            using (var hmac = new HMACSHA512())
            {
                salt = hmac.Key;
                hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] hash, byte[] salt)
        {
            using (var hmac = new HMACSHA512(salt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(hash);
            }
        }
    }
}
