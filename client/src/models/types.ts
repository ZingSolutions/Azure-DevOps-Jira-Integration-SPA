export type PRCheckStatus = 'Authorised'|'Unauthorised'|'NotFound'|'Error';
export type JiraLoginStatus = 'Authorised'|'Unauthorised';
export type AuthResultStatus = 'Pending'|'Authorised'|'Unauthorised';

export function getPRCheckStatusDescription(status: PRCheckStatus)
{
    switch(status){
        case 'Authorised': return 'PR token authorised';
        case 'NotFound': return 'PR not found';
        case 'Unauthorised': return 'Invalid token for PR';
        case 'Error':
        default:
            return 'Unexpected error has occoured whilst validating PR token';
    }
}