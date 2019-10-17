# Azure DevOps Jira Integration SPA
## Overview
This SPA is used to to select issues and repositories for a specific pull request.

## Setup
In order to run the application you need the following information
- REACT_APP_AUTH_FUNCTION_API_BASE_URL - Base URL for the backend functions 
- REACT_APP_JIRA_ACCOUNT_SUB_DOMAIN - Jira Account sub domain 


An example of the command in a powershell terminal is given below
```
($env:REACT_APP_AUTH_FUNCTION_API_BASE_URL = "http://localhost:7071/") -and ($env:REACT_APP_JIRA_ACCOUNT_SUB_DOMAIN = "zingsolutions") -and ($env:HTTPS = "true") -and (npm start)
```

Once the application is running you will need to update the callback setting for your registerd Jira application in the Jira developer portal. You should set this to the following path of the app: /auth/callback. e.g. (https://localhost:3000/auth/callback).
