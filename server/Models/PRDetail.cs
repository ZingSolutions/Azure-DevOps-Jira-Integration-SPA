using Microsoft.WindowsAzure.Storage.Table;

namespace AuthExample.Models
{
    public class PRDetail : TableEntity
    {
        public PRDetail() { }
        public string HashedToken {get; set;}

        public string GroupId { get { return this.PartitionKey; } }

        public string PullRequestId { get { return this.RowKey; } }
    }
}
