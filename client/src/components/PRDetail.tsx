import React from 'react';
import PRDetailProps from '../models/PRDetailProps';
import useAuth from '../hooks/useAuth';
import JiraUserCard from './JiraUserCard';

const PRDetail: React.FC<PRDetailProps> = (props: PRDetailProps) => {
    const [authResult, resetAuth] = useAuth(props);
    
    return (
        <>
        {/* 
        <h1>PR Detail Page</h1>
        <ul style={{listStyle: 'none'}}>
            <li>groupId: {props.groupId}</li>
            <li>pullRequestId: {props.pullRequestId}</li>
            <li>token: {props.token}</li>
            <li>auth status: {authResult.status}</li>
            <li>auth status message: {authResult.statusMessage}</li>
        </ul>
        <br/>
        */}
        {authResult.status === 'Authorised' && authResult.jiraV2Api 
        ? <JiraUserCard api={authResult.jiraV2Api} /> 
        : (<>
        <p className={authResult.status === 'Unauthorised' ? 'auth-error' : 'auth-pending'}>
            {authResult.statusMessage}
        </p>
        {authResult.status === 'Unauthorised' ? <p><button onClick={resetAuth}>Login</button></p> : ''}
        </>)
        }
        </>
    );
};

export default PRDetail;