# I/O CNA Adobe Target Core SDK
Javascript Core SDK wrapping [Adobe Target APIs](https://developers.adobetarget.com/api/).


### Installing

```bash
$ npm install
```

### Usage
1) Initialize the SDK

```
var sdk = require('adobeio-cna-core-target');

//initialize sdk
const targetClient = await sdk.init('<tenant>', 'x-api-key', '<valid auth token>')
```
Init method returns an Instance of Class [TargetCoreAPI](./docs/SDK)

2) Call methods using initialized sdk
Methods available under sdk are documented [here](./docs/SDK)

```
//call methods

    //get activities
    const activities = await targetClient.getActivities({limit:5, offset:0})
    console.log(util.inspect(activities));

    //get offers
    const offers = await targetClient.getOffers({limit:5, offset:0})
    console.log(util.inspect(offers));


     //get offer by id activity
     const offer = await targetClient.getOfferById(123)
     console.log(util.inspect(offer));
```

### Contributing

Contributions are welcome! Read the [Contributing Guide](./.github/CONTRIBUTING) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
