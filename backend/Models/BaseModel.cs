using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;

namespace backend.Models
{
  public class BaseModel
  {
    [Key]
    [Required]
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime DataSync { get; set; } = DateTime.UtcNow;

  }
}
