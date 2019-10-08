import AuthService from '../models/AuthService'



async function getRepos(){
    console.log(AuthService.GetStoreItem('URL'));
    const request = fetch(AuthService.GetStoreItem('URL') + '_apis/git/repositories?api-version=4.1', {
        headers: {
            "Authorization": 'Basic ' + btoa(":bpkn534vlqmrufqxgvfurhtj5atgn4i2bcpd4zlo7jthlevcjkpa"),
        }
    });
    const response = await request;
    return response.json();
}

export default getRepos;