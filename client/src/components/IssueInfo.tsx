import React, {useState, useEffect} from 'react';
import {Issue, AllComments} from '../models/jira/User';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Paper from "@material-ui/core/Paper";
import JiraApi from '../api/JiraApi';
export interface InfoProps {
    issue: Issue;
    api: JiraApi
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: '35%',
      float: 'left',
      padding: theme.spacing(3, 2),
    },
  }),
);

const Info: React.FC<InfoProps> = (props: InfoProps) =>{
    const classes = useStyles();
    const [comments, setComments] = useState<AllComments>();
    useEffect(() => {
        async function getComments(){
            const res = await props.api.GetMyCommentAsync(props.issue.key);
            await setComments(res);
        }
        getComments();
    }, []);
    return(
        <div>
            <Paper className={classes.root}>
                <div>
                    <div style={{paddingBottom: '1em'}}>
                        <Typography variant="h5" component="h5">{props.issue.key} {props.issue.fields.summary}</Typography>
                    </div>
                    <div style={{textAlign: 'left', paddingBottom: '1em'}}>
                        <Typography variant="h6" component="h6">Description:</Typography>
                        <Typography variant="body2" component="p">{props.issue.fields.description.content[0].content[0].text}</Typography>
                    </div>
                    <div style={{textAlign: 'left', paddingBottom: '1em'}}>
                        <Typography variant="h6" component="h6">Subtasks:</Typography>
                        {props.issue.fields.subtasks.map((task,i) => {
                            return(
                            <div>
                                <img style={{float: 'left', padding: '.5em .5em 0 0'}}src={task.fields.issuetype.iconUrl} />
                                <Typography style={{paddingTop: '.5em'}} key={i} variant="body2" component="p">{task.key} {task.fields.summary}</Typography>
                            </div>)
                        })}
                    </div>
                    {comments === undefined ? '' : comments.comments.map(e => {
                        return(
                        <div style={{textAlign: 'left', paddingBottom: '.2em'}}>
                            <Typography component="p">Author: {e.author.displayName}</Typography>
                            <Typography variant="body2">{e.body}</Typography>
                        </div>)
                    })}

                </div>
            </Paper>
        </div>
    );
};

export default Info;