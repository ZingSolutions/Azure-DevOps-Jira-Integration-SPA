import React, {useState, useEffect} from 'react';
import {Issue} from '../models/jira/User';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
export interface SearchProps {
    issues: Issue[];
    allIssues: Issue[];
    onChange: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      'margin-left': '2em',
      'text-align': 'left'
    }
  }),
);

const  Search: React.FC<SearchProps> = (props: SearchProps) =>{
    const classes = useStyles();

    function handleSearch(text:any) {
        let newIssues = props.allIssues.filter(e => {
            if(e.fields.issuetype.name === "Story"){
                const x:string = (e.key + " " + e.fields.summary).toLowerCase();
                const val = text.target.value;
                const input = val.toLowerCase();
                if(x.includes(input)){
                    return e;
                }
            }
        })
        if(newIssues.length > 0){
            props.onChange(newIssues);
        }
        else{
            alert("Not Matches Found: " + text.target.value);
        }
    }

    return(
        <div className={classes.root}>
            <TextField onChange={handleSearch} label="Search"/>
        </div>
    );
};

export default Search;