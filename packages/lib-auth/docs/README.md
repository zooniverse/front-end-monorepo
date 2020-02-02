## Classes

<dl>
<dt><a href="#Client">Client</a></dt>
<dd><p>The main Client class, which provides methods to authenticate against the API and request access tokens.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#createClient">createClient(config)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates a new Panoptes client</p>
</dd>
</dl>

<a name="Client"></a>

## Client
The main Client class, which provides methods to authenticate against the API and request access tokens.

**Kind**: global class  

* [Client](#Client)
    * [new Client(config, httpClient)](#new_Client_new)
    * [.getAccessToken()](#Client+getAccessToken) ⇒ <code>Promise</code>
    * [._getJWTFromResponse(response)](#Client+_getJWTFromResponse)
    * [.isSignedIn()](#Client+isSignedIn) ⇒ <code>boolean</code>
    * [.register(user)](#Client+register) ⇒ <code>Promise</code>
    * [.resumeSession([jwt])](#Client+resumeSession) ⇒ <code>Promise</code>
    * [.signIn(credentials)](#Client+signIn) ⇒ <code>Promise</code>
    * [.signOut()](#Client+signOut) ⇒ <code>Promise</code>

<a name="new_Client_new"></a>

### new Client(config, httpClient)
Creates a new instance of the client


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Configuration parameters for the client |
| httpClient | <code>object</code> | A configured HTTP client for making requests |

<a name="Client+getAccessToken"></a>

### client.getAccessToken() ⇒ <code>Promise</code>
Gets an access token. Returns the current access token if it's still valid, otherwise attempts to try and refresh it before returning.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: <code>Promise</code> - Resolves to the access token, or an empty string if not available.  
<a name="Client+_getJWTFromResponse"></a>

### client.\_getJWTFromResponse(response)
Extracts the JWT from a response object's `set-cookie` header.

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>Object</code> | The response object |
| response.headers | <code>Object</code> | The headers on the response object |
| response.headers.set-cookie | <code>Array</code> \| <code>string</code> | The `set-cookie` header |

<a name="Client+isSignedIn"></a>

### client.isSignedIn() ⇒ <code>boolean</code>
Check whether a user is signed in

**Kind**: instance method of [<code>Client</code>](#Client)  
<a name="Client+register"></a>

### client.register(user) ⇒ <code>Promise</code>
Registers a new user and logs them in.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: <code>Promise</code> - Resolves to a new access token.  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>Object</code> | The details of the new user account. |
| user.betaEmailCommunication | <code>boolean</code> | Whether the new user wants to opt in to beta emails. |
| user.creditedName | <code>string</code> | The new user's credited name (used in citations etc). |
| user.email | <code>string</code> | The new user's email address. |
| user.login | <code>string</code> | The new user's username. |
| user.globalEmailCommunication | <code>boolean</code> | Whether the new user wants to opt in to global emails. |
| user.password | <code>string</code> | The new user's password. |
| user.projectEmailCommunication | <code>boolean</code> | Whether the new user wants to opt in to project-related emails when registering via a specific project. |
| user.projectId | <code>string</code> | The project ID when registering via a specific project. |

<a name="Client+resumeSession"></a>

### client.resumeSession([jwt]) ⇒ <code>Promise</code>
Resumes a session for a logged-in user.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: <code>Promise</code> - Resolves to the new access token if logged in, or `null` if logged out.  

| Param | Type | Description |
| --- | --- | --- |
| [jwt] | <code>string</code> | A JWT to exchange for an access token. Allows the client to be used on the server side by extracting the JWT included in the cookies in the `req` object and passing it in here. If run on the browser without the JWT argument, it will try to retrieve it from document object. |

<a name="Client+signIn"></a>

### client.signIn(credentials) ⇒ <code>Promise</code>
Signs a user in

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: <code>Promise</code> - Resolves to the new access token.  

| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Object</code> | The credentials for the user logging in. |
| credentials.login | <code>string</code> | The user's username or email address. |
| credentials.password | <code>string</code> | The user's password. |

<a name="Client+signOut"></a>

### client.signOut() ⇒ <code>Promise</code>
Signs a user out.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: <code>Promise</code> - Resolves to `null`.  
<a name="createClient"></a>

## createClient(config) ⇒ <code>Object</code>
Creates a new Panoptes client

**Kind**: global function  
**Returns**: <code>Object</code> - Client instance.  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | the config object to validate. |
| config.clientAppID | <code>string</code> | the client app ID of the API. |
| [config.cookieName] | <code>string</code> | the name of the session cookie to use. Defaults to `_Panoptes_session`. |
| config.hostUrl | <code>string</code> | the URL of the API. |

