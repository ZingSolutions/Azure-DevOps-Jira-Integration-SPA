# react-playground
Playground for trying out differnt things in React

## api-example

### Overview
Quick example of how you can create a compoent that gets information from a REST API on initilisation or on a reset event.

## auth-example

### Overview
This example shows how you can perform multiple authentication steps within your application to protect certian routes.

### Details
A custom hook ``useAuth`` has been written to preform the authentication steps.

First it validates props (two id fields and a token) passed in the URL via an azure function to make sure the link is valid to view the page.

Once that step is validated, a OAuth 2 public client auth code flow is used to authenticate the user with Jira.

Once validated the current users details, from Jira, are displayed.

If the user cancels to the login, or there are any errors a relavant error message is displayed along with a login button to retry the login process.

Once the access token to Jira has expired an event is fired and the compoent will show the errored state, with a token expired message, asking the user to click the login button to carry on.

The ``react-router-dom`` package is used to handle the page routing / redirecting. Typescript types where also added by adding the ``@types/react-router-dom`` package.

The ``oidc-client`` package is used to help marshal through the OAuth 2 code flow used to authenticate with Jira.

### Setup Instructions
Get the Client Id and Client Secret for your Jira account and add them to the ``local.settings.json`` file in the ``server`` directory as top level settings named: ``JiraClientId`` and ``JiraClientSecret``.

Run the ``AuthExample`` functions project from the ``server`` folder and take note of the base URL for the functions app e.g. (http://localhost:7071/api/).

From the ``client`` folder you can start the react application but you will need to sset two environment variables first:

``HTTPS = "true"``
``REACT_APP_AUTH_FUNCTION_API_BASE_URL = {url from above}``

An example of how you can do this all in one line from a powershell terminal running from the ``client`` folder:
```
($env:REACT_APP_AUTH_FUNCTION_API_BASE_URL = "http://localhost:7071/api/") -and  ($env:HTTPS = "true") -and (npm start)
```

Once the application is running you will need to update the callback setting for your registerd Jira application in the Jira developer portal. You should set this to the following path of the app: ``/auth/callback``. e.g. (https://localhost:3000/auth/callback).
