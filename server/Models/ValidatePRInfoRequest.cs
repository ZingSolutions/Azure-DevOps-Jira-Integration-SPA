namespace AuthExample.Models
{
    public class ValidatePRInfoRequest
    {
        public string groupId { get; set; }
        public string pullRequestId { get; set; }
        public string token { get; set; }
    }
}
