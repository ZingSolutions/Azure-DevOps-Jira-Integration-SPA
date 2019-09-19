import React, {useState, useEffect} from 'react';
import {Issue} from '../models/jira/User';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
export interface InfoProps {
    issue: Issue;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      float: 'left',
      backgroundColor: 'grey',
      padding: '.5em',
      width: '30%'
    },
    text: {
        float: 'left',
    },
    hide: {
        display: 'none'
    }
  }),
);

const Info: React.FC<InfoProps> = (props: InfoProps) =>{
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <h2>{props.issue.key}</h2>
            <h4 className={classes.text}>Description</h4>
            <p className={classes.text}>{props.issue.fields.description.content[0].content[0].text}</p>
            <h4 className={classes.text}>Subtasks</h4>
            {props.issue.fields.subtasks.map(e => {
                return(<p>{e.key} {e.fields.summary}</p>)
            })}
        </div>
    );
};

export default Info;