import React from 'react';

function ParsingInfo({ match } : {match:any}){
    console.log(match)
    return(
        <div>
            <p>PREFIX: {match.params.prefix}</p>
            <p>PRID: {match.params.prid}</p>
            <p>TOKEN: {match.params.token}</p>
        </div>
    );
}

export default ParsingInfo;