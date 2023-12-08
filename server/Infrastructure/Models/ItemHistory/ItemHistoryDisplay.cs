namespace Infrastructure.Models.ItemHistory
{
    public class ItemHistoryDisplay : Data.DTOs.ItemHistory
    {
        public ItemHistoryDisplay(int itemID, int userID, decimal bidAmount) : base(itemID, userID, bidAmount)
        {
        }

        public string? UserEmailAddress { get; set; }
    }
}
