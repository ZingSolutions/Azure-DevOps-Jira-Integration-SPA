import PRDetailProps from "../models/PRDetailProps";
import { PRCheckStatus } from "../models/types";
import PRCheckStatusResult from "../models/PRCheckStatusResult";

export async function ValidatePRInfoAsync(props: PRDetailProps): Promise<[PRCheckStatus, PRCheckStatusResult|null]>{
    try{
        const res = await fetch(`${process.env.REACT_APP_AUTH_FUNCTION_API_BASE_URL}ValidatePRInfo`,
        {
            method: 'POST',
            body: JSON.stringify(props),
            headers: {
                "Content-Type": "application/json"
            }
        });
        switch(res.status){
            case 401: return ['Unauthorised', null];
            case 404: return ['NotFound', null];
            case 200: return ['Authorised', await res.json()];
            default: 
                console.warn(`unexpected response from validate PR info endpoint: ${res.status} - ${res.statusText}`);
                return ['Error', null];
        }
    }
    catch(err){
        console.error(`error calling validate PR info endpoint: ${err}`);
        return ['Error', null];
    }
}
