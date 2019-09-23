import React, {useState, useEffect} from 'react';
import IssueComponent from './Issue';
import List from "@material-ui/core/List";
import {Issue} from '../models/jira/User';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Info from './IssueInfo';
import SelectedIssues from './SelectedIssues';
import JiraApi from '../api/JiraApi';
export interface IssueListProps {
    issues: Issue[];
    api: JiraApi
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
    }, 
    hide: {
        display: 'none'
    }
  }),
);

const  IssueList: React.FC<IssueListProps> = (props: IssueListProps) =>{
    const [selectIssues, setSelectIssues] = useState([]);
    const [issueInfo, setIssueInfo] = useState();
    const classes = useStyles();
    
    const users = props.issues.filter(item => {
        if(item.fields.assignee !== null){
            return item.fields.assignee.avatarUrls["16x16"];
        }
        else{
            return '';
        }
    })
    
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

    return(
        <div>
            <div className={classes.root}>
                <List> 
                    {stories.map((e,i) => {
                        return(<div key={i} onClick={() => {setIssueInfo(e)}}><IssueComponent key={i} issue={e} epics={epics} /></div>)
                    })}   
                </List>     
                <Button variant="contained" color="primary">SUBMIT</Button>
                <h1>Selected Issues</h1>
                {selectIssues.map((e,i) =>{
                    return<IssueComponent key={i} issue={e} epics={epics} />
                })}
            </div>
            <div>
                {issueInfo === undefined ? '' :<Info issue={issueInfo} api={props.api}/>}
            </div>
        </div>
    )
};

export default IssueList;