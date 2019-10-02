/* FIELDS */

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
    description: Description;
    subtasks: Issue[];
}

export interface Description{
    content: Description2[]
}

export interface Description2{
    content: RealDescription[]
}

export interface RealDescription{
    text: string;
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

/* COMMENTS */

export interface AllComments{
    comments: Comment[];
}

export interface Comment{
    body: string;
    author: Author;
}

export interface Author{
    displayName:string;
}

export interface RepoMapping{
    issue: string;
    repos: string[]
}
