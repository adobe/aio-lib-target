# I/O CNA Adobe Target Core SDK
Javascript Core SDK wrapping [Adobe Target APIs](https://developers.adobetarget.com/api/).


### Installing

```bash
$ npm install
```

### Usage
1) Initialize the SDK

```
var sdk = require('adobeio-cna-core-target')

async function sdkTest() {
  //initialize sdk
  const targetClient = await sdk.init('<tenant>', 'x-api-key', '<valid auth token>')
}
```
Init method returns an Instance of Class [<code>TargetCoreAPI</code>](#TargetCoreAPI)

2) Call methods using initialized sdk
Methods available under sdk are documented [here](./docs/SDK.md)

```
var sdk = require('adobeio-cna-core-target')

async function sdkTest() {
    //initialize sdk
    const targetClient = await sdk.init('<tenant>', 'x-api-key', '<valid auth token>')

    //get activities
    const activities = await targetClient.getActivities({limit:5, offset:0})
    console.log(util.inspect(activities));

    //get offers
    const offers = await targetClient.getOffers({limit:5, offset:0})
    console.log(util.inspect(offers));

     //get offer by id activity
     const offer = await targetClient.getOfferById(123)
     console.log(util.inspect(offer));
}
```
All Methods available under sdk are documented [<code>here</code>](#TargetCoreAPI)

{{>main-index~}}

{{>all-docs~}}

### Contributing

Contributions are welcome! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
