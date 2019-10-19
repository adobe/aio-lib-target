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

const { ErrorWrapper, createUpdater } = require('@adobe/aio-lib-core-errors').AioCoreSDKErrorWrapper

const codes = {}
const messages = new Map()

/**
 * Create an Updater for the Error wrapper
 */
const Updater = createUpdater(
  // object that stores the error classes (to be exported)
  codes,
  // Map that stores the error strings (to be exported)
  messages
)

/**
 * Provides a wrapper to easily create classes of a certain name, and values
 */
const E = ErrorWrapper(
  // The class name for your SDK Error. Your Error objects will be these objects
  'TargetSDKError',
  // The name of your SDK. This will be a property in your Error objects
  'TargetSDK',
  // the object returned from the CreateUpdater call above
  Updater
  // the base class that your Error class is extending. CNACoreSDKError is the default
  /* CNACoreSDKError, */
)

module.exports = {
  codes,
  messages
}

// Define your error codes with the wrapper
E('ERROR_SDK_INITIALIZATION', 'SDK initialization error(s). Missing arguments: %s')
E('ERROR_GET_ACTIVITIES', '%s')
E('ERROR_CREATE_AB_ACTIVITY', '%s')
E('ERROR_CREATE_XT_ACTIVITY', '%s')
E('ERROR_GET_AB_ACTIVITY_BY_ID', '%s')
E('ERROR_GET_XT_ACTIVITY_BY_ID', '%s')
E('ERROR_UPDATE_AB_ACTIVITY', '%s')
E('ERROR_UPDATE_XT_ACTIVITY', '%s')
E('ERROR_SET_ACTIVITY_NAME', '%s')
E('ERROR_SET_ACTIVITY_STATE', '%s')
E('ERROR_SET_ACTIVITY_PRIORITY', '%s')
E('ERROR_SET_ACTIVITY_SCHEDULE', '%s')
E('ERROR_DELETE_AB_ACTIVITY', '%s')
E('ERROR_DELETE_XT_ACTIVITY', '%s')
E('ERROR_GET_ACTIVITY_CHANGELOG', '%s')
E('ERROR_GET_OFFERS', '%s')
E('ERROR_GET_OFFER_BY_ID', '%s')
E('ERROR_CREATE_OFFER', '%s')
E('ERROR_UPDATE_OFFER', '%s')
E('ERROR_DELETE_OFFER', '%s')
E('ERROR_GET_AUDIENCES', '%s')
E('ERROR_CREATE_AUDIENCE', '%s')
E('ERROR_GET_AUDIENCE_BY_ID', '%s')
E('ERROR_UPDATE_AUDIENCE', '%s')
E('ERROR_DELETE_AUDIENCE', '%s')
E('ERROR_GET_PROPERTIES', '%s')
E('ERROR_GET_PROPERTY_BY_ID', '%s')
E('ERROR_GET_MBOXES', '%s')
E('ERROR_GET_MBOX_BY_NAME', '%s')
E('ERROR_GET_MBOX_PROFILE_ATTRIBUTES', '%s')
E('ERROR_GET_ENVIRONMENTS', '%s')
E('ERROR_GET_AB_ACTIVITY_PERFORMANCE', '%s')
E('ERROR_GET_XT_ACTIVITY_PERFORMANCE', '%s')
E('ERROR_GET_ACTIVITY_PERFORMANCE', '%s')
E('ERROR_GET_ORDERS_REPORT', '%s')
E('ERROR_EXECUTE_BATCH', '%s')
