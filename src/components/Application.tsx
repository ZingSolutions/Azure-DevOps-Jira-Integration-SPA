import React, { useState, useEffect } from 'react';
import { Issue, RepoMapping } from '../models/jira/JiraObject';
import IssueList from './IssueList';
import JiraApi from '../api/JiraApi';
import UserFilter from './UserFilter';
import SearchBar from './SearchBar';
import RepoList from './RepoList';
import sendIssueRepoMapping from '../api/SendIssueRepoData';
import { Typography } from '@material-ui/core';

export interface MainProps{
    api: JiraApi,
    prefix: string,
    reqID: string
    token: string
}

const Main: React.FC<MainProps> = (props: MainProps) => {
    
    const [state, setState] = useState(0);
    const [issues, setIssues] = useState<Issue[]>([]);
    const [issueIDs, setIssueIDs] = useState<string[]>([]);
    const [allIssues, setAllIssues] = useState<Issue[]>([]);

    useEffect(() => {
        async function doSearch(){
            const response = await props.api.GetMyIssueAsync(props.prefix);
            setIssues(response.issues);
            setAllIssues(response.issues);
        }
        doSearch();        
    }, []);

    function handleChange(updateVal:Issue[]) {
        if(updateVal.length > 0){
            setIssues(updateVal);
        }
        else{
            setIssues([]);
        }
    }    

    function updateState(newState:number,ids:string[]){
        setState(newState);
        setIssueIDs(ids);
    }

    function repoInfo(mapping:RepoMapping[]){
        const json = {
            Prefix: props.prefix,
            RequestID: props.reqID,
            token: props.token,
            IssueID: issueIDs,
            RepoMapping: mapping
        }
        console.log(json);
        sendIssueRepoMapping(json);
    }

    return (
        <div>
            {                
                state === 0 ? 
                <>
                    <UserFilter issues={issues} allIssues={allIssues} onChange={handleChange}/>
                    <SearchBar issues={issues} allIssues={allIssues} onChange={handleChange}/>
                    <IssueList issues={issues} api={props.api} onChange={updateState}/>
                </>
                :
                <>
                    <Typography style={{marginTop: '5%', marginBottom: '2%'}} variant="h5" component="h4">Please select repositories</Typography>
                    <RepoList repoData={repoInfo} setState={setState} issues={issues} issueIDs={issueIDs}/>
                </>
            }   
        </div>
    );
};

export default Main;