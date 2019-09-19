import React, { useState, useEffect } from 'react';
import User, { Issue } from '../models/jira/User';
import IssueList from './IssueList';
import JiraApi from '../api/JiraApi';
import UserFilter from './UserFilter';
import SearchBar from './SearchBar';

export interface JiraUserCardProps{
    api: JiraApi
}

const JiraUserCard: React.FC<JiraUserCardProps> = (props: JiraUserCardProps) => {

    const [issues, setIssues] = useState<Issue[]>([]);
    const [allIssues, setAllIssues] = useState<Issue[]>([]);
    const check = issues.length === 0;

    useEffect(() => {
        async function doSearch(){
            const sr = await props.api.GetMyIssueAsync();
            setIssues(sr.issues);
            setAllIssues(sr.issues);
        }
        doSearch();        
    }, []);

    function handleChange(updateVal:Issue[]) {
        if(updateVal.length > 0){
            setIssues(updateVal);
        }
        else{
            console.log(1);
            setIssues([]);
        }
    }    

    return (
    <div>
        <div>
            {check ? '' : <UserFilter issues={issues} allIssues={allIssues} onChange={handleChange}/>}
            {check ? '' : <SearchBar issues={issues} allIssues={allIssues} onChange={handleChange}/>}
            {check ? '' : <IssueList issues={issues} />}
        </div>
        <div>
            fafs
        </div>
    </div>
    );
};

export default JiraUserCard;