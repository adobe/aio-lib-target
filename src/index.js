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

'use strict'

const Swagger = require('swagger-client')
const fs = require('fs')
const path = require('path')

function init (tenant, apiKey, token) {
  return new Promise((resolve, reject) => {
    const clientWrapper = new TargetCoreAPI()

    clientWrapper.init(tenant, apiKey, token)
      .then(initializedSDK => {
        console.log('sdk initialized successfully')
        resolve(initializedSDK)
      })
      .catch(err => {
        console.log('sdk init error ' + err)
      })
  })
}

class TargetCoreAPI {
  async init (tenant, apiKey, token) {
    // init swagger client
    const swaggerJsonPath = path.join(__dirname, './../spec/target_api.json')
    const swaggerJson = JSON.parse(fs.readFileSync(swaggerJsonPath, 'UTF-8'))
    const swagger = new Swagger({
      spec: swaggerJson,
      requestInterceptor: req => {
        this.__setHeaders(req, this)
      },
      usePromise: true
    })
    this.sdk = (await swagger)
    this.tenant = tenant
    this.apiKey = apiKey
    this.token = token
    return this
  }

  /** List activities.
  * Get a list of activities created in your Target account, with the ability to filter and sort by attributes.
  *
  * @param options {Object} to control activity search.
  * @param options.limit Defines the number of items to return. Default value is 2147483647
  * @param options.offset Defines the first activity to return from the list of total activities. Used in conjunction with limit, you can provide pagination in your application for users to browse through a large set of activities.
  * @param options.sortBy Defines the sorting criteria on the returned items.
  */
  getActivities ({ limit = 2147483647, offset = 0, sortBy } = {}) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.activities.getActivities(arguments[0], this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target getActivities - ' + err)
          reject(err)
        })
    })
  }

  /** Create AB Activity.
  * Creates a new AB activity with the specified contents and returns the created activity.
  *
  * @param body {Object} Activity JSON.
  */
  createABActivity (body) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.abactivity.createABActivity({}, this.__createRequest(body))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target createABActivity - ' + err)
          reject(err)
        })
    })
  }

  /** Create XT Activity.
  * Creates a new XT activity with the specified contents and returns the created activity.
  *
  * @param body {Object} Activity JSON.
  */
  createXTActivity (body) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.xtactivity.createXTActivity({}, this.__createRequest(body))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target createXTActivity - ' + err)
          reject(err)
        })
    })
  }

  /** Get AB activity.
  * Fetch the current definition of an AB activity if it is found as referenced by the id.
  *
  * @param id {integer} Activity id.
  */
  getABActivityById (id) {
    var params = {}
    params.id = id
    return new Promise((resolve, reject) => {
      this.sdk.apis.abactivity.getABActivity(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target getABActivityById - ' + err)
          reject(err)
        })
    })
  }

  /** Get XT activity.
  * Fetch the current definition of XT activity if it is found as referenced by the id.
  *
  * @param id {integer} Activity id.
  */
  getXTActivityById (id) {
    var params = {}
    params.id = id
    return new Promise((resolve, reject) => {
      this.sdk.apis.xtactivity.getXTActivity(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target getXTActivityById - ' + err)
          reject(err)
        })
    })
  }

  /** Update AB activity.
  * Updates the AB activity definition with the contents as provided in the request. This can change the state and behaviour of an existing activity.
  *
  * @param id {integer} Activity id.
  */
  updateABActivity (id, body) {
    var params = {}
    params.id = id

    return new Promise((resolve, reject) => {
      this.sdk.apis.abactivity.updateABActivity(params, this.__createRequest(body))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target updateABActivity - ' + err)
          reject(err)
        })
    })
  }

  /** Update XT activity.
  * Update the current definition of XT activity if it is found as referenced by the id.
  *
  * @param id {integer} Activity id.
  */
  updateXTActivity (id, body) {
    var params = {}
    params.id = id

    return new Promise((resolve, reject) => {
      this.sdk.apis.xtactivity.updateXTActivity(params, this.__createRequest(body))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target updateXTActivity - ' + err)
          reject(err)
        })
    })
  }

  /** Update activity name.
  * Updates the name of the AB activity that is referenced by the supplied id.
  *
  * @param id {integer} Activity id.
  * @param name {string} New Activity name.
  */
  setActivityName (id, name) {
    var params = {}
    params.id = id

    var body = {
      name: name
    }
    return new Promise((resolve, reject) => {
      this.sdk.apis.activity.setName(params, this.__createRequest(body))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target setActivityName - ' + err)
          reject(err)
        })
    })
  }

  /** Update Activity state.
  * Update state of an activity if it is found as referenced by the id.
  *
  * @param id {integer} Activity id.
  * @param state {string} New Activity state.
  */
  setActivityState (id, state) {
    var params = {}
    params.id = id

    var body = {
      state: state
    }
    return new Promise((resolve, reject) => {
      this.sdk.apis.activity.setState(params, this.__createRequest(body))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target setActivityState - ' + err)
          reject(err)
        })
    })
  }

  /** Update Activity priority.
  * Update priority of an activity if it is found as referenced by the id.
  *
  * @param id {integer} Activity id.
  * @param priority {string} New Activity priority.
  */
  setActivityPriority (id, priority) {
    var params = {}
    params.id = id

    var body = {
      priority: priority
    }
    return new Promise((resolve, reject) => {
      this.sdk.apis.activity.setPriority(params, this.__createRequest(body))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target setActivityPriority - ' + err)
          reject(err)
        })
    })
  }

  /** Update Activity schedule.
  * Update schedule of an activity if it is found as referenced by the id.
  *
  * @param id {integer} Activity id.
  * @param schedule {string} New Activity schedule.
  */
  setActivitySchedule (id, schedule) {
    var params = {}
    params.id = id

    var body = {
      schedule: schedule
    }
    return new Promise((resolve, reject) => {
      this.sdk.apis.activity.setSchedule(params, this.__createRequest(body))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target setActivitySchedule - ' + err)
          reject(err)
        })
    })
  }

  /** Delete AB activity.
  * Deletes the AB activity that is referenced by the id, if it is found.
  *
  * @param id {integer} Activity id.
  */
  deleteABActivity (id) {
    var params = {}
    params.id = id
    return new Promise((resolve, reject) => {
      this.sdk.apis.abactivity.deleteABActivity(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target deleteABActivity - ' + err)
          reject(err)
        })
    })
  }

  /** Delete XT activity.
  * Delete the current definition of an XT activity if it is found as referenced by the id.
  *
  * @param id {integer} Activity id.
  */
  deleteXTActivity (id) {
    var params = {}
    params.id = id
    return new Promise((resolve, reject) => {
      this.sdk.apis.xtactivity.deleteXTActivity(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target deleteXTActivity - ' + err)
          reject(err)
        })
    })
  }

  /** Get Activity changelog.
  * Returns the changelog for a given activity id.
  *
  * @param id {integer} Activity id.
  */
  getActivityChangeLog (id) {
    var params = {}
    params.id = id
    return new Promise((resolve, reject) => {
      this.sdk.apis.activity.getChangeLog(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target getActivityChangeLog - ' + err)
          reject(err)
        })
    })
  }

  /** List Offers.
  * Retrieve the list of previously-created content offers. The parameters passed through the query string are optional and are used to indicate the sorting and filtering options.
  *
  * @param options {Object} to control offer search.
  * @param options.limit Defines the number of items to return. Default value is 2147483647
  * @param options.offset Defines the first offers to return from the list of Offers. Used in conjunction with limit, you can provide pagination in your application for users to browse through a large set of offers.
  * @param options.sortBy Defines the sorting criteria on the returned items.
  */
  getOffers ({ limit = 2147483647, offset = 0, sortBy } = {}) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.offers.getOffers(arguments[0], this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target getOffers - ' + err)
          reject(err)
        })
    })
  }

  /** Get Offer.
  * Retrieves the contents of an offer given an offer id.
  *
  * @param id {integer} Offer id.
  */
  getOfferById (id) {
    var params = {}
    params.id = id
    return new Promise((resolve, reject) => {
      this.sdk.apis.offer.getOfferById(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target getOfferById - ' + err)
          reject(err)
        })
    })
  }

  /** Create Offer.
  * Creates a new content offer as defined by the request data.
  *
  * @param body {Object} Offer JSON.
  */
  createOffer (body) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.offers.createOffer({}, this.__createRequest(body))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target createOffer - ' + err)
          reject(err)
        })
    })
  }

  /** Update Offer.
  * Updates the content offer referenced by the id.
  *
  * @param id {integer} Offer id.
  */
  updateOffer (id, body) {
    var params = {}
    params.id = id

    return new Promise((resolve, reject) => {
      this.sdk.apis.offer.updateOffer(params, this.__createRequest(body))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target updateOffer - ' + err)
          reject(err)
        })
    })
  }

  /** Delete Offer.
  * Deletes the content offer referenced by the provided id.
  *
  * @param id {integer} Offer id.
  */
  deleteOffer (id) {
    var params = {}
    params.id = id
    return new Promise((resolve, reject) => {
      this.sdk.apis.offer.deleteOffer(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target deleteOffer - ' + err)
          reject(err)
        })
    })
  }

  /** List Audiences.
  * List all available audiences with options to filter and sort by each available field.
  *
  * @param options {Object} to control audience search.
  * @param options.limit Defines the number of items to return. Default value is 2147483647
  * @param options.offset Defines the first audience to return from the list of total offers. Used in conjunction with limit, you can provide pagination in your application for users to browse through a large set of offers.
  * @param options.sortBy Defines the sorting criteria on the returned items.
  */
  getAudiences ({ limit = 2147483647, offset = 0, sortBy } = {}) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.audiences.getAudiences(arguments[0], this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target getAudiences - ' + err)
          reject(err)
        })
    })
  }

  /** Create Audience.
  * Create a new audience as specified by the contents of the request and return the newly-created audience definition.
  *
  * @param body {Object} Audience JSON.
  */
  createAudience (body) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.audiences.createAudience({}, this.__createRequest(body))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target createAudience - ' + err)
          reject(err)
        })
    })
  }

  /** Get Audience.
  * Get the audience definition specified by the provided id.
  *
  * @param id {integer} Audience id.
  */
  getAudienceById (id) {
    var params = {}
    params.id = id
    return new Promise((resolve, reject) => {
      this.sdk.apis.audiences.getAudienceById(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target getAudienceById - ' + err)
          reject(err)
        })
    })
  }

  /** Update Audience.
  * Update an audience with the new rules specified by the request data.
  *
  * @param id {integer} Audience id.
  */
  updateAudience (id, body) {
    var params = {}
    params.id = id

    return new Promise((resolve, reject) => {
      this.sdk.apis.audience.updateAudience(params, this.__createRequest(body))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target updateAudience - ' + err)
          reject(err)
        })
    })
  }

  /** Delete Audience.
  * Delete the audience referenced by the specified id.
  *
  * @param id {integer} Audience id.
  */
  deleteAudience (id) {
    var params = {}
    params.id = id
    return new Promise((resolve, reject) => {
      this.sdk.apis.audience.deleteAudience(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target deleteAudience - ' + err)
          reject(err)
        })
    })
  }

  /** List Properties.
  * Get a list of properties.
  */
  getProperties () {
    return new Promise((resolve, reject) => {
      this.sdk.apis.properties.getProperties({}, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target getProperties - ' + err)
          reject(err)
        })
    })
  }

  /** Get Property.
  * Retrieve property by property Id..
  *
  * @param id {integer} Property id.
  */
  getPropertyById (id) {
    var params = {}
    params.id = id
    return new Promise((resolve, reject) => {
      this.sdk.apis.properties.getAPropertyById(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target getPropertyById - ' + err)
          reject(err)
        })
    })
  }

  /** List MBoxes.
  * List all available mboxes for a specific client with the options to filter and sort.
  */
  getMBoxes () {
    return new Promise((resolve, reject) => {
      this.sdk.apis.mboxes.getMBoxes({}, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target getMBoxes - ' + err)
          reject(err)
        })
    })
  }

  /** Get MBox by name.
  * Get the list of mbox parameters.
  *
  * @param name {integer} MBox name.
  */
  getMBoxByName (name) {
    var params = {}
    params.mboxName = name
    return new Promise((resolve, reject) => {
      this.sdk.apis.mboxes.getMBoxByName(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target getMBoxByName - ' + err)
          reject(err)
        })
    })
  }

  /** Get Profile Attributes.
  * Retrieve the list of available profile attributes and mbox parameters of type profile.
  */
  getMBoxProfileAttributes () {
    return new Promise((resolve, reject) => {
      this.sdk.apis.mbox.getProfileAttributes({}, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target getMBoxProfileAttributes - ' + err)
          reject(err)
        })
    })
  }

  /** Get Environments.
  * List all available environments with the options to filter and sort. Use the Environments API to retrieve the environment IDs corresponding to the various host groups set for the client.
  */
  getEnvironments () {
    return new Promise((resolve, reject) => {
      this.sdk.apis.environments.getEnvironments({}, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target getEnvironments - ' + err)
          reject(err)
        })
    })
  }

  /** Get AB activity performance.
  * Retrieve property by property Id.
  *
  * @param id {integer} Activity id.
  */
  getABActivityPerformance (id) {
    var params = {}
    params.id = id
    return new Promise((resolve, reject) => {
      this.sdk.apis.reports.getABPerformance(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target getABActivityPerformance - ' + err)
          reject(err)
        })
    })
  }

  /** Get activity performance.
  * Retrieve property by property Id.
  *
  * @param id {integer} Activity id.
  */
  getXTActivityPerformance (id) {
    var params = {}
    params.id = id
    return new Promise((resolve, reject) => {
      this.sdk.apis.reports.getXTPerformance(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target getXTActivityPerformance - ' + err)
          reject(err)
        })
    })
  }

  /** Get activity performance.
  * Retrieve the performance report data for the Automated Personalization activity referenced by the provided id.
  *
  * @param id {integer} Activity id.
  */
  getActivityPerformance (id) {
    var params = {}
    params.id = id
    return new Promise((resolve, reject) => {
      this.sdk.apis.reports.getABTPerformance(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target getActivityPerformance - ' + err)
          reject(err)
        })
    })
  }

  /** Get Orders report.
  * Retrieve the orders/audit report data for an AB, XT or Autotmated Personalization Activity.
  *
  * @param id {integer} Activity id.
  */
  getOrdersReport (id) {
    var params = {}
    params.id = id
    return new Promise((resolve, reject) => {
      this.sdk.apis.reports.getAuditReport(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target getOrdersReport - ' + err)
          reject(err)
        })
    })
  }

  /** Execute Batch APIs.
  * Multiple Admin APIs can be executed as a single batch request.
  */
  executeBatch (body) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.batch.executeBatch({}, this.__createRequest(body))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling Adobe Target executeBatch - ' + err)
          reject(err)
        })
    })
  }

  __createRequest (body, query) {
    return {
      requestBody: body,
      server: 'https://mc.adobe.io/{tenant-name}/target',
      serverVariables: {
        'tenant-name': this.tenant
      }
    }
  }

  __setHeaders (req, coreAPIInstance) {
    // set headers required for Analytics API calls
    if (!req.headers['x-api-key']) {
      req.headers['x-api-key'] = coreAPIInstance.apiKey
    }
    if (!req.headers['Authorization']) {
      req.headers['Authorization'] = 'Bearer ' + coreAPIInstance.token
    }
    if (!req.headers['Content-Type']) {
      req.headers['Content-Type'] = 'application/json'
    }
  }
}

module.exports = {
  init: init
}
