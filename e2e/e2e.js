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
const path = require('path')

// load .env values in the e2e folder, if any
require('dotenv').config({ path: path.join(__dirname, '.env') })

var sdkClient = {}
const tenant = process.env.TARGET_TENANT
const apiKey = process.env.TARGET_APIKEY
const token = process.env.TARGET_TOKEN

test('sdk init test', async () => {
  sdkClient = await sdk.init(tenant, apiKey, token)

  expect(sdkClient.tenant).toBe(tenant)
  expect(sdkClient.apiKey).toBe(apiKey)
  expect(sdkClient.token).toBe(token)
})

test('test getActivities and getABActivityById', async () => {
  var res = await sdkClient.getActivities()
  expect(res.status).toEqual(200)
  if (res.body.total > 0) {
    const activities = res.body.activities
    let processedABActivity = false
    let processedXTActivity = false
    // make one call get activity by id for xt and ab type
    for (let i = 0; i < activities.length; i++) {
      const element = activities[i]
      if (element.type === 'ab' && !processedABActivity) {
        res = await sdkClient.getABActivityById(element.id)
        expect(res.status).toEqual(200)
        processedABActivity = true
      } else if (element.type === 'xt' && !processedXTActivity) {
        res = await sdkClient.getXTActivityById(element.id)
        expect(res.status).toEqual(200)
        processedXTActivity = true
      }
    }
  }
})

test('test getOffers and getOfferById', async () => {
  var res = await sdkClient.getOffers()
  expect(res.status).toEqual(200)
  if (res.body.total > 0) {
    const offers = res.body.offers

    for (let i = 0; i < offers.length; i++) {
      const element = offers[i]
      // get offer by id only works for content type offers
      if (element.type === 'content') {
        res = await sdkClient.getOfferById(element.id)
        expect(res.status).toEqual(200)
        break
      }
    }
  }
})

test('test getAudiences and getAudienceById', async () => {
  var res = await sdkClient.getAudiences()
  expect(res.status).toEqual(200)
  if (res.body.total > 0) {
    const audiences = res.body.audiences

    const element = audiences[0]
    // get audience by id
    res = await sdkClient.getAudienceById(element.id)
    expect(res.status).toEqual(200)
  }
})

test('test getProperties and getPropertyById', async () => {
  var res = await sdkClient.getProperties()
  expect(res.status).toEqual(200)
  if (res.body.total > 0) {
    const properties = res.body.properties
    const element = properties[0]
    // get property by id
    res = await sdkClient.getPropertyById(element.id)
    expect(res.status).toEqual(200)
  }
})

test('test getMBoxes', async () => {
  var res = await sdkClient.getMBoxes()
  expect(res.status).toEqual(200)
})
test('test getMBoxProfileAttributes', async () => {
  var res = await sdkClient.getMBoxProfileAttributes()
  expect(res.status).toEqual(200)
})
test('test getEnvironments', async () => {
  var res = await sdkClient.getEnvironments()
  expect(res.status).toEqual(200)
})
