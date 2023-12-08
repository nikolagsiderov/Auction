using Data.DTOs;

namespace Infrastructure.Services.Declarations
{
    public interface IFileService
    {
        Image SaveToDatabase(byte[] fileBytes, int hostID, User user);
        void SaveToStorage(byte[] fileBytes, Image image);
        byte[] GetImage(string imageName);
    }
}
