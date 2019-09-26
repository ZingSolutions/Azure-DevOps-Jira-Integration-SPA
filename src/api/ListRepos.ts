import React from 'react';
import AuthService from '../models/AuthService'



async function getRepos(){
    const request = fetch(AuthService.GetStoreItem('URL') + '_apis/git/repositories?api-version=4.1', {
        headers: {
            "Authorization": 'Basic ' + btoa(":fx5lvzl5bsngssiij7awl2kcej2bojr3gwjpguek2s34eifkgxka"),
        }
    });
    const response = await request;
    return response.json();
}

export default getRepos;