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
const fetchMock = require('fetch-mock')
const mock = require('./mock')
const sdk = require('../src')
const errorSDK = require('../src/SDKErrors')
const tenant = 'test-tenant'
const apiKey = 'test-apikey'
const token = 'test-token'
var sdkClient = {}

function mockResponseWithMethod (url, method, response) {
  fetchMock.reset()
  fetchMock.mock((u, opts) => u === url && opts.method === method, response)
}

test('sdk init test', async () => {
  sdkClient = await sdk.init(tenant, apiKey, token)

  expect(sdkClient.tenant).toBe(tenant)
  expect(sdkClient.apiKey).toBe(apiKey)
  expect(sdkClient.token).toBe(token)
})

test('sdk init error, no tenant passed', async () => {
  await expect(sdk.init(null, apiKey, token)).rejects.toThrow('[TargetSDK:ERROR_SDK_INITIALIZATION] SDK initialization error(s). Missing arguments: tenant')
})

test('sdk init error, no apiKey passed', async () => {
  await expect(sdk.init(tenant, null, token)).rejects.toThrow('[TargetSDK:ERROR_SDK_INITIALIZATION] SDK initialization error(s). Missing arguments: apiKey')
})

test('sdk init error, no token passed', async () => {
  await expect(sdk.init(tenant, apiKey)).rejects.toThrow('[TargetSDK:ERROR_SDK_INITIALIZATION] SDK initialization error(s). Missing arguments: token')
})

test('test getActivities', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/activities'
  const method = 'GET'
  const api = 'getActivities'

  mockResponseWithMethod(url, method, mock.data.activities)
  // check success response
  var res = await sdkClient.getActivities()
  expect(res.body.total).toBe(2)
  expect(res.body.limit).toBe(10)
  expect(res.body.activities.length).toBe(2)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_ACTIVITIES())
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_ACTIVITIES())
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_ACTIVITIES())
})

test('test createABActivity', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/activities/ab'
  const method = 'POST'
  const api = 'createABActivity'
  var obj = {
    name: 'New API Activity',
    startsAt: '2017-05-01T08:00Z',
    endsAt: '2017-09-01T07:59:59Z',
    state: 'saved',
    priority: 100,
    autoAllocateTraffic: {
      enabled: false,
      successEvaluationCriteria: 'conversion_rate'
    },
    locations: {
      mboxes: [
        {
          locationLocalId: 0,
          name: 'x1-serverside-ab'
        }
      ]
    }
  }

  mockResponseWithMethod(url, method, mock.data.abActivity)
  // check success response
  var res = await sdkClient.createABActivity(obj)
  expect(res.body.id).toBe(123)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_CREATE_AB_ACTIVITY())
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_CREATE_AB_ACTIVITY())
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_CREATE_AB_ACTIVITY())
})

test('test createXTActivity', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/activities/xt'
  const method = 'POST'
  const api = 'createXTActivity'
  var obj = {
    name: 'New XT Activity',
    startsAt: '2017-05-01T08:00Z',
    endsAt: '2017-09-01T07:59:59Z',
    state: 'saved',
    priority: 100,
    autoAllocateTraffic: {
      enabled: false,
      successEvaluationCriteria: 'conversion_rate'
    },
    locations: {
      mboxes: [
        {
          locationLocalId: 0,
          name: 'x1-serverside-ab'
        }
      ]
    }
  }

  mockResponseWithMethod(url, method, mock.data.xtActivity)
  // check success response
  var res = await sdkClient.createXTActivity(obj)
  expect(res.body.id).toBe(321)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_CREATE_XT_ACTIVITY())
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_CREATE_XT_ACTIVITY())
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_CREATE_XT_ACTIVITY())
})

test('test getABActivityById', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/activities/ab/123'
  const method = 'GET'
  const api = 'getABActivityById'

  mockResponseWithMethod(url, method, mock.data.abActivity)
  // check success response
  var res = await sdkClient.getABActivityById(123)
  expect(res.body.id).toBe(123)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_AB_ACTIVITY_BY_ID(), [123])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_AB_ACTIVITY_BY_ID(), [123])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_AB_ACTIVITY_BY_ID(), [123])
  mockResponseWithMethod(url, method, mock.errors.Not_Found.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_AB_ACTIVITY_BY_ID(), [123])
})

test('test getXTActivityById', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/activities/xt/321'
  const method = 'GET'
  const api = 'getXTActivityById'

  mockResponseWithMethod(url, method, mock.data.xtActivity)
  // check success response
  var res = await sdkClient.getXTActivityById(321)
  expect(res.body.id).toBe(321)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_XT_ACTIVITY_BY_ID(), [321])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_XT_ACTIVITY_BY_ID(), [321])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_XT_ACTIVITY_BY_ID(), [321])
  mockResponseWithMethod(url, method, mock.errors.Not_Found.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_XT_ACTIVITY_BY_ID(), [321])
})

test('test updateABActivity', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/activities/ab/123'
  const method = 'PUT'
  const api = 'updateABActivity'

  var obj = {
    name: 'Updated API Activity',
    startsAt: '2017-05-01T08:00Z',
    endsAt: '2017-09-01T07:59:59Z',
    state: 'saved',
    priority: 10,
    autoAllocateTraffic: {
      enabled: false,
      successEvaluationCriteria: 'conversion_rate'
    },
    locations: {
      mboxes: [
        {
          locationLocalId: 1,
          name: 'x1-serverside-ab'
        }
      ]
    }
  }

  mockResponseWithMethod(url, method, mock.data.abActivityUpdated)
  // check success response
  var res = await sdkClient.updateABActivity(123, obj)
  expect(res.body.id).toBe(123)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_UPDATE_AB_ACTIVITY(), [123, obj])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_UPDATE_AB_ACTIVITY(), [123, obj])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_UPDATE_AB_ACTIVITY(), [123, obj])
})

test('test updateXTActivity', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/activities/xt/321'
  const method = 'PUT'
  const api = 'updateXTActivity'

  var obj = {
    name: 'Updated XT Activity',
    startsAt: '2017-05-01T08:00Z',
    endsAt: '2017-09-01T07:59:59Z',
    state: 'saved',
    priority: 10,
    autoAllocateTraffic: {
      enabled: false,
      successEvaluationCriteria: 'conversion_rate'
    },
    locations: {
      mboxes: [
        {
          locationLocalId: 1,
          name: 'x1-serverside-ab'
        }
      ]
    }
  }

  mockResponseWithMethod(url, method, mock.data.xtActivityUpdated)
  // check success response
  var res = await sdkClient.updateXTActivity(321, obj)
  expect(res.body.id).toBe(321)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_UPDATE_XT_ACTIVITY(), [321, obj])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_UPDATE_XT_ACTIVITY(), [321, obj])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_UPDATE_XT_ACTIVITY(), [321, obj])
})

test('test setActivityName', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/activities/123/name'
  const method = 'PUT'
  const api = 'setActivityName'

  mockResponseWithMethod(url, method, mock.data.nameActivity)
  // check success response
  var res = await sdkClient.setActivityName(123, 'new name')
  expect(res.body.id).toBe(123)
  expect(res.body.name).toBe('new name')

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_SET_ACTIVITY_NAME(), [123, 'new name'])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_SET_ACTIVITY_NAME(), [123, 'new name'])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_SET_ACTIVITY_NAME(), [123, 'new name'])
})

test('test setActivityState', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/activities/123/state'
  const method = 'PUT'
  const api = 'setActivityState'

  mockResponseWithMethod(url, method, mock.data.nameActivity)
  // check success response
  var res = await sdkClient.setActivityState(123, 'activated')
  expect(res.body.id).toBe(123)
  expect(res.body.state).toBe('activated')

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_SET_ACTIVITY_STATE(), [123, 'activated'])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_SET_ACTIVITY_STATE(), [123, 'activated'])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_SET_ACTIVITY_STATE(), [123, 'activated'])
})

test('test setActivityPriority', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/activities/123/priority'
  const method = 'PUT'
  const api = 'setActivityPriority'

  mockResponseWithMethod(url, method, mock.data.nameActivity)
  // check success response
  var res = await sdkClient.setActivityPriority(123, '5')
  expect(res.body.id).toBe(123)
  expect(res.body.priority).toBe('5')

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_SET_ACTIVITY_PRIORITY(), [123, '5'])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_SET_ACTIVITY_PRIORITY(), [123, '5'])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_SET_ACTIVITY_PRIORITY(), [123, '5'])
})

test('test setActivitySchedule', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/activities/123/schedule'
  const method = 'PUT'
  const api = 'setActivitySchedule'

  var obj = {
    startsAt: '2017-05-01T08:00Z',
    endsAt: '2017-09-01T07:59:59Z'
  }

  mockResponseWithMethod(url, method, mock.data.nameActivity)
  // check success response
  var res = await sdkClient.setActivitySchedule(123, obj)
  expect(res.body.id).toBe(123)
  expect(res.body.startsAt).toBe('2017-05-01T08:00Z')
  expect(res.body.endsAt).toBe('2017-09-01T07:59:59Z')

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_SET_ACTIVITY_SCHEDULE(), [123, obj])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_SET_ACTIVITY_SCHEDULE(), [123, obj])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_SET_ACTIVITY_SCHEDULE(), [123, obj])
})

test('test deleteABActivity', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/activities/ab/123'
  const method = 'DELETE'
  const api = 'deleteABActivity'

  mockResponseWithMethod(url, method, mock.data.abActivity)
  // check success response
  var res = await sdkClient.deleteABActivity(123)
  expect(res.body.id).toBe(123)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_DELETE_AB_ACTIVITY(), [123])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_DELETE_AB_ACTIVITY(), [123])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_DELETE_AB_ACTIVITY(), [123])
  mockResponseWithMethod(url, method, mock.errors.Not_Found.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_DELETE_AB_ACTIVITY(), [123])
})

test('test deleteXTActivity', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/activities/xt/321'
  const method = 'DELETE'
  const api = 'deleteXTActivity'

  mockResponseWithMethod(url, method, mock.data.xtActivity)
  // check success response
  var res = await sdkClient.deleteXTActivity(321)
  expect(res.body.id).toBe(321)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_DELETE_XT_ACTIVITY(), [321])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_DELETE_XT_ACTIVITY(), [321])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_DELETE_XT_ACTIVITY(), [321])
  mockResponseWithMethod(url, method, mock.errors.Not_Found.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_DELETE_XT_ACTIVITY(), [321])
})

test('test getActivityChangeLog', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/activities/123/changelog'
  const method = 'GET'
  const api = 'getActivityChangeLog'

  mockResponseWithMethod(url, method, mock.data.changeLog)
  // check success response
  var res = await sdkClient.getActivityChangeLog(123)
  expect(res.body.total).toBe(2)
  expect(res.body.activityChangelogs.length).toBe(2)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_ACTIVITY_CHANGELOG(), [123])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_ACTIVITY_CHANGELOG(), [123])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_ACTIVITY_CHANGELOG(), [123])
  mockResponseWithMethod(url, method, mock.errors.Not_Found.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_ACTIVITY_CHANGELOG(), [123])
})

test('test getOffers', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/offers'
  const method = 'GET'
  const api = 'getOffers'

  mockResponseWithMethod(url, method, mock.data.offers)
  // check success response
  var res = await sdkClient.getOffers()
  expect(res.body.total).toBe(2)
  expect(res.body.limit).toBe(10)
  expect(res.body.offers.length).toBe(2)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_OFFERS())
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_OFFERS())
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_OFFERS())
})

test('test getOfferById', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/offers/content/111'
  const method = 'GET'
  const api = 'getOfferById'

  mockResponseWithMethod(url, method, mock.data.offer)
  // check success response
  var res = await sdkClient.getOfferById(111)
  expect(res.body.id).toBe(111)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_OFFER_BY_ID(), [111])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_OFFER_BY_ID(), [111])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_OFFER_BY_ID(), [111])
  mockResponseWithMethod(url, method, mock.errors.Not_Found.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_OFFER_BY_ID(), [111])
})

test('test createOffer', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/offers/content'
  const method = 'POST'
  const api = 'createOffer'

  var obj = {
    name: 'My new offer',
    content: '<div>The content of the offer</div>',
    workspace: '1234567'
  }

  mockResponseWithMethod(url, method, mock.data.newOffer)
  // check success response
  var res = await sdkClient.createOffer(obj)
  expect(res.body.id).toBe(123)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_CREATE_OFFER(), [obj])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_CREATE_OFFER(), [obj])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_CREATE_OFFER(), [obj])
})

test('test updateOffer', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/offers/content/123'
  const method = 'PUT'
  const api = 'updateOffer'

  var obj = {
    name: 'Your existing offer',
    content: '<div>Updated content</div>'
  }

  mockResponseWithMethod(url, method, mock.data.updatedOffer)
  // check success response
  var res = await sdkClient.updateOffer(123, obj)
  expect(res.body.content).toBe('<div>Updated content</div>')

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_UPDATE_OFFER(), [123, obj])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_UPDATE_OFFER(), [123, obj])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_UPDATE_OFFER(), [123, obj])
})

test('test deleteOffer', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/offers/content/111'
  const method = 'DELETE'
  const api = 'deleteOffer'

  mockResponseWithMethod(url, method, mock.data.offer)
  // check success response
  var res = await sdkClient.deleteOffer(111)
  expect(res.body.id).toBe(111)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_DELETE_OFFER(), [111])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_DELETE_OFFER(), [111])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_DELETE_OFFER(), [111])
  mockResponseWithMethod(url, method, mock.errors.Not_Found.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_DELETE_OFFER(), [111])
})

test('test getAudiences', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/audiences'
  const method = 'GET'
  const api = 'getAudiences'

  mockResponseWithMethod(url, method, mock.data.audiences)
  // check success response
  var res = await sdkClient.getAudiences()
  expect(res.body.total).toBe(2)
  expect(res.body.limit).toBe(10)
  expect(res.body.audiences.length).toBe(2)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_AUDIENCES())
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_AUDIENCES())
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_AUDIENCES())
})

test('test createAudience', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/audiences'
  const method = 'POST'
  const api = 'createAudience'

  var obj = {
    name: 'Homepage visitors from California',
    description: 'Description for my audience',
    targetRule: {
      and: [
        {
          page: 'url',
          equals: [
            'http://www.myhomepage.com/'
          ]
        },
        {
          geo: 'region',
          matches: [
            'california'
          ]
        }
      ]
    },
    workspace: '1234567'
  }

  mockResponseWithMethod(url, method, mock.data.newOffer)
  // check success response
  var res = await sdkClient.createAudience(obj)
  expect(res.body.id).toBe(123)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_CREATE_AUDIENCE(), [obj])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_CREATE_AUDIENCE(), [obj])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_CREATE_AUDIENCE(), [obj])
})

test('test getAudienceById', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/audiences/111'
  const method = 'GET'
  const api = 'getAudienceById'

  mockResponseWithMethod(url, method, mock.data.audience)
  // check success response
  var res = await sdkClient.getAudienceById(111)
  expect(res.body.id).toBe(111)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_AUDIENCE_BY_ID(), [111])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_AUDIENCE_BY_ID(), [111])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_AUDIENCE_BY_ID(), [111])
  mockResponseWithMethod(url, method, mock.errors.Not_Found.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_AUDIENCE_BY_ID(), [111])
})

test('test updateAudience', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/audiences/123'
  const method = 'PUT'
  const api = 'updateAudience'

  var obj = {
    name: 'Updated Gold Members in Califo-1495136673062',
    description: 'Description for my audience'
  }

  mockResponseWithMethod(url, method, mock.data.updatedAudience)
  // check success response
  var res = await sdkClient.updateAudience(123, obj)
  expect(res.body.name).toBe('Updated Gold Members in Califo-1495136673062')

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_UPDATE_AUDIENCE(), [123, obj])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_UPDATE_AUDIENCE(), [123, obj])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_UPDATE_AUDIENCE(), [123, obj])
})

test('test deleteAudience', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/audiences/111'
  const method = 'DELETE'
  const api = 'deleteAudience'

  mockResponseWithMethod(url, method, mock.data.audience)
  // check success response
  var res = await sdkClient.deleteAudience(111)
  expect(res.body.id).toBe(111)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_DELETE_AUDIENCE(), [111])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_DELETE_AUDIENCE(), [111])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_DELETE_AUDIENCE(), [111])
  mockResponseWithMethod(url, method, mock.errors.Not_Found.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_DELETE_AUDIENCE(), [111])
})

test('test getProperties', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/properties'
  const method = 'GET'
  const api = 'getProperties'

  mockResponseWithMethod(url, method, mock.data.properties)
  // check success response
  var res = await sdkClient.getProperties()
  expect(res.body.total).toBe(2)
  expect(res.body.limit).toBe(10)
  expect(res.body.properties.length).toBe(2)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_PROPERTIES())
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_PROPERTIES())
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_PROPERTIES())
})

test('test getPropertyById', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/properties/111'
  const method = 'GET'
  const api = 'getPropertyById'

  mockResponseWithMethod(url, method, mock.data.property)
  // check success response
  var res = await sdkClient.getPropertyById(111)
  expect(res.body.id).toBe(111)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_PROPERTY_BY_ID(), [111])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_PROPERTY_BY_ID(), [111])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_PROPERTY_BY_ID(), [111])
  mockResponseWithMethod(url, method, mock.errors.Not_Found.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_PROPERTY_BY_ID(), [111])
})

test('test getMBoxes', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/mboxes'
  const method = 'GET'
  const api = 'getMBoxes'

  mockResponseWithMethod(url, method, mock.data.mboxes)
  // check success response
  var res = await sdkClient.getMBoxes()
  expect(res.body.total).toBe(2)
  expect(res.body.limit).toBe(5)
  expect(res.body.mboxes.length).toBe(2)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_MBOXES())
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_MBOXES())
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_MBOXES())
})

test('test getMBoxByName', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/mbox/a1-mobile-mboxparams'
  const method = 'GET'
  const api = 'getMBoxByName'

  mockResponseWithMethod(url, method, mock.data.mbox)
  // check success response
  var res = await sdkClient.getMBoxByName('a1-mobile-mboxparams')
  expect(res.body.name).toBe('a1-mobile-mboxparams')
  expect(res.body.mboxParameters.length).toBe(3)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_MBOX_BY_NAME(), ['a1-mobile-mboxparams'])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_MBOX_BY_NAME(), ['a1-mobile-mboxparams'])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_MBOX_BY_NAME(), ['a1-mobile-mboxparams'])
  mockResponseWithMethod(url, method, mock.errors.Not_Found.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_MBOX_BY_NAME(), ['a1-mobile-mboxparams'])
})

test('test getMBoxProfileAttributes', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/profileattributes/mbox'
  const method = 'GET'
  const api = 'getMBoxProfileAttributes'

  mockResponseWithMethod(url, method, mock.data.mboxParams)
  // check success response
  var res = await sdkClient.getMBoxProfileAttributes()
  expect(res.body.mboxParameters.length).toBe(3)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_MBOX_PROFILE_ATTRIBUTES())
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_MBOX_PROFILE_ATTRIBUTES())
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_MBOX_PROFILE_ATTRIBUTES())
})

test('test getEnvironments', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/environments'
  const method = 'GET'
  const api = 'getEnvironments'

  mockResponseWithMethod(url, method, mock.data.environments)
  // check success response
  var res = await sdkClient.getEnvironments()
  expect(res.body.total).toBe(3)
  expect(res.body.limit).toBe(2147483647)
  expect(res.body.environments.length).toBe(3)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_ENVIRONMENTS())
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_ENVIRONMENTS())
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_ENVIRONMENTS())
})

test('test getABActivityPerformance', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/activities/ab/111/report/performance'
  const method = 'GET'
  const api = 'getABActivityPerformance'

  mockResponseWithMethod(url, method, mock.data.abPerformance)
  // check success response
  var res = await sdkClient.getABActivityPerformance(111)
  expect(res.body.reportParameters.activityId).toBe(111)
  expect(res.body.activity.metrics.length).toBe(1)
  expect(res.body.activity.experiences.length).toBe(1)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_AB_ACTIVITY_PERFORMANCE(), [111])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_AB_ACTIVITY_PERFORMANCE(), [111])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_AB_ACTIVITY_PERFORMANCE(), [111])
})

test('test getXTActivityPerformance', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/activities/xt/123/report/performance'
  const method = 'GET'
  const api = 'getXTActivityPerformance'

  mockResponseWithMethod(url, method, mock.data.xtPerformance)
  // check success response
  var res = await sdkClient.getXTActivityPerformance(123)
  expect(res.body.reportParameters.activityId).toBe(123)
  expect(res.body.activity.metrics.length).toBe(1)
  expect(res.body.activity.experiences.length).toBe(1)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_XT_ACTIVITY_PERFORMANCE(), [123])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_XT_ACTIVITY_PERFORMANCE(), [123])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_XT_ACTIVITY_PERFORMANCE(), [123])
})

test('test getActivityPerformance', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/activities/abt/123/report/performance'
  const method = 'GET'
  const api = 'getActivityPerformance'

  mockResponseWithMethod(url, method, mock.data.performance)
  // check success response
  var res = await sdkClient.getActivityPerformance(123)
  expect(res.body.reportParameters.activityId).toBe(123)
  expect(res.body.activity.metrics.length).toBe(1)
  expect(res.body.activity.experiences.length).toBe(1)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_ACTIVITY_PERFORMANCE(), [123])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_ACTIVITY_PERFORMANCE(), [123])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_ACTIVITY_PERFORMANCE(), [123])
})

test('test getOrdersReport', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/activities/ab/123/report/orders'
  const method = 'GET'
  const api = 'getOrdersReport'

  mockResponseWithMethod(url, method, mock.data.report)
  // check success response
  var res = await sdkClient.getOrdersReport(123)
  expect(res.body.reportParameters.activityId).toBe(123)
  expect(res.body.activity.metrics.length).toBe(1)
  expect(res.body.activity.experiences.length).toBe(1)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_ORDERS_REPORT(), [123])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_ORDERS_REPORT(), [123])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_GET_ORDERS_REPORT(), [123])
})

test('test __setHeader preset api key header', async () => {
  sdkClient = await sdk.init(tenant, apiKey, token)
  const req = { headers: { 'x-api-key': 'test' } }
  sdkClient.__setHeaders(req, sdkClient, {})
  expect(req.headers['x-api-key']).toBe('test')
})

test('test __setHeader preset authorization header', async () => {
  sdkClient = await sdk.init(tenant, apiKey, token)
  const req = { headers: { Authorization: 'test' } }
  sdkClient.__setHeaders(req, sdkClient, {})
  expect(req.headers.Authorization).toBe('test')
})

test('test executeBatch', async () => {
  const url = 'https://mc.adobe.io/test-tenant/target/batch'
  const method = 'POST'
  const api = 'executeBatch'

  var obj = {
    operations: [
      {
        operationId: 1,
        'dependsOnOperationIds~': [0],
        method: 'POST',
        relativeUrl: '/v1/offers',
        'headers~': [
          {
            name: 'Content-Type',
            value: 'application/json'
          }
        ],
        'body~': {
          key: 'value'
        }
      }
    ]
  }
  mockResponseWithMethod(url, method, mock.data.batch)
  // check success response
  var res = await sdkClient.executeBatch(obj)
  expect(res.body.results.length).toBe(1)

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_EXECUTE_BATCH(), [obj])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_EXECUTE_BATCH(), [obj])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, new errorSDK.codes.ERROR_EXECUTE_BATCH(), [obj])
})

function checkErrorResponse (fn, url, method, error, args = []) {
  const client = sdkClient
  return new Promise((resolve, reject) => {
    (client[fn](args[0], args[1]))
      .then(res => {
        reject(new Error(' No error response'))
      })
      .catch(e => {
        expect(e.name).toEqual(error.name)
        expect(e.code).toEqual(error.code)
        resolve()
      })
  })
}
