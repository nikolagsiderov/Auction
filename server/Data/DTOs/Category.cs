using Data.DTOs.Declarations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.DTOs
{
    [Table(nameof(Category))]
    public class Category : IdentityObject
    {
        public string Title { get; set; }

        public string? Description { get; set; }
    }
}
