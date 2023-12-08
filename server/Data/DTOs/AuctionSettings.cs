using System.ComponentModel.DataAnnotations.Schema;

namespace Data.DTOs
{
    [Table(nameof(AuctionSettings))]
    public class AuctionSettings
    {
        public int ID { get; set; }

        public decimal MinimalStepAsPercentage { get; set; }
    }
}
