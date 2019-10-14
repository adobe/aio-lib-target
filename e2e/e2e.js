/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const sdk = require('../src/index')
const util = require("util")

var sdkClient = {}
const tenant = process.env['TARGET_TENANT']
const apiKey = process.env['TARGET_APIKEY']
const token = process.env['TARGET_TOKEN']

test('sdk init test', async () => {

  sdkClient = await sdk.init(tenant, apiKey, token)

  expect(sdkClient.tenant).toBe(tenant)
  expect(sdkClient.apiKey).toBe(apiKey)
  expect(sdkClient.token).toBe(token)

});

test('test getActivities', async () => {
  //check success response
  // var res = await sdkClient.getXTActivityById(321)
  var res = await sdkClient.getActivities()
  expect(res.total).toBe(9)
})

test('test getABActivityById', async () => {
  //check success response
  var res = await sdkClient.getABActivityById(204051)
  expect(res.id).toBe(204051)

})
