using AutoMapper;

namespace Infrastructure.Models.Category
{
    public class CreateCategory
    {
        public string Title { get; set; }

        public string? Description { get; set; }

        public Data.DTOs.Category ToDTO()
        {
            var config = new MapperConfiguration(cfg =>
                    cfg.CreateMap<CreateCategory, Data.DTOs.Category>()
                );

            var mapper = new Mapper(config);
            var dto = mapper.Map<Data.DTOs.Category>(this);

            return dto;
        }
    }
}
