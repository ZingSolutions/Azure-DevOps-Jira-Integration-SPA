import React from 'react';
import User from '../models/jira/User';

export interface JiraUserCardProps{
    user: User
}

const JiraUserCard: React.FC<JiraUserCardProps> = (props: JiraUserCardProps) => {
    return (
    <div className="user-detail">
        <p>
            <img alt={props.user.displayName} src={props.user.avatarUrls["48x48"]}/>
        </p>
        <p><b>Name:</b> {props.user.displayName}</p>
        <p><b>Email:</b> {props.user.emailAddress}</p>
    </div>
    );
};

export default JiraUserCard;