import React, {useState, useEffect} from 'react';
import IssueComponent from './Issue';
import List from "@material-ui/core/List";
import {Issue} from '../models/jira/User';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
export interface IssueListProps {
    issues: Issue[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 'fit-content',
      margin: '1em',
      backgroundColor: theme.palette.background.paper,
    },
    pane:{
        minWidth: 'max-content',
        float: 'left',
    }
  }),
);

const  IssueList: React.FC<IssueListProps> = (props: IssueListProps) =>{
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
        <div className={classes.root}>
            <List> 
                {stories.map((e,i) => {
                    return(<IssueComponent key={i} issue={e} epics={epics} />)
                })}   
            </List>     
            <Button variant="contained" color="primary">SUBMIT</Button>
        </div>
    )
};

export default IssueList;