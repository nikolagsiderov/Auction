using Data.DTOs.Declarations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.DTOs
{
    [Table(nameof(Image))]
    public class Image : IdentityObject
    {
        public string? Name { get; set; }

        public int HostID { get; set; }
    }
}
