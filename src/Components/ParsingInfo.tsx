import React, { useState, useEffect } from 'react';
import Issues from './Issues'
import NotFound from './NotFound';


function ParsingInfo({ match } : {match:any}){

    let items = {
        prefix : match.params.prefix,
        prid : match.params.prid,
        token : match.params.token
    }

    const [data, setData] = useState();

    async function fetchData() {
        const res = await fetch("http://localhost:7071/api/URLValidation", {
            method: "POST",
            body: JSON.stringify(items)
        }).then(res => {if(res.ok){
            setData(true)
        }
        else{
            setData(false)
        }
    })
    }

    useEffect(() => {
        fetchData();
    });

    return (
        <div>{data ? <Issues /> : <NotFound />}</div>
    );
}

export default ParsingInfo;