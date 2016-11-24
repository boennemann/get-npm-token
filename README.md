# get-npm-token

> username, email and password in – token out.

```js
var getToken = require('get-npm-token')

getToken('https://registry.npmjs.org/', 'boennemann', '***', console.log)
// the-token
```

```bash
npm install -g get-npm-token
get-npm-token
> ? npm registry https://registry.npmjs.org/
> ? npm username? boennemann
> ? npm password ***
> the-token
```

The CLI securely caches answers in the npm config/os keychain (if available) so a repeated call looks like this:

```bash
> ? npm registry (https://registry.npmjs.org/) # prefilled
> ? npm username? (boennemann) # prefilled
> # no more password required, use -f if you changed it
> another-token
```
