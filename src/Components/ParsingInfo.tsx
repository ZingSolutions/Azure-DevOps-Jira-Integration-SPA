import React, { useState, useEffect } from 'react';
import Issues from './Issues'
import NotFound from './NotFound';
import fetchData from '../api/azureApi'


function ParsingInfo({ match } : {match:any}){

    let items = {
        prefix : match.params.prefix,
        prid : match.params.prid,
        token : match.params.token
    }

    const [data, setData] = useState();

    useEffect(() => {
        fetchData(items).then(res => setData(res))
    },[]);

    return (
        <div>{data ? <Issues /> : <NotFound />}</div>
    );
}

export default ParsingInfo;