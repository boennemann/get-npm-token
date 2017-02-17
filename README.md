# get-npm-token

[![Greenkeeper badge](https://badges.greenkeeper.io/boennemann/get-npm-token.svg)](https://greenkeeper.io/)

> username, email and password in – token out.

```js
var getToken = require('get-npm-token')

getToken('https://registry.npmjs.org/', 'boennemann', 'stephan@boennemann.me', '***', console.log)
// the-token
```

```bash
npm install -g get-npm-token
get-npm-token
> ? npm registry https://registry.npmjs.org/
> ? npm username? boennemann
> ? npm email stephan@boennemann.me
> ? npm password ***
> the-token
```

The CLI securely caches answers in the npm config/os keychain (if available) so a repeated call looks like this:

```bash
> ? npm registry (https://registry.npmjs.org/) # prefilled
> ? npm username? (boennemann) # prefilled
> ? npm email (stephan@boennemann.me) # prefilled
> # no more password required, use -f if you changed it
> another-token
```
