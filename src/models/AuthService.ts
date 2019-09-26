import {UserManager} from 'oidc-client';

export type StoreItemId = 'SITE_URL' | 'CLIENT_ID' | 'CLIENT_SECRET' | 'URL';

export default class AuthService {
    
    public static SetStoreItem(id: StoreItemId, value: string){
        sessionStorage.setItem(id, value);
    }

    public static GetStoreItem(id: StoreItemId): string|null {
        return sessionStorage.getItem(id);
    }
    
    private um: UserManager;
    public constructor(clientId: string, clientSecret: string, tokenExpiredEventHandler: (() => void)|null) {
        this.um = new UserManager({
            authority: "https://auth.atlassian.com",
            client_id: clientId,
            client_secret: clientSecret,
            extraQueryParams: {
               "audience": "api.atlassian.com"
            },
            scope: "read:jira-user read:jira-work",
            redirect_uri: `https://${window.location.host}/auth/callback`,
            response_type: "code",
            prompt: "consent",
            loadUserInfo: false,
            automaticSilentRenew: false,
            revokeAccessTokenOnSignout: true
        });
        if(tokenExpiredEventHandler !== null){
            this.um.events.addAccessTokenExpired(tokenExpiredEventHandler);
        }
    }

    public Login(currentPageUrl: string): void{
        AuthService.SetStoreItem('SITE_URL', currentPageUrl);
        this.um.signinRedirect();
    }

    public Logout(): void{
        this.um.removeUser();
    }

    /*
    Processes code callback page.
    If unecessful error will be thrown.
    If successful will return url of page to redirect to.
    */
    public async ProcessCallbackPageAsync(): Promise<string> {
        const user = await this.um.signinRedirectCallback();
        if(!user || user.expired || !user.access_token){
            throw new Error("token has expired");
        }
        return AuthService.GetStoreItem('SITE_URL') || '/';
    }

    /*
    returns access token for the logged in user
    if user is logged in and access token has not expired.
    otherwise returns blank string.
    */
    public async GetAccessTokenAsync(): Promise<string> {
        const u = await this.um.getUser();
        if(u && !u.expired && u.access_token){
            return u.access_token;
        }
        return '';
    }

    public RemoveHandler(handler: () => void): void{
        this.um.events.removeAccessTokenExpired(handler);
    }
}