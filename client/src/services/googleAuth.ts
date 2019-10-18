import { GoogleAuthSettings, GoogleSignInOptions, GoogleUser } from '../interfaces';

class GoogleAuth {

    // need to find types for instance of gapi.auth2
    private _auth2Client: any = null;
    private _clientId: string;
    private _sigInOptions: GoogleSignInOptions;

    constructor(settings: GoogleAuthSettings) {
        this._clientId = settings.clientId;
        this._sigInOptions = settings.signInOptions;
    }

    private get authClient() {
        // @types/gapi @types/gapi.auth2

        if (this._auth2Client === null) {
            this._auth2Client = new Promise((resolve, reject) => {
                gapi.load('auth2', () => {
                    gapi.auth2.init({
                        client_id: this._clientId
                    }).then(() => {
                        resolve(gapi.auth2.getAuthInstance());
                    }, (error) => {
                        reject(error)
                    });
                });
            });
        }
        return this._auth2Client;
    }

    async signIn() {
        const client = await this.authClient;

        if (!client.isSignedIn.get()) {
           const user = await client.signIn(this._sigInOptions);
           return <GoogleUser>({
               email: user.w3.U3,
               firstName: user.w3.ofa,
               lastName: user.w3.wea
           });
        }
    }

    async signOut() {
        const client = await this.authClient;
        client.signOut();
    }

}
// will be inside .env later
const settings: GoogleAuthSettings = {
    clientId: '509811286076-qpgen8fljbstbdf6so9njn7d195v10b8.apps.googleusercontent.com',
    signInOptions: {
        prompt: 'select_account',
        scope: 'profile email',
        // ux_mode: 'redirect',
        // redirect_uri: 'http://localhost:3000/'
    }
};

export const Google = new GoogleAuth(settings);
