import Axios, { AxiosInstance } from 'axios';
import Site from '../models/jira/Site';
import User from '../models/jira/User';

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
            baseURL: `${JiraApi.apiRootUrl}ex/jira/${cloudId}/rest/api/2/`,
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
    public async GetMyInfoAsync(): Promise<User>{
        return (await this.v2ApiClient.get<User>('myself')).data;
    }
}