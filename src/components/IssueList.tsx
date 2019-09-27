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

export interface IssueListProps {
    issues: Issue[],
    api: JiraApi,
    onChange:any,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      margin: '0 auto',
      backgroundColor: theme.palette.background.paper,
      minWidth: '-webkit-fill-available',
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

    function selectRepo(){
        props.onChange(1,selectIssues);
    }

    return(
        <div>
            <div className={classes.root}>
                <List style={{maxWidth: 'fit-content', margin: '0 auto'}}> 
                    {stories.map((e,i) => {
                        return(<div key={i} onClick={() => {setIssueInfo(e)}}><IssueComponent key={i} issue={e} epics={epics} onChange={handleCheck}/></div>)
                    })}   
                </List>     
                <div>
                    {issueInfo === undefined ? '' :<Info issue={issueInfo} api={props.api}/>}
                </div>
                <Typography style={{marginTop: '1%'}} variant="h5" component="h4">Selected Issues</Typography>
                <div>
                    <SelectedIssues issues={selectIssues} />
                </div>
                <Button style={{marginTop: '1%'}}variant="contained" color="primary" onClick={selectRepo}>NEXT</Button>
            </div>
        </div>
    )
};

export default IssueList;