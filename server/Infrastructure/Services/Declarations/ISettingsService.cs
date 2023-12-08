using Data.DTOs;
using Infrastructure.Models.Settings;

namespace Infrastructure.Services.Declarations
{
    public interface ISettingsService
    {
        AuctionSettings? GetAuctionSettings();
        void SaveAuctionSettings(SaveAuctionSettings model);
    }
}
