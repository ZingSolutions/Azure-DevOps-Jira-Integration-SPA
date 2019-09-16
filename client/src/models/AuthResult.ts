import { AuthResultStatus } from "./types";
import JiraApi from "../api/JiraApi";
import User from "./jira/User";

export default class AuthResult{
    public constructor(status: AuthResultStatus, statusMessage: string, user?: User, jiraV2Api?: JiraApi){
        this.status = status;
        this.statusMessage = statusMessage;
        this.user = user;
        this.jiraV2Api = jiraV2Api;
    }

    public readonly status: AuthResultStatus;
    public readonly statusMessage: string;
    public readonly user?: User;
    public readonly jiraV2Api?: JiraApi;
}