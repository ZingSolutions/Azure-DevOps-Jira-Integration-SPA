import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import Site from '../models/jira/Site';
import { Search, AllComments, Issue } from '../models/jira/JiraObject';

export default class JiraApi{
    
    private static readonly apiRootUrl: string = "https://api.atlassian.com/";

    public static async GetAvaliableSitesAsync(accessToken: string): Promise<Site[]> {
        var res = await Axios.get<Site[]>(`${this.apiRootUrl}oauth/token/accessible-resources`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json"
            }
        });
        return res.data || [];
    }

    private readonly v2ApiClient: AxiosInstance;

    public constructor(cloudId: string, accessToken: string){
        this.v2ApiClient = Axios.create({
            baseURL: `${JiraApi.apiRootUrl}ex/jira/${cloudId}/rest/api/`,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json"
            }
        });
    }
    /**
     * returns user info from Jira
     * for the autenticated user
     */

    public async GetMyIssueAsync(id: string): Promise<Search>{
        function GetRequestBody(start:number, project:string){
            const requestBody = {
                "startAt" : start,
                "fields": ["summary","issuetype","assignee","customfield_10014","customfield_10001", "customfield_10011","description","subtasks"],
                "jql" : `project = ${project}`
            }
            return requestBody;
        }
        let start = 0;
        const req = await this.v2ApiClient.post<Search>('3/search', GetRequestBody(start, id));
        const data: Promise<AxiosResponse<Search>>[] = [Promise.resolve(req)];
        start = req.data.maxResults;
        while(start < req.data.total)
        {
            const request = Object.assign({}, GetRequestBody(start,id))
            start = request.startAt;
            data.push(this.v2ApiClient.post<Search>('3/search', request));
        }
        await Promise.all(data);
        let issues: Search[] = []
        for (let i = 0, l = data.length; i < l; i++) {
            issues = issues.concat((await data[i]).data)
        }
        return issues[0];
    }
    /**
     * returns user info from Jira
     * for the autenticated user
     */
    public async GetMyCommentAsync(key:string): Promise<AllComments>{
        return (await this.v2ApiClient.get<AllComments>('2/issue/' + key + '/comment')).data;
    }
}