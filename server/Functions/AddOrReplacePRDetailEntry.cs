using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using AuthExample.Models;
using Microsoft.WindowsAzure.Storage.Table;

namespace AuthExample
{
    public static class AddOrReplacePRDetailEntry
    {
        [FunctionName(nameof(AddOrReplacePRDetailEntry))]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post")] AddOrReplacePRDetailRequest req,
            [Table(Constants.PRDetailTableName)] CloudTable table,
            ILogger log)
        {
            log.LogInformation("AddOrReplacePRDetailEntry HTTP trigger function processed a request.");
            if (req == null)
                return new BadRequestResult();

            var token = Utilities.GetRandomString(64);
            var op = TableOperation.InsertOrReplace(new PRDetail()
            {
                PartitionKey = req.groupId,
                RowKey = req.pullRequestId,
                HashedToken = Utilities.HashValue(token)
            });
            await table.ExecuteAsync(op);
            return new OkObjectResult(new AddOrReplacePRDetailResponse() { token = token });
        }
    }
}
