import React, { useState,useEffect } from 'react';
import getRepos from '../api/ListRepos';
import {RList} from '../models/AzureDevOps';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

export interface RepoListProps{
    repoData: any;
}

const RepoList: React.FC<RepoListProps> = (props: RepoListProps) =>{
    const [repos, setRepos] = useState<RList>();
    const [selectedRepos, setSelectedRepos] = useState<string[]>([]);

    useEffect(() =>{
        async function getItems(){
            setRepos(await getRepos());
        }
        getItems();
    },[])
    
    const handleChangeMultiple = (event: React.ChangeEvent<{ value: unknown }>) => {
        const { options } = event.target as HTMLSelectElement;
        const value: string[] = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                if(repos !== undefined){
                    value.push(repos.value[i].id);
                }
            }
        }
        setSelectedRepos(value);
    };

    function handleData(){
        props.repoData(selectedRepos);
    }

    return(
        <div>
            <Typography style={{marginTop: '5%', marginBottom: '2%'}} variant="h5" component="h4">Please select repositories</Typography>
            <div>
                <FormControl>
                    <InputLabel shrink htmlFor="select-multiple-native">Repositories</InputLabel>
                    <Select multiple native onChange={handleChangeMultiple}>
                        {repos === undefined ? '' : repos.value.map((repo,i) => {
                            return(
                                <option key={i}>{repo.name}</option>
                            )
                        })}
                    </Select>
                </FormControl>
            </div>
            <Button style={{marginTop: '1%'}}variant="contained" color="primary" onClick={handleData}>SUBMIT</Button>
        </div>
    )
}

export default RepoList;