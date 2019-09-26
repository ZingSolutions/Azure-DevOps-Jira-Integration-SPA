import React from 'react';
import { Chip } from '@material-ui/core';

export interface SelectedProps{
    issues:string[];
}

const SelectedIssues: React.FC<SelectedProps> = (props: SelectedProps) =>{
    return (
        <div>
            {props.issues.map((e,i) =>{  
                return(<Chip key={i} style={{marginLeft: '1%'}} label={e} />)
            })}
        </div>
    );
}

export default SelectedIssues;