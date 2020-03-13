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
const { codes } = require('./SDKErrors')
const logger = require('@adobe/aio-lib-core-logging')('aio-lib-target', { level: process.env.LOG_LEVEL })

const ACCEPT_HEADERS = {
  V1: 'application/vnd.adobe.target.v1+json',
  V2: 'application/vnd.adobe.target.v2+json',
  V3: 'application/vnd.adobe.target.v3+json'
}

/**
  * Returns a Promise that resolves with a new TargetCoreAPI object.
  *
  * @param tenant {string} Adobe Target tenant name.
  * @param apiKey {string} Your api key
  * @param token {string} Valid auth token
  * @returns {Promise<TargetCoreAPI>}
  */
function init (tenant, apiKey, token) {
  return new Promise((resolve, reject) => {
    const clientWrapper = new TargetCoreAPI()

    clientWrapper.init(tenant, apiKey, token)
      .then(initializedSDK => {
        logger.debug('sdk initialized successfully')
        resolve(initializedSDK)
      })
      .catch(err => {
        logger.debug(`sdk init error: ${err}`)
        reject(err)
      })
  })
}

/**
* This class provides methods to call Adobe Target APIs.
* Before calling any method initialize the instance by calling init method on it
* with valid tenant, apiKey and auth token
*/
class TargetCoreAPI {
  /** Initialize sdk.
  *
  * @param tenant {string} Adobe Target tenant name.
  * @param apiKey {string} Your api key
  * @param token {string} Valid auth token
  * @returns {TargetCoreAPI}
  */
  async init (tenant, apiKey, token) {
    const initErrors = []
    if (!tenant) {
      initErrors.push('tenant')
    }
    if (!apiKey) {
      initErrors.push('apiKey')
    }
    if (!token) {
      initErrors.push('token')
    }

    if (initErrors.length) {
      const sdkDetails = { tenant, apiKey, token }
      throw new codes.ERROR_SDK_INITIALIZATION({ sdkDetails, messageValues: `${initErrors.join(', ')}` })
    } else {
      // init swagger client
      const spec = require('../spec/target_api.json')
      const swagger = new Swagger({
        spec: spec,
        usePromise: true
      })
      this.sdk = (await swagger)
      this.tenant = tenant
      this.apiKey = apiKey
      this.token = token
      return this
    }
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
    const sdkDetails = arguments[0]
    return new Promise((resolve, reject) => {
      this.sdk.apis.activities.getActivities(arguments[0], this.__createRequest({}, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_ACTIVITIES({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Create AB Activity.
  * Creates a new AB activity with the specified contents and returns the created activity.
  *
  * @param body {Object} Activity JSON.
  */
  createABActivity (body) {
    const sdkDetails = body
    return new Promise((resolve, reject) => {
      this.sdk.apis.abactivity.createABActivity({}, this.__createRequest(body, this.__getContentTypeHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_CREATE_AB_ACTIVITY({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Create XT Activity.
  * Creates a new XT activity with the specified contents and returns the created activity.
  *
  * @param body {Object} Activity JSON.
  */
  createXTActivity (body) {
    const sdkDetails = body
    return new Promise((resolve, reject) => {
      this.sdk.apis.xtactivity.createXTActivity({}, this.__createRequest(body), this.__getContentTypeHeader(ACCEPT_HEADERS.V3))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_CREATE_XT_ACTIVITY({ sdkDetails, messageValues: err }))
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
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.abactivity.getABActivity(params, this.__createRequest({}, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_AB_ACTIVITY_BY_ID({ sdkDetails, messageValues: err }))
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
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.xtactivity.getXTActivity(params, this.__createRequest({}, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_XT_ACTIVITY_BY_ID({ sdkDetails, messageValues: err }))
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
    const sdkDetails = { params, body }
    return new Promise((resolve, reject) => {
      this.sdk.apis.abactivity.updateABActivity(params, this.__createRequest(body))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_UPDATE_AB_ACTIVITY({ sdkDetails, messageValues: err }))
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
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.xtactivity.updateXTActivity(params, this.__createRequest(body, this.__getContentTypeHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_UPDATE_XT_ACTIVITY({ sdkDetails, messageValues: err }))
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
    const sdkDetails = { params, body }
    return new Promise((resolve, reject) => {
      this.sdk.apis.activity.setName(params, this.__createRequest(body, this.__getContentTypeHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_SET_ACTIVITY_NAME({ sdkDetails, messageValues: err }))
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
    const sdkDetails = { params, body }
    return new Promise((resolve, reject) => {
      this.sdk.apis.activity.setState(params, this.__createRequest(body, this.__getContentTypeHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_SET_ACTIVITY_STATE({ sdkDetails, messageValues: err }))
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
    const sdkDetails = { params, body }
    return new Promise((resolve, reject) => {
      this.sdk.apis.activity.setPriority(params, this.__createRequest(body, this.__getContentTypeHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_SET_ACTIVITY_PRIORITY({ sdkDetails, messageValues: err }))
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
    const sdkDetails = { params, body }
    return new Promise((resolve, reject) => {
      this.sdk.apis.activity.setSchedule(params, this.__createRequest(body, this.__getContentTypeHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_SET_ACTIVITY_SCHEDULE({ sdkDetails, messageValues: err }))
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
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.abactivity.deleteABActivity(params, this.__createRequest({}, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_DELETE_AB_ACTIVITY({ sdkDetails, messageValues: err }))
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
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.xtactivity.deleteXTActivity(params, this.__createRequest({}, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_DELETE_XT_ACTIVITY({ sdkDetails, messageValues: err }))
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
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.activity.getChangeLog(params, this.__createRequest({}, this.__getAcceptHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_ACTIVITY_CHANGELOG({ sdkDetails, messageValues: err }))
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
    const sdkDetails = arguments[0]
    return new Promise((resolve, reject) => {
      this.sdk.apis.offers.getOffers(arguments[0], this.__createRequest({}, this.__getAcceptHeader(ACCEPT_HEADERS.V2)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_OFFERS({ sdkDetails, messageValues: err }))
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
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.offer.getOfferById(params, this.__createRequest({}, this.__getAcceptHeader(ACCEPT_HEADERS.V2)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_OFFER_BY_ID({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Create Offer.
  * Creates a new content offer as defined by the request data.
  *
  * @param body {Object} Offer JSON.
  */
  createOffer (body) {
    const sdkDetails = body
    return new Promise((resolve, reject) => {
      this.sdk.apis.offers.createOffer({}, this.__createRequest(body, this.__getContentTypeHeader(ACCEPT_HEADERS.V2)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_CREATE_OFFER({ sdkDetails, messageValues: err }))
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
    const sdkDetails = { params, body }
    return new Promise((resolve, reject) => {
      this.sdk.apis.offer.updateOffer(params, this.__createRequest(body, this.__getContentTypeHeader(ACCEPT_HEADERS.V2)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_UPDATE_OFFER({ sdkDetails, messageValues: err }))
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
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.offer.deleteOffer(params, this.__createRequest({}, this.__getAcceptHeader(ACCEPT_HEADERS.V2)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_DELETE_OFFER({ sdkDetails, messageValues: err }))
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
    const sdkDetails = arguments[0]
    return new Promise((resolve, reject) => {
      this.sdk.apis.audiences.getAudiences(arguments[0], this.__createRequest({}, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_AUDIENCES({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Create Audience.
  * Create a new audience as specified by the contents of the request and return the newly-created audience definition.
  *
  * @param body {Object} Audience JSON.
  */
  createAudience (body) {
    const sdkDetails = body
    return new Promise((resolve, reject) => {
      this.sdk.apis.audiences.createAudience({}, this.__createRequest(body, this.__getContentTypeHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_CREATE_AUDIENCE({ sdkDetails, messageValues: err }))
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
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.audiences.getAudienceById(params, this.__createRequest({}, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_AUDIENCE_BY_ID({ sdkDetails, messageValues: err }))
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
    const sdkDetails = { params, body }
    return new Promise((resolve, reject) => {
      this.sdk.apis.audience.updateAudience(params, this.__createRequest(body, this.__getContentTypeHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_UPDATE_AUDIENCE({ sdkDetails, messageValues: err }))
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
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.audience.deleteAudience(params, this.__createRequest({}, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_DELETE_AUDIENCE({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** List Properties.
  * Get a list of properties.
  */
  getProperties () {
    const sdkDetails = {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.properties.getProperties({}, this.__createRequest({}, this.__getAcceptHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_PROPERTIES({ sdkDetails, messageValues: err }))
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
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.properties.getAPropertyById(params, this.__createRequest({}, this.__getAcceptHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_PROPERTY_BY_ID({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** List MBoxes.
  * List all available mboxes for a specific client with the options to filter and sort.
  */
  getMBoxes () {
    const sdkDetails = {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.mboxes.getMBoxes({}, this.__createRequest({}, this.__getAcceptHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_MBOXES({ sdkDetails, messageValues: err }))
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
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.mboxes.getMBoxByName(params, this.__createRequest({}, this.__getAcceptHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_MBOX_BY_NAME({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Get Profile Attributes.
  * Retrieve the list of available profile attributes and mbox parameters of type profile.
  */
  getMBoxProfileAttributes () {
    const sdkDetails = {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.mbox.getProfileAttributes({}, this.__createRequest({}, this.__getAcceptHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_MBOX_PROFILE_ATTRIBUTES({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Get Environments.
  * List all available environments with the options to filter and sort. Use the Environments API to retrieve the environment IDs corresponding to the various host groups set for the client.
  */
  getEnvironments () {
    const sdkDetails = {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.environments.getEnvironments({}, this.__createRequest({}, this.__getAcceptHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_ENVIRONMENTS({ sdkDetails, messageValues: err }))
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
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.reports.getABPerformance(params, this.__createRequest({}))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_AB_ACTIVITY_PERFORMANCE({ sdkDetails, messageValues: err }))
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
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.reports.getXTPerformance(params, this.__createRequest({}))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_XT_ACTIVITY_PERFORMANCE({ sdkDetails, messageValues: err }))
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
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.reports.getABTPerformance(params, this.__createRequest({}))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_ACTIVITY_PERFORMANCE({ sdkDetails, messageValues: err }))
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
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.reports.getAuditReport(params, this.__createRequest({}))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_ORDERS_REPORT({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Execute Batch APIs.
  * Multiple Admin APIs can be executed as a single batch request.
  */
  executeBatch (body) {
    const sdkDetails = body
    return new Promise((resolve, reject) => {
      this.sdk.apis.batch.executeBatch({}, this.__createRequest(body))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_EXECUTE_BATCH({ sdkDetails, messageValues: err }))
        })
    })
  }

  __createRequest (body, headers) {
    return {
      requestBody: body,
      server: 'https://mc.adobe.io/{tenant-name}/target',
      serverVariables: {
        'tenant-name': this.tenant
      },
      requestInterceptor: req => {
        this.__setHeaders(req, this, headers)
      }
    }
  }

  __setHeaders (req, coreAPIInstance, headers) {
    // set headers required for Target API calls
    if (!req.headers['x-api-key']) {
      req.headers['x-api-key'] = coreAPIInstance.apiKey
    }
    if (!req.headers.Authorization) {
      req.headers.Authorization = 'Bearer ' + coreAPIInstance.token
    }
    if (!req.headers['Content-Type']) {
      req.headers['Content-Type'] = 'application/json'
    }
    if ((headers !== undefined)) {
      Object.keys(headers).forEach(function (key) {
        req.headers[key] = headers[key]
      })
    }
  }

  __getAcceptHeader (value) {
    return { accept: value }
  }

  __getContentTypeHeader (value) {
    return { 'Content-Type': value }
  }
}

module.exports = {
  init: init
}
