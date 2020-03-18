<!--
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
-->

[![Version](https://img.shields.io/npm/v/@adobe/aio-lib-target.svg)](https://npmjs.org/package/@adobe/aio-lib-target)
[![Downloads/week](https://img.shields.io/npm/dw/@adobe/aio-lib-target.svg)](https://npmjs.org/package/@adobe/aio-lib-target)
[![Build Status](https://travis-ci.com/adobe/aio-lib-target.svg?branch=master)](https://travis-ci.com/adobe/aio-lib-target)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![Greenkeeper badge](https://badges.greenkeeper.io/adobe/aio-lib-target.svg)](https://greenkeeper.io/)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/adobe/aio-lib-target/master.svg?style=flat-square)](https://codecov.io/gh/adobe/aio-lib-target/)

# I/O Adobe Target SDK
Javascript Core SDK wrapping [Adobe Target APIs](https://developers.adobetarget.com/api/).


### Installing

```bash
$ npm install
```

### Target API Technical Requirements

The Adobe Target 1.0 APIs need to set an `Accepts` header for them to work properly. With version `2.x` or greater of this SDK, we set the proper `Accepts` header for the calls as [documented](https://developers.adobetarget.com/api/). Previous versions of this SDK may or may not work since for some Target API calls the `Accepts` header is not enforced consistently.

### Usage
1) Initialize the SDK

```
var sdk = require('@adobe/aio-lib-target')

async function sdkTest() {
  //initialize sdk
  const targetClient = await sdk.init('<tenant>', 'x-api-key', '<valid auth token>')
}
```
Init method returns an Instance of Class [<code>TargetCoreAPI</code>](#TargetCoreAPI)

2) Call methods using initialized sdk

```
var sdk = require('@adobe/aio-lib-target')

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

### Debug Logs

LOG_LEVEL=debug  <your_call_here>

### Contributing

Contributions are welcome! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
