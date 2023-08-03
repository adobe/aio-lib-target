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

let sdkClient = {}
const tenant = process.env.TARGET_TENANT
const apiKey = process.env.TARGET_APIKEY
const token = process.env.TARGET_TOKEN

beforeAll(async () => {
  jest.setTimeout(240000)
})

test('sdk init test', async () => {
  sdkClient = await sdk.init(tenant, apiKey, token)

  expect(sdkClient.tenant).toBe(tenant)
  expect(sdkClient.apiKey).toBe(apiKey)
  expect(sdkClient.token).toBe(token)
})

test('getActivities and getABActivityById', async () => {
  let res = await sdkClient.getActivities()
  expect(res.status).toEqual(200)
  expect(res.body.total).toBeGreaterThan(0)

  const activities = res.body.activities
  let processedABActivity = false
  let processedXTActivity = false

  const abActivities = activities.filter((elem) => elem.type === 'ab' && !processedABActivity)
  const xtActivities = activities.filter((elem) => elem.type === 'xt' && !processedXTActivity)

  for (const element of abActivities) {
    res = await sdkClient.getABActivityById(element.id)
    expect(res.status).toEqual(200)
    processedABActivity = true
  }

  for (const element of xtActivities) {
    res = await sdkClient.getXTActivityById(element.id)
    expect(res.status).toEqual(200)
    processedXTActivity = true
  }

  expect(processedABActivity).toBeTruthy()
  expect(processedXTActivity).toBeTruthy()
})

test('getOffers and getOfferById', async () => {
  let res = await sdkClient.getOffers()
  expect(res.status).toEqual(200)
  expect(res.body.total).toBeGreaterThan(0)

  const offers = res.body.offers
  // get offer by id only works for content type offers
  const filteredOffers = offers.filter((elem) => elem.type === 'content')

  for (const element of filteredOffers) {
    res = await sdkClient.getOfferById(element.id)
    expect(res.status).toEqual(200)
  }
})

test('getAudiences and getAudienceById', async () => {
  let res = await sdkClient.getAudiences()
  expect(res.status).toEqual(200)
  expect(res.body.total).toBeGreaterThan(0)

  const audiences = res.body.audiences

  const element = audiences[0]
  // get audience by id
  res = await sdkClient.getAudienceById(element.id)
  expect(res.status).toEqual(200)
})

test('getProperties and getPropertyById', async () => {
  let res = await sdkClient.getProperties()
  expect(res.status).toEqual(200)
  expect(res.body.total).toBeGreaterThan(0)

  const properties = res.body.properties
  const element = properties[0]
  // get property by id
  res = await sdkClient.getPropertyById(element.id)
  expect(res.status).toEqual(200)
})

test('getMBoxes', async () => {
  const res = await sdkClient.getMBoxes()
  expect(res.status).toEqual(200)
})
test('getMBoxProfileAttributes', async () => {
  const res = await sdkClient.getMBoxProfileAttributes()
  expect(res.status).toEqual(200)
})
test('getEnvironments', async () => {
  const res = await sdkClient.getEnvironments()
  expect(res.status).toEqual(200)
})
