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

/* globals Response */

/**
 * Returns a Promise that resolves with a new TargetCoreAPI object.
 *
 * @param {string} tenant tenant Adobe Target tenant name
 * @param {string} apiKey apiKey Your api key
 * @param {string} token Valid auth token
 * @returns {Promise<TargetCoreAPI>} Promise resolving to a TargetCoreAPI instance
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
  /**
   * Initialize sdk.
   *
   * @param {string} tenant Adobe Target tenant name
   * @param {string} apiKey Your api key
   * @param {string} token Valid auth token
   * @returns {TargetCoreAPI} a TargetCoreAPI instance
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
        spec,
        usePromise: true
      })
      this.sdk = (await swagger)
      this.tenant = tenant
      this.apiKey = apiKey
      this.token = token
      return this
    }
  }

  /**
   * List activities.
   * Get a list of activities created in your Target account, with the ability to filter and sort by attributes.
   *
   * @param {object} [options] to control activity search
   * @param {number} [options.limit = 2147483647] Defines the number of items to return
   * @param {number} [options.offset = 0] Defines the first activity to return from the list of total activities. Used in conjunction with limit, you can provide pagination in your application for users to browse through a large set of activities.
   * @param {string} [options.sortBy] Defines the sorting criteria on the returned items
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  getActivities (options = { limit: 2147483647, offset: 0 }) {
    const sdkDetails = options
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.activities.getActivities(arguments[0], this.__createRequest(null, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_ACTIVITIES({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Create AB Activity.
   * Creates a new AB activity with the specified contents and returns the created activity.
   *
   * @param {object} body Activity JSON.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  createABActivity (body, options = {}) {
    const sdkDetails = body
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.abactivity.createABActivity({}, this.__createRequest(body, headers, this.__getContentTypeHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_CREATE_AB_ACTIVITY({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Create XT Activity.
   * Creates a new XT activity with the specified contents and returns the created activity.
   *
   * @param {object} body Activity JSON.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  createXTActivity (body, options = {}) {
    const sdkDetails = body
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.xtactivity.createXTActivity({}, this.__createRequest(body, headers, this.__getContentTypeHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_CREATE_XT_ACTIVITY({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Get AB activity.
   * Fetch the current definition of an AB activity if it is found as referenced by the id.
   *
   * @param {number} id Activity id.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  getABActivityById (id, options = {}) {
    const params = {}
    params.id = id
    const sdkDetails = params
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.abactivity.getABActivity(params, this.__createRequest(null, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_AB_ACTIVITY_BY_ID({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Get XT activity.
   * Fetch the current definition of XT activity if it is found as referenced by the id.
   *
   * @param {number} id Activity id.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  getXTActivityById (id, options = {}) {
    const params = {}
    params.id = id
    const sdkDetails = params
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.xtactivity.getXTActivity(params, this.__createRequest(null, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_XT_ACTIVITY_BY_ID({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Update AB activity.
   * Updates the AB activity definition with the contents as provided in the request. This can change the state and behaviour of an existing activity.
   *
   * @param {number} id Activity id.
   * @param {object} body activity JSON
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  updateABActivity (id, body, options = {}) {
    const params = {}
    params.id = id
    const sdkDetails = { params, body }
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.abactivity.updateABActivity(params, this.__createRequest(body, headers, this.__getContentTypeHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_UPDATE_AB_ACTIVITY({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Update XT activity.
   * Update the current definition of XT activity if it is found as referenced by the id.
   *
   * @param {number} id Activity id.
   * @param {object} body activity JSON
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  updateXTActivity (id, body, options = {}) {
    const params = {}
    params.id = id
    const sdkDetails = params
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.xtactivity.updateXTActivity(params, this.__createRequest(body, headers, this.__getContentTypeHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_UPDATE_XT_ACTIVITY({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Update activity name.
   * Updates the name of the AB activity that is referenced by the supplied id.
   *
   * @param {number} id Activity id.
   * @param {string} name New Activity name.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  setActivityName (id, name, options = {}) {
    const params = {}
    params.id = id
    const body = {
      name
    }
    const sdkDetails = { params, body }
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.activity.setName(params, this.__createRequest(body, headers, this.__getContentTypeHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_SET_ACTIVITY_NAME({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Update Activity state.
   * Update state of an activity if it is found as referenced by the id.
   *
   * @param {number} id Activity id.
   * @param {string} state New Activity state.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  setActivityState (id, state, options = {}) {
    const params = {}
    params.id = id

    const body = {
      state
    }
    const sdkDetails = { params, body }
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.activity.setState(params, this.__createRequest(body, headers, this.__getContentTypeHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_SET_ACTIVITY_STATE({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Update Activity priority.
   * Update priority of an activity if it is found as referenced by the id.
   *
   * @param {number} id Activity id.
   * @param {string} priority New Activity priority.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  setActivityPriority (id, priority, options = {}) {
    const params = {}
    params.id = id

    const body = {
      priority
    }
    const sdkDetails = { params, body }
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.activity.setPriority(params, this.__createRequest(body, headers, this.__getContentTypeHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_SET_ACTIVITY_PRIORITY({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Update Activity schedule.
   * Update schedule of an activity if it is found as referenced by the id.
   *
   * @param {number} id Activity id.
   * @param {string} schedule New Activity schedule.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  setActivitySchedule (id, schedule, options = {}) {
    const params = {}
    params.id = id

    const body = {
      schedule
    }
    const sdkDetails = { params, body }
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.activity.setSchedule(params, this.__createRequest(body, headers, this.__getContentTypeHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_SET_ACTIVITY_SCHEDULE({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Delete AB activity.
   * Deletes the AB activity that is referenced by the id, if it is found.
   *
   * @param {number} id Activity id.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  deleteABActivity (id, options = {}) {
    const params = {}
    params.id = id
    const sdkDetails = params
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.abactivity.deleteABActivity(params, this.__createRequest({}, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_DELETE_AB_ACTIVITY({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Delete XT activity.
   * Delete the current definition of an XT activity if it is found as referenced by the id.
   *
   * @param {number} id Activity id.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  deleteXTActivity (id, options = {}) {
    const params = {}
    params.id = id
    const sdkDetails = params
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.xtactivity.deleteXTActivity(params, this.__createRequest({}, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_DELETE_XT_ACTIVITY({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Get Activity changelog.
   * Returns the changelog for a given activity id.
   *
   * @param {number} id Activity id.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  getActivityChangeLog (id, options = {}) {
    const params = {}
    params.id = id
    const sdkDetails = params
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.activity.getChangeLog(params, this.__createRequest(null, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_ACTIVITY_CHANGELOG({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * List Offers.
   * Retrieve the list of previously-created content offers. The parameters passed through the query string are optional and are used to indicate the sorting and filtering options.
   *
   * @param {object} [options] to control offer search.
   * @param {number} [options.limit = 2147483647] Defines the number of items to return
   * @param {number} [options.offset = 0] Defines the first offers to return from the list of Offers. Used in conjunction with limit, you can provide pagination in your application for users to browse through a large set of offers.
   * @param {string} [options.sortBy] Defines the sorting criteria on the returned items.
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  getOffers (options = { limit: 2147483647, offset: 0 }) {
    const sdkDetails = options
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.offers.getOffers(arguments[0], this.__createRequest(null, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V2)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_OFFERS({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Get Offer.
   * Retrieves the contents of an offer given an offer id.
   *
   * @param {number} id Offer id.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  getOfferById (id, options = {}) {
    const params = {}
    params.id = id
    const sdkDetails = params
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.offer.getOfferById(params, this.__createRequest(null, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V2)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_OFFER_BY_ID({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Create Offer.
   * Creates a new content offer as defined by the request data.
   *
   * @param {object} body Offer JSON.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  createOffer (body, options = {}) {
    const sdkDetails = body
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.offers.createOffer({}, this.__createRequest(body, headers, this.__getContentTypeHeader(ACCEPT_HEADERS.V2)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_CREATE_OFFER({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Update Offer.
   * Updates the content offer referenced by the id.
   *
   * @param {number} id Offer id.
   * @param {object} body Offer JSON
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  updateOffer (id, body, options = {}) {
    const params = {}
    params.id = id
    const sdkDetails = { params, body }
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.offer.updateOffer(params, this.__createRequest(body, headers, this.__getContentTypeHeader(ACCEPT_HEADERS.V2)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_UPDATE_OFFER({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Delete Offer.
   * Deletes the content offer referenced by the provided id.
   *
   * @param {number} id Offer id.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  deleteOffer (id, options = {}) {
    const params = {}
    params.id = id
    const sdkDetails = params
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.offer.deleteOffer(params, this.__createRequest({}, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V2)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_DELETE_OFFER({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * List Audiences.
   * List all available audiences with options to filter and sort by each available field.
   *
   * @param {object} [options] options to control audience search.
   * @param {number } [options.limit = 2147483647] Defines the number of items to return. Default value is 2147483647
   * @param {number} [options.offset = 0] Defines the first audience to return from the list of total offers. Used in conjunction with limit, you can provide pagination in your application for users to browse through a large set of offers.
   * @param {string} [options.sortBy] Defines the sorting criteria on the returned items.
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  getAudiences (options = { limit: 2147483647, offset: 0 }) {
    const sdkDetails = options
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.audiences.getAudiences(arguments[0], this.__createRequest(null, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_AUDIENCES({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Create Audience.
   * Create a new audience as specified by the contents of the request and return the newly-created audience definition.
   *
   * @param {object} body Audience JSON.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  createAudience (body, options = {}) {
    const sdkDetails = body
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.audiences.createAudience({}, this.__createRequest(body, headers, this.__getContentTypeHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_CREATE_AUDIENCE({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Get Audience.
   * Get the audience definition specified by the provided id.
   *
   * @param {number} id Audience id.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  getAudienceById (id, options = {}) {
    const params = {}
    params.id = id
    const sdkDetails = params
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.audiences.getAudienceById(params, this.__createRequest(null, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_AUDIENCE_BY_ID({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Update Audience.
   * Update an audience with the new rules specified by the request data.
   *
   * @param {number} id Audience id.
   * @param {object }body audience JSON
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  updateAudience (id, body, options = {}) {
    const params = {}
    params.id = id
    const sdkDetails = { params, body }
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.audience.updateAudience(params, this.__createRequest(body, headers, this.__getContentTypeHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_UPDATE_AUDIENCE({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Delete Audience.
   * Delete the audience referenced by the specified id.
   *
   * @param {number} id Audience id.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  deleteAudience (id, options = {}) {
    const params = {}
    params.id = id
    const sdkDetails = params
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.audience.deleteAudience(params, this.__createRequest({}, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_DELETE_AUDIENCE({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * List Properties.
   * Get a list of properties.
   *
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  getProperties (options = {}) {
    const sdkDetails = options
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.properties.getProperties({}, this.__createRequest(null, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_PROPERTIES({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Get Property.
   * Retrieve property by property Id..
   *
   * @param {number} id Property id.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  getPropertyById (id, options = {}) {
    const params = {}
    params.id = id
    const sdkDetails = params
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.properties.getAPropertyById(params, this.__createRequest(null, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_PROPERTY_BY_ID({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * List MBoxes.
   * List all available mboxes for a specific client with the options to filter and sort.
   *
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  getMBoxes (options = {}) {
    const sdkDetails = {}
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.mboxes.getMBoxes({}, this.__createRequest(null, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_MBOXES({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Get MBox by name.
   * Get the list of mbox parameters.
   *
   * @param {string} name MBox name.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  getMBoxByName (name, options = {}) {
    const params = {}
    params.mboxName = name
    const sdkDetails = params
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.mboxes.getMBoxByName(params, this.__createRequest(null, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_MBOX_BY_NAME({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Get Profile Attributes.
   * Retrieve the list of available profile attributes and mbox parameters of type profile.
   *
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  getMBoxProfileAttributes (options = {}) {
    const sdkDetails = options
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.mbox.getProfileAttributes({}, this.__createRequest(null, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_MBOX_PROFILE_ATTRIBUTES({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Get Environments.
   * List all available environments with the options to filter and sort. Use the Environments API to retrieve the environment IDs corresponding to the various host groups set for the client.
   *
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  getEnvironments (options = {}) {
    const sdkDetails = options
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.environments.getEnvironments({}, this.__createRequest(null, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V1)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_ENVIRONMENTS({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Get AB activity performance.
   * Retrieve property by property Id.
   *
   * @param {number} id Activity id.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  getABActivityPerformance (id, options = {}) {
    const params = {}
    params.id = id
    const sdkDetails = params
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.reports.getABPerformance(params, this.__createRequest(null, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_AB_ACTIVITY_PERFORMANCE({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Get activity performance.
   * Retrieve property by property Id.
   *
   * @param {number} id Activity id.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  getXTActivityPerformance (id, options = {}) {
    const params = {}
    params.id = id
    const sdkDetails = params
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.reports.getXTPerformance(params, this.__createRequest(null, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_XT_ACTIVITY_PERFORMANCE({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Get activity performance.
   * Retrieve the performance report data for the Automated Personalization activity referenced by the provided id.
   *
   * @param {number} id Activity id.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  getActivityPerformance (id, options = {}) {
    const params = {}
    params.id = id
    const sdkDetails = params
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.reports.getABTPerformance(params, this.__createRequest(null, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_ACTIVITY_PERFORMANCE({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Get Orders report.
   * Retrieve the orders/audit report data for an AB, XT or Autotmated Personalization Activity.
   *
   * @param {number} id Activity id.
   * @param {object} [options] sdk options
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  getOrdersReport (id, options = {}) {
    const params = {}
    params.id = id
    const sdkDetails = params
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.reports.getAuditReport(params, this.__createRequest(null, headers, this.__getAcceptHeader(ACCEPT_HEADERS.V3)))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_ORDERS_REPORT({ sdkDetails, messageValues: err }))
        })
    })
  }

  /**
   * Execute Batch APIs.
   * Multiple Admin APIs can be executed as a single batch request.
   *
   * @param {object} body json to execute batch
   * @returns {Promise<Response>} a Promise resolving to a Response
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

  __createRequest (body, headers, defaultHeaders = {}) {
    const finalHeaders = Object.assign(defaultHeaders, headers)
    return {
      requestBody: body,
      server: 'https://mc.adobe.io/{tenant-name}/target',
      serverVariables: {
        'tenant-name': this.tenant
      },
      requestInterceptor: req => {
        this.__setHeaders(req, this, finalHeaders)
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
    Object.keys(headers).forEach(function (key) {
      req.headers[key] = headers[key]
    })
  }

  __getAcceptHeader (value) {
    return { accept: value }
  }

  __getContentTypeHeader (value) {
    return { 'Content-Type': value }
  }
}

module.exports = {
  init
}
