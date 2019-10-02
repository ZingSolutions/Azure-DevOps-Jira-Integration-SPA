import React, { useState,useEffect } from 'react';
import getRepos from '../api/ListRepos';
import {RList} from '../models/AzureDevOps';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from '@material-ui/core/Button';
import { Issue,RepoMapping } from '../models/jira/JiraObject';


export interface RepoListProps{
    repoData: any;
    setState: any;
    issues: Issue[];
    issueIDs: string[];
}

const RepoList: React.FC<RepoListProps> = (props: RepoListProps) =>{
    const [repos, setRepos] = useState<RList>();
    const [selectedRepos, setSelectedRepos] = useState<RepoMapping[]>([]);

    useEffect(() =>{
        async function getItems(){
            setRepos(await getRepos());
        }
        getItems();
    },[])

    function handleData(){
        console.log(selectedRepos)
        props.repoData(selectedRepos);
    }

    function handleBack(){
        props.setState(0);
    }

    return(
        <div>
            <div>
                {props.issueIDs.map((issue,i) =>{
                    return(
                    <div>
                    <FormControl style={{marginBottom: "2em"}} key={i}>
                        <InputLabel shrink htmlFor="select-multiple-native">{issue}</InputLabel>
                        <Select multiple native onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                            selectedRepos.map((item,i) =>{
                                if(item.issue === issue){
                                    var arr = [...selectedRepos];
                                    arr.splice(i,1);
                                    setSelectedRepos(arr);
                                }
                            })
                            const { options } = event.target as HTMLSelectElement;
                            const repoArray: string[] = [];
                            for (let i = 0, l = options.length; i < l; i += 1) {
                                if (options[i].selected) {
                                    if(repos !== undefined){
                                        repoArray.push(repos.value[i].id);
                                    }
                                }
                            }
                            const json:RepoMapping = {
                                issue: issue,
                                repos: repoArray
                            }
                            setSelectedRepos(selectedRepos => [...selectedRepos,json]);
                        }}>
                        {repos === undefined ? '' : repos.value.map((repo,i) => {
                            return(
                                <option key={i}>{repo.name}</option>
                            )
                        })}
                        </Select>
                    </FormControl>
                    </div>
                    )
                })}
            </div>
            <Button style={{marginTop: '1%', marginRight: '1em'}}variant="contained" color="primary" onClick={handleBack}>BACK</Button>
            <Button style={{marginTop: '1%'}}variant="contained" color="primary" onClick={handleData}>SUBMIT</Button>
        </div>
    )
}

export default RepoList;