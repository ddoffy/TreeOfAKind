using System;

namespace TreeOfAKind.Application.Configuration.Authorisation
{
    public class UnauthorizedException : Exception
    {
        public string Details { get; } 
        public UnauthorizedException(string message, string details)
            : base(message)
        {
            Details = details;
        }
    }
}