using AutoMapper;

namespace Infrastructure.Models.Settings
{
    public class SaveAuctionSettings
    {
        public decimal MinimalStepAsPercentage { get; set; }

        public Data.DTOs.AuctionSettings ToDTO()
        {
            var config = new MapperConfiguration(cfg =>
                    cfg.CreateMap<SaveAuctionSettings, Data.DTOs.AuctionSettings>()
                );

            var mapper = new Mapper(config);
            var dto = mapper.Map<Data.DTOs.AuctionSettings>(this);

            return dto;
        }
    }
}
