import React from 'react';
import {Issue} from '../models/jira/JiraObject';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";

export interface IssueListProps {
    issues: Issue[];
    allIssues: Issue[];
    onChange: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '1em 0 0 2em',
      backgroundColor: theme.palette.background.paper,
      marginRight: '19%'
    }
  }),
);

const IssueList: React.FC<IssueListProps> = (props: IssueListProps) =>{

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

        if(newIssues.length !== props.issues.length){
            props.onChange(newIssues);
        }
        else{
            props.onChange(props.allIssues);
        }              
    }

    const distinctUsers = Array.from(new Set(users.map(e => e.fields.assignee.avatarUrls["16x16"])))
        .map(url => {
            return {
                link: url,
        };
    });

    const classes = useStyles();
    return(
        <div className={classes.root}>
            {distinctUsers.map((e,i) => {
                return(<Avatar style={{margin: '0 auto'}} key={i} onClick={UpdateIssues} src={e.link} />)
            })}
        </div>
    );
};

export default IssueList;