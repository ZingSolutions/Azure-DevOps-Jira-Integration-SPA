import { string } from "prop-types"

export default interface User {
    key: string;
    accountId: string;
    name: string;
    emailAddress: string;
    avatarUrls: AvatarUrls;
    displayName: string;
}

export interface Search{
    total: number;
    issues: Issue[];
}

export interface Issue{
    key: string;    
    fields: Fields;
}

export interface Fields{
    summary: string;
    issuetype: type;
    assignee: Assignee;
    customfield_10014: string;
    customfield_10011: string;
    customfield_10001: string;
}

export interface Assignee{
    avatarUrls: AvatarUrls;
}

export interface type{
    iconUrl: string;
    name: string;
}

export interface AvatarUrls{
    "48x48": string;
    "32x32": string;
    "24x24": string;
    "16x16": string;
}