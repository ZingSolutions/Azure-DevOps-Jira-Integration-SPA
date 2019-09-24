import React, { useState, useEffect } from 'react';
import { Issue } from '../models/jira/JiraObject';
import IssueList from './IssueList';
import JiraApi from '../api/JiraApi';
import UserFilter from './UserFilter';
import SearchBar from './SearchBar';

export interface MainProps{
    api: JiraApi
}

const Main: React.FC<MainProps> = (props: MainProps) => {

    const [issues, setIssues] = useState<Issue[]>([]);
    const [allIssues, setAllIssues] = useState<Issue[]>([]);

    useEffect(() => {
        async function doSearch(){
            const response = await props.api.GetMyIssueAsync();
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

    return (
    <div>
        {issues.length === 0 ? '' : 
        <>
            <UserFilter issues={issues} allIssues={allIssues} onChange={handleChange}/>
            <SearchBar issues={issues} allIssues={allIssues} onChange={handleChange}/>
            <IssueList issues={issues} api={props.api}/>
        </>}
    </div>
    );
};

export default Main;