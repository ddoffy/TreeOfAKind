﻿using System;
using System.ComponentModel.DataAnnotations;

namespace TreeOfAKind.API.People
{
    public class RemovePersonRequest
    {
        [Required] public Guid TreeId { get; set; }
        [Required] public Guid PersonId { get; set; }
    }
}