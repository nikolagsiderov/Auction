using Data;
using Data.DTOs;
using Infrastructure.Models.Settings;
using Infrastructure.Services.Declarations;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class SettingsService : ISettingsService
    {
        private readonly DataContext _dataContext;

        public SettingsService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public AuctionSettings? GetAuctionSettings()
        {
            return _dataContext.AuctionSettings.FirstOrDefault();
        }

        public void SaveAuctionSettings(SaveAuctionSettings model)
        {
            var auctionSettings = model.ToDTO();

            _dataContext.AuctionSettings.Attach(auctionSettings);
            _dataContext.Entry(auctionSettings).State = EntityState.Modified;
            _dataContext.SaveChanges();
        }
    }
}
