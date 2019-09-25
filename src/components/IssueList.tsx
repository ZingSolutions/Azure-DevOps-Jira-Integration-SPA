import React, {useState} from 'react';
import IssueComponent from './Issue';
import List from "@material-ui/core/List";
import {Issue} from '../models/jira/JiraObject';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Info from './IssueInfo';
import SelectedIssues from './SelectedIssues';
import JiraApi from '../api/JiraApi';
import { Typography } from '@material-ui/core';
import sendIssueRepoMapping from '../api/SendIssueRepoData';
import PRDetailProps from '../models/PRDetailProps';

export interface IssueListProps {
    issues: Issue[],
    api: JiraApi,
    prefix:string,
    reqID:string
    token:string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 'fit-content',
      margin: '1em',
      backgroundColor: theme.palette.background.paper,
      textAlign: 'center',
      float: 'left',
    }
  }),
);

const  IssueList: React.FC<IssueListProps> = (props: IssueListProps) =>{
    const [selectIssues, setSelectIssues] = useState<string[]>([]);
    const [issueInfo, setIssueInfo] = useState();
    const classes = useStyles();
    
    const epics = props.issues.filter(item => {
        if(item.fields.issuetype.name === "Epic"){
            return item;
        }
    });

    const stories = props.issues.filter(item => {
        if(item.fields.issuetype.name === "Story"){
            return item;
        }
    });

    function handleCheck(issue:Issue){
        if(!selectIssues.includes(issue.key)){
            setSelectIssues(selectIssues => [...selectIssues, issue.key]);
        }
        else{
            setSelectIssues(selectIssues.filter(item => item !== issue.key));
        }
    }

    function sendData(){
        const json = {
            Prefix: props.prefix,
            RequestID: props.reqID,
            token: props.token,
            IssueID: selectIssues,
            RepoID: ["3","4"]
        }
        sendIssueRepoMapping(json);
    }

    return(
        <div>
            <div className={classes.root}>
                <List> 
                    {stories.map((e,i) => {
                        return(<div key={i} onClick={() => {setIssueInfo(e)}}><IssueComponent key={i} issue={e} epics={epics} onChange={handleCheck}/></div>)
                    })}   
                </List>     
                <Typography style={{marginTop: '5%'}} variant="h5" component="h4">Selected Issues</Typography>
                <div style={{textAlign: 'left',maxWidth:'100%', marginTop: '1%'}}>
                    <SelectedIssues issues={selectIssues} />
                </div>
                <Button style={{marginTop: '5%'}}variant="contained" color="primary" onClick={sendData}>SUBMIT</Button>
            </div>
            <div>
                {issueInfo === undefined ? '' :<Info issue={issueInfo} api={props.api}/>}
            </div>
        </div>
    )
};

export default IssueList;