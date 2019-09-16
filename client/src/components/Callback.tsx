import React, {useState, useEffect} from 'react';
import AuthService from '../models/AuthService';
import { Redirect } from 'react-router';

const Callback: React.FC = () => {
    const [isError, setIsError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('processing login response, please wait ...');
    const [redirectTo, setRedirectTo] = useState<string|null>(null);

    useEffect(() => {
        const clientId = AuthService.GetStoreItem('CLIENT_ID') || '';
        const clientSecret = AuthService.GetStoreItem('CLIENT_SECRET') || '';
        const service = new AuthService(clientId, clientSecret, null);
        
        async function processResponse(){
            try{
                const page = await service.ProcessCallbackPageAsync();
                setMessage('login success, redirecting you ...');
                setRedirectTo(page);
            }
            catch(err){
                setMessage(`Login Error: ${err && err.message ? err.message : err}`);
                setIsError(true);
            }
        }
        processResponse();
    }, []);
    return (
        <>
        <p className={isError ? 'error' : 'info'}>{message}</p>
        {redirectTo ? <Redirect to={redirectTo} push={false} /> : ''}
        </>
    );
};

export default Callback;