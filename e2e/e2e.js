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
  var res = await sdkClient.getActivities()
  expect(res.total).toBe(10)
})

test('test getABActivityById', async () => {
  var res = await sdkClient.getABActivityById(204051)
  expect(res.id).toBe(204051)

})

test('test getXTActivityById', async () => {
  var res = await sdkClient.getXTActivityById(197961)
  expect(res.id).toBe(197961)

})

test('test getABActivitChangeLog', async () => {
  var res = await sdkClient.getActivityChangeLog(204051)
  expect(res.total).toBe(19)
  expect(res.activityChangelogs.length).toBe(19)
})

test('test getOffers', async () => {
  var res = await sdkClient.getOffers()
  expect(res.total).toBe(4)
})

test('test getOfferById', async () => {
  var res = await sdkClient.getOfferById(453100)
  expect(res.id).toBe(453100)
})

test('test getAudiences', async () => {
  var res = await sdkClient.getAudiences()
  expect(res.total).toBe(25)
})

test('test getAudienceById', async () => {
  var res = await sdkClient.getAudienceById(3307106)
  expect(res.id).toBe(3307106)
})

test('test getProperties', async () => {
  var res = await sdkClient.getProperties()
  expect(res.total).toBe(1)
})

test('test getPropertyById', async () => {
  var res = await sdkClient.getPropertyById(1251)
  expect(res.id).toBe(1251)
})

test('test getMBoxes', async () => {
  var res = await sdkClient.getMBoxes()
  expect(res.total).toBe(0)
})
test('test getMBoxProfileAttributes', async () => {
  var res = await sdkClient.getMBoxProfileAttributes()
  expect(res.mboxProfileAttributes.length).toBe(20)
})
test('test getEnvironments', async () => {
  var res = await sdkClient.getEnvironments()
  expect(res.total).toBe(3)
})
