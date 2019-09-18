import React, {useState, useEffect} from 'react';
import {Issue} from '../models/jira/User';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
export interface IssueListProps {
    issues: Issue[];
    onChange: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 'fit-content',
      margin: '1em',
      backgroundColor: theme.palette.background.paper,
    }
  }),
);

const  IssueList: React.FC<IssueListProps> = (props: IssueListProps) =>{
    const users = props.issues.filter(item => {
        if(item.fields.assignee !== null){
            return item.fields.assignee.avatarUrls["16x16"];
        }
        else{
            return '';
        }
    });

    function UpdateIssues(e:any){
        let newIssues = props.issues.filter(item => {
            if(item.fields.assignee !== null){
                if(item.fields.assignee.avatarUrls["16x16"] === e.target.src){
                    return item;
                }
            }
        })
        props.onChange(newIssues);
    }

    const classes = useStyles();
    return(
        <div className={classes.root}>
            {users.map((e,i) => {
                return(<Avatar key={i} onClick={UpdateIssues} src={e.fields.assignee.avatarUrls["16x16"] } />)
            })}
        </div>
    );
};

export default IssueList;