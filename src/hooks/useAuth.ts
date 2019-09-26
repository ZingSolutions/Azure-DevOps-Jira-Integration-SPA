import {ValidatePRInfoAsync} from '../api/FunctionApi';
import { useState, useEffect } from 'react';
import AuthService from '../models/AuthService';
import AuthResult from '../models/AuthResult';
import PRDetailProps from '../models/PRDetailProps';
import { getPRCheckStatusDescription } from '../models/types';
import JiraApi from '../api/JiraApi';



export default function useAuth(props: PRDetailProps): [AuthResult, () => void] {
    
    function generatePendingAuthResult(statusMessage: string): AuthResult{
        return new AuthResult('Pending', statusMessage);
    }

    function incrementAttemptIndex(): void{
        setAttemptIndex(attemptIndex + 1);
    }
    
    const [attemptIndex, setAttemptIndex] = useState<number>(0);
    const [authResult, setAuthResult] = useState<AuthResult>(generatePendingAuthResult(''));
   
    useEffect(() => {

        function generateErrorAuthResult(errorMessage: string): AuthResult{
            return new AuthResult('Unauthorised', errorMessage);
        }

        function onTokenExpired(): void{
            setAuthResult(generateErrorAuthResult('token expired, please authenticate again'));
        }

        async function getAvaliableSites(token: string){
            setAuthResult(generatePendingAuthResult('autenticated with jira, checking site info, please wait ...'));
            const sites = await JiraApi.GetAvaliableSitesAsync(token);
            //Note: in future more than one site may be returned,
            //but for now according to Jira doc only one will there so can auto pick it.
            if(!sites || !sites[0] || !sites[0].id){
                setAuthResult(generateErrorAuthResult('no sites found for jira token'));
                return;
            }

            const api = new JiraApi(sites[0].id, token);
            const search = await api.GetMyIssueAsync();
            setAuthResult(new AuthResult('Authorised', '', search, api));
        }
        async function validatePRInfoAsync() {
            setAuthResult(generatePendingAuthResult('validing PR token, please wait ...'))
            const [status, res] = await ValidatePRInfoAsync(props);
            if(status !== 'Authorised'){
                setAuthResult(generateErrorAuthResult(getPRCheckStatusDescription(status)));
                return;
            }
            if(!res || !res.clientId || !res.clientSecret){
                setAuthResult(generateErrorAuthResult('invalid response from check PR info'));
                return;
            }

            setAuthResult(generatePendingAuthResult('checking jira login, please wait ...'));
            AuthService.SetStoreItem('CLIENT_ID', res.clientId);
            AuthService.SetStoreItem('CLIENT_SECRET', res.clientSecret);
            console.log(res.url)
            AuthService.SetStoreItem('URL', res.url);
            const as = new AuthService(res.clientId, res.clientSecret, onTokenExpired);
            const token = await as.GetAccessTokenAsync();
            if(token){
                //have token, we are autenticated. load sites.
                getAvaliableSites(token);
            }
            else{
                //user not autenticated with jira yet, redirect to login
                setAuthResult(generatePendingAuthResult('redirecting to jira to login, please wait ...'));
                as.Login(window.location.pathname);
            }
        }

        validatePRInfoAsync();
    }, [attemptIndex, props])

    return [authResult, incrementAttemptIndex];
}