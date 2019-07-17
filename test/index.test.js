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
const sdk = require('../src')
const tenant = "test-tenant"
const apiKey = "test-apikey"
const token = "test-token"
var sdkClient = {}

test('sdk init test', async () => {

  sdkClient = await sdk.init(tenant, apiKey, token)


  expect(sdkClient.tenant).toBe(tenant)
  expect(sdkClient.apiKey).toBe(apiKey)
  expect(sdkClient.token).toBe(token)
 
});

test('test getActivities', async () => {

  const activities = await sdkClient.getActivities()
  expect(activities.total).toBe(2)
  expect(activities.limit).toBe(10)
  expect(activities.activities.length).toBe(2)
 
});

test('test createABActivity', async () => {

  var obj = {
    "name": "New API Activity",
    "startsAt": "2017-05-01T08:00Z",
    "endsAt": "2017-09-01T07:59:59Z",
    "state": "saved",
    "priority": 100,
    "autoAllocateTraffic": {
        "enabled": false,
        "successEvaluationCriteria": "conversion_rate"
    },
    "locations": {
        "mboxes": [
            {
                "locationLocalId": 0,
                "name": "x1-serverside-ab"
            }
        ]
    }
  }
  const activity = await sdkClient.createABActivity(obj)
  expect(activity.id).toBe(123)
 
});

test('test createXTActivity', async () => {

  var obj = {
    "name": "New XT Activity",
    "startsAt": "2017-05-01T08:00Z",
    "endsAt": "2017-09-01T07:59:59Z",
    "state": "saved",
    "priority": 100,
    "autoAllocateTraffic": {
        "enabled": false,
        "successEvaluationCriteria": "conversion_rate"
    },
    "locations": {
        "mboxes": [
            {
                "locationLocalId": 0,
                "name": "x1-serverside-ab"
            }
        ]
    }
  }
  const activity = await sdkClient.createXTActivity(obj)
  expect(activity.id).toBe(321)
 
});

test('test getABActivityById', async () => {

  const activity = await sdkClient.getABActivityById(123)
  expect(activity.id).toBe(123)
 
});

test('test getXTActivityById', async () => {

  const activity = await sdkClient.getXTActivityById(321)
  expect(activity.id).toBe(321)
 
});

test('test updateABActivity', async () => {

  var obj = {
    "name": "Updated API Activity",
    "startsAt": "2017-05-01T08:00Z",
    "endsAt": "2017-09-01T07:59:59Z",
    "state": "saved",
    "priority": 10,
    "autoAllocateTraffic": {
        "enabled": false,
        "successEvaluationCriteria": "conversion_rate"
    },
    "locations": {
        "mboxes": [
            {
                "locationLocalId": 1,
                "name": "x1-serverside-ab"
            }
        ]
    }
  }
  const activity = await sdkClient.updateABActivity(123, obj)
  expect(activity.id).toBe(123)
 
});

test('test updateXTActivity', async () => {

  var obj = {
    "name": "Updated XT Activity",
    "startsAt": "2017-05-01T08:00Z",
    "endsAt": "2017-09-01T07:59:59Z",
    "state": "saved",
    "priority": 10,
    "autoAllocateTraffic": {
        "enabled": false,
        "successEvaluationCriteria": "conversion_rate"
    },
    "locations": {
        "mboxes": [
            {
                "locationLocalId": 1,
                "name": "x1-serverside-ab"
            }
        ]
    }
  }
  const activity = await sdkClient.updateXTActivity(321, obj)
  expect(activity.id).toBe(321)
 
});

test('test setActivityName', async () => {
  const activity = await sdkClient.setActivityName(123, "new name")
  expect(activity.id).toBe(123)
  expect(activity.name).toBe("new name")
 
});

test('test setActivityState', async () => {
  const activity = await sdkClient.setActivityState(123, "activated")
  expect(activity.id).toBe(123)
  expect(activity.state).toBe("activated")
 
});

test('test setActivityPriority', async () => {
  const activity = await sdkClient.setActivityPriority(123, "5")
  expect(activity.id).toBe(123)
  expect(activity.priority).toBe("5")
 
});

test('test setActivitySchedule', async () => {
  obj = {
    "startsAt": "2017-05-01T08:00Z",
    "endsAt": "2017-09-01T07:59:59Z"
  }
  const activity = await sdkClient.setActivitySchedule(123, obj)
  expect(activity.id).toBe(123)
  expect(activity.startsAt).toBe("2017-05-01T08:00Z")
  expect(activity.endsAt).toBe("2017-09-01T07:59:59Z")
 
});

test('test deleteABActivity', async () => {

  const activity = await sdkClient.deleteABActivity(123)
  expect(activity.id).toBe(123)
 
});

test('test deleteXTActivity', async () => {

  const activity = await sdkClient.deleteXTActivity(321)
  expect(activity.id).toBe(321)
 
});

test('test getActivityChangeLog', async () => {

  const activity = await sdkClient.getActivityChangeLog(123)
  expect(activity.total).toBe(2)
  expect(activity.activityChangelogs.length).toBe(2)
 
});

test('test getOffers', async () => {

  const offers = await sdkClient.getOffers()
  expect(offers.total).toBe(2)
  expect(offers.limit).toBe(10)
  expect(offers.offers.length).toBe(2)
 
});

test('test getOfferById', async () => {

  const offer = await sdkClient.getOfferById(111)
  expect(offer.id).toBe(111)
 
});

test('test createOffer', async () => {

  var obj = {
     "name": "My new offer",
     "content": "<div>The content of the offer</div>",
         "workspace": "1234567" 
 }
  const offer = await sdkClient.createOffer(obj)
  expect(offer.id).toBe(123)
 
});

test('test updateOffer', async () => {

  var obj = {
    "name": "Your existing offer",
    "content": "<div>Updated content</div>"
 }
  const offer = await sdkClient.updateOffer(123, obj)
  expect(offer.content).toBe("<div>Updated content</div>")
 
});

test('test deleteOffer', async () => {

  const offer = await sdkClient.deleteOffer(111)
  expect(offer.id).toBe(111)
 
});

test('test getAudiences', async () => {

  const audiences = await sdkClient.getAudiences()
  expect(audiences.total).toBe(2)
  expect(audiences.limit).toBe(10)
  expect(audiences.audiences.length).toBe(2)
 
});

test('test getAudienceById', async () => {

  const audience = await sdkClient.getAudienceById(111)
  expect(audience.id).toBe(111)
 
});

test('test createAudience', async () => {

  var obj = {
    "name": "Homepage visitors from California",
    "description":"Description for my audience",
    "targetRule": {
        "and": [
            {
                "page": "url",
                "equals":[
                    "http://www.myhomepage.com/"
                ]
            },
            {
                "geo": "region",
                "matches": [
                    "california"
                ]
            }
        ]
    },
    "workspace": "1234567"
}
  const audience = await sdkClient.createAudience(obj)
  expect(audience.id).toBe(123)
 
});

test('test updateAudience', async () => {

  var obj = {
    "name": "Updated Gold Members in Califo-1495136673062",
    "description":"Description for my audience"
 }
  const audience = await sdkClient.updateAudience(123, obj)
  expect(audience.name).toBe("Updated Gold Members in Califo-1495136673062")
 
});

test('test deleteAudience', async () => {

  const audience = await sdkClient.deleteAudience(111)
  expect(audience.id).toBe(111)
 
});

test('test getProperties', async () => {

  const properties = await sdkClient.getProperties()
  expect(properties.total).toBe(2)
  expect(properties.limit).toBe(10)
  expect(properties.properties.length).toBe(2)
 
});

test('test getPropertyById', async () => {

  const property = await sdkClient.getPropertyById(111)
  expect(property.id).toBe(111)
 
});

test('test getMBoxes', async () => {

  const mboxes = await sdkClient.getMBoxes()
  expect(mboxes.total).toBe(2)
  expect(mboxes.limit).toBe(5)
  expect(mboxes.mboxes.length).toBe(2)
 
});

test('test getMBoxByName', async () => {

  const mbox = await sdkClient.getMBoxByName("a1-mobile-mboxparams")
  expect(mbox.name).toBe("a1-mobile-mboxparams")
  expect(mbox.mboxParameters.length).toBe(3)
 
});

test('test getMBoxProfileAttributes', async () => {

  const mbox = await sdkClient.getMBoxProfileAttributes()
  expect(mbox.mboxProfileAttributes.length).toBe(17)
 
});

test('test getEnvironments', async () => {

  const envs = await sdkClient.getEnvironments()
  expect(envs.total).toBe(3)
  expect(envs.limit).toBe(2147483647)
  expect(envs.environments.length).toBe(3)
 
});

test('test getABActivityPerformance', async () => {

  const perf = await sdkClient.getABActivityPerformance(111)
  expect(perf.reportParameters.activityId).toBe(111)
  expect(perf.activity.metrics.length).toBe(1)
  expect(perf.activity.experiences.length).toBe(1)
 
});

test('test getXTActivityPerformance', async () => {

  const perf = await sdkClient.getXTActivityPerformance(123)
  expect(perf.reportParameters.activityId).toBe(123)
  expect(perf.activity.metrics.length).toBe(1)
  expect(perf.activity.experiences.length).toBe(1)
 
});

test('test getActivityPerformance', async () => {

  const perf = await sdkClient.getActivityPerformance(123)
  expect(perf.reportParameters.activityId).toBe(123)
  expect(perf.activity.metrics.length).toBe(1)
  expect(perf.activity.experiences.length).toBe(1)
 
});

test('test getOrdersReport', async () => {

  const orders = await sdkClient.getOrdersReport(123)
  expect(orders.reportParameters.activityId).toBe(123)
  expect(orders.activity.metrics.length).toBe(1)
  expect(orders.activity.experiences.length).toBe(1)
 
});

test('test executeBatch', async () => {
  const obj = {
  "operations": [
    {
      "operationId": 1,
      "dependsOnOperationIds~": [0],
      "method": "POST",
      "relativeUrl": "/v1/offers",
      "headers~": [
        {
          "name": "Content-Type",
          "value": "application/json"
        }
      ],
      "body~": {
        "key": "value"
      }
    }
  ]
}
  const batch = await sdkClient.executeBatch(obj)
  expect(batch.results.length).toBe(1)
 
});

