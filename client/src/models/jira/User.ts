import { string } from "prop-types"

export default interface User {
    key: string;
    accountId: string;
    name: string;
    emailAddress: string;
    avatarUrls: AvatarUrls;
    displayName: string;
}

export interface AvatarUrls{
    "48x48": string;
    "32x32": string;
    "24x24": string;
    "16x16": string;
}