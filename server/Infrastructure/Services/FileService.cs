using Data;
using Data.DTOs;
using Infrastructure.Services.Declarations;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class FileService : IFileService
    {
        private readonly DataContext _dataContext;

        public FileService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public byte[] GetImage(string imageName)
        {
            var file = Path.Combine(Configuration.StorageDirectory, imageName);

            if (File.Exists(file))
                return File.ReadAllBytes(file);
            else
                return new byte[0]; // var file = Path.Combine(Configuration.StorageDirectory, errorImage); File.ReadAllBytes(file);
        }

        public Image SaveToDatabase(byte[] fileBytes, int hostID, User user)
        {
            var now = DateTime.Now;

            var image = new Image()
            {
                CreatedByID = user.ID,
                CreatedDate = now,
                HostID = hostID
            };

            _dataContext.Images.Add(image);
            _dataContext.SaveChanges();

            image.Name = $"{image.ID}_{hostID}.png";

            _dataContext.Images.Attach(image);
            _dataContext.Entry(image).State = EntityState.Modified;
            _dataContext.SaveChanges();

            return image;
        }

        public void SaveToStorage(byte[] fileBytes, Image image)
        {
            var storageExists = Directory.Exists(Configuration.StorageDirectory);

            if (storageExists.Equals(false))
                Directory.CreateDirectory(Configuration.StorageDirectory);

            var savingPath = Path.Combine(Configuration.StorageDirectory, image.Name!);
            File.WriteAllBytes(savingPath, fileBytes);
        }
    }
}
