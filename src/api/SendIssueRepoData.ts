
async function sendIssueRepoMapping(json:Object) {
    console.log(json);
    const request = fetch(`${process.env["REACT_APP_AUTH_FUNCTION_API_BASE_URL"]}api/IssueAndRepoMapping`, {
        method: 'POST',
        headers: {
            'Accept': 'Application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    })

    const response = await request;
    if(response.ok){
        alert("Success!");
    }
    else{
        alert("Error occurred!");
    }
}

export default sendIssueRepoMapping;