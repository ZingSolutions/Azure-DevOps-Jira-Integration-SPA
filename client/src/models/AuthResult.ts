import { AuthResultStatus } from "./types";
import JiraApi from "../api/JiraApi";
import { Search } from "./jira/JiraObject";

export default class AuthResult{
    public constructor(status: AuthResultStatus, statusMessage: string, search?: Search, jiraV2Api?: JiraApi){
        this.status = status;
        this.statusMessage = statusMessage;
        this.search = search;
        this.jiraV2Api = jiraV2Api;
    }

    public readonly status: AuthResultStatus;
    public readonly statusMessage: string;
    public readonly search?: Search;
    public readonly jiraV2Api?: JiraApi;
}