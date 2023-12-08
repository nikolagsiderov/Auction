using AutoMapper;

namespace Infrastructure.Models.Item
{
    public class CreateItem
    {
        public string Title { get; set; }

        public int CategoryID { get; set; }

        public string? Description { get; set; }

        public decimal StartingPrice { get; set; }

        public decimal? BuyNowPrice { get; set; }

        public decimal? ReservedPrice { get; set; }

        public DateTime EndDate { get; set; }

        public bool SnipingProtection { get; set; }

        public Data.DTOs.Item ToDTO()
        {
            var config = new MapperConfiguration(cfg =>
                    cfg.CreateMap<CreateItem, Data.DTOs.Item>()
                );

            var mapper = new Mapper(config);
            var dto = mapper.Map<Data.DTOs.Item>(this);

            return dto;
        }
    }
}
