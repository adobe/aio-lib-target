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

const BadRequest = {
  err: {
    throws: new Error('Bad Request')
  },
  message: 'Bad Request'

}
const UnauthorizedRequest = {
  err: {
    throws: new Error('Unauthorized')
  },
  message: 'Unauthorized'
}
const ForbiddenRequest = {
  err: {
    throws: new Error('Forbidden Request')
  },
  message: 'Forbidden Request'
}
const NotFound = {
  err: {
    throws: new Error('Not Found')
  },
  message: 'Not Found'
}
const InternalServerError = {
  err: {
    throws: new Error('Internal Server Error')
  },
  message: 'Internal Server Error'
}

const activities = {
  total: 2,
  offset: 0,
  limit: 10,
  activities: [
    {
      id: 168805,
      thirdPartyId: '2fc846c4-d5c6-4d67-9ef8-939bb907cc71',
      type: 'ab',
      state: 'deactivated',
      name: 'A3 - L4242 - Serversid testing',
      priority: 0,
      modifiedAt: '2017-05-11T10:11:35Z',
      workspace: '1234567'
    },
    {
      id: 168816,
      thirdPartyId: 'f7134ab6-ee98-422f-a59d-a1efc3cd85a9',
      type: 'ab',
      state: 'deactivated',
      name: 'A5-L4242',
      priority: 0,
      modifiedAt: '2017-05-11T10:11:33Z',
      workspace: '1234567'
    }
  ]
}

const abActivity = {
  id: 123,
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
const abActivityUpdated = {
  id: 123,
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
const xtActivity = {
  id: 321,
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
const xtActivityUpdated = {
  id: 321,
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
const nameActivity = {
  id: 123,
  name: 'new name',
  state: 'activated',
  priority: '5',
  startsAt: '2017-05-01T08:00Z',
  endsAt: '2017-09-01T07:59:59Z',
  modifiedAt: '2017-01-01T00:00Z'
}
const changeLog = {
  offset: 0,
  limit: 2147483647,
  total: 2,
  activityChangelogs: [
    {
      modifiedAt: '2017-05-11T12:16:13Z',
      activityParameters: {
        state: {
          previousValue: 'approved',
          changedValue: 'saved'
        }
      }
    },
    {
      modifiedAt: '2017-04-27T14:09:44Z',
      activityParameters: {
        state: {
          previousValue: 'approved',
          changedValue: 'saved'
        }
      }
    }
  ]
}

const offers = {
  total: 2,
  offset: 0,
  limit: 10,
  offers: [
    {
      id: 391769,
      name: '/l1_a_b_test/experiences/0/pages/0/zones/0/1489440825492',
      type: 'content',
      modifiedAt: '2017-03-20T03:03:28Z',
      workspace: '1234567'
    },
    {
      id: 391902,
      name: '10OFF',
      type: 'content',
      modifiedAt: '2017-03-19T00:06:47Z',
      workspace: '1234567'
    }
  ]
}

const offer = {
  id: 111,
  name: '10OFF',
  content: 'Use 10OFF for $10 off for orders over $100',
  modifiedAt: '2017-03-19T00:06:47Z',
  workspace: '1234567'
}

const newOffer = {
  id: 123,
  name: 'My new offer',
  content: '<div>The content of the offer</div>',
  modifiedAt: '2017-07-10T20:46:53Z',
  workspace: '1234567'
}

const updatedOffer = {
  id: 123,
  name: 'My updated offer',
  content: '<div>Updated content</div>',
  modifiedAt: '2017-07-10T20:46:53Z',
  workspace: '1234567'
}
const audiences = {
  offset: 0,
  limit: 10,
  total: 2,
  audiences: [
    {
      id: 1216090,
      name: 'A1 -  Active account l-1489628809975',
      description: '--',
      origin: 'target',
      modifiedAt: '2017-03-16T01:47:07Z',
      workspace: '1234567'
    },
    {
      id: 1216183,
      name: 'A1 - Current Category -1489642111631',
      description: '--',
      origin: 'target',
      modifiedAt: '2017-03-16T05:28:33Z',
      workspace: '1234567'
    }
  ]
}
const audience = {
  id: 111,
  name: 'Gold Members in Califo-1495136673062',
  description: '--',
  origin: 'target',
  targetRule: {
    and: [
      {
        profile: 'memberLevel',
        equals: [
          'gold'
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
  modifiedAt: '2017-05-18T19:44:34Z',
  workspace: '1234567'
}
const newAudience = {
  id: 123,
  name: 'Gold Members in Califo-1495136673062',
  description: '--',
  origin: 'target',
  targetRule: {
    and: [
      {
        profile: 'memberLevel',
        equals: [
          'gold'
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
  modifiedAt: '2017-05-18T19:44:34Z',
  workspace: '1234567'
}
const updatedAudience = {
  id: 123,
  name: 'Updated Gold Members in Califo-1495136673062',
  description: '--',
  origin: 'target',
  targetRule: {
    and: [
      {
        profile: 'memberLevel',
        equals: [
          'gold'
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
  modifiedAt: '2017-05-18T19:44:34Z',
  workspace: '1234567'
}
const properties = {
  total: 2,
  offset: 0,
  limit: 10,
  properties: [
    {
      id: 2,
      name: 'Products pagde',
      description: 'This property will be required on all pages under Products section of website',
      channel: 'web',
      segmentId: 410923,
      modifiedAt: '2019-02-18T12:26:22.000Z',
      workspaces: [
        '12',
        '15'
      ]
    },
    {
      id: 1,
      name: 'Products page',
      description: 'This property will be required on all pages under Products section of website',
      channel: 'web',
      segmentId: 410923,
      modifiedAt: '2019-02-18T12:25:20.000Z'
    }
  ]
}
const property = {

  id: 111,
  name: 'Email property',
  description: 'This is a email type of property',
  channel: 'email',
  segmentId: 5,
  workspaces: [
    '1234567',
    '12345679'
  ]
}
const mbox = {
  name: 'a1-mobile-mboxparams',
  mboxParameters: [
    {
      name: 'a.AppID',
      parameterType: 'MBOX'
    },
    {
      name: 'a.CarrierName',
      parameterType: 'MBOX'
    },
    {
      name: 'a.CrashEvent',
      parameterType: 'MBOX'
    }
  ]
}
const mboxes = {
  total: 2,
  offset: 0,
  limit: 5,
  mboxes: [
    {
      name: 'a1-mobile-aam',
      status: 'active',
      lastRequestedAt: '2017-07-09T20:41:18.000Z'
    },
    {
      name: 'a1-mobile-ab',
      status: 'active',
      lastRequestedAt: '2017-07-04T10:22:59.000Z'
    }
  ]
}

const attributes = {
  mboxProfileAttributes: [
    'activeAccounts',
    'country',
    'entity.id',
    'entity.name',
    'gotlastname',
    'hasChecking',
    'hasMortgage',
    'hasRetirement',
    'house',
    'mbox3rdPartyId',
    'memberLevel',
    'nbalastname',
    'param1',
    'param2',
    'playerName',
    'qaExperience',
    'transformerType'
  ]
}
const mboxParams = {
  name: 'a1-mobile-mboxparams',
  mboxParameters: [
    {
      name: 'a.AppID',
      parameterType: 'MBOX'
    },
    {
      name: 'a.CarrierName',
      parameterType: 'MBOX'
    },
    {
      name: 'a.CrashEvent',
      parameterType: 'MBOX'
    }
  ]
}
const environments = {
  total: 3,
  offset: 0,
  limit: 2147483647,
  environments: [
    {
      id: 8820,
      name: 'Development'
    },
    {
      id: 8818,
      name: 'Production'
    },
    {
      id: 8819,
      name: 'Staging'
    }
  ]
}

const abPerformance = {
  reportParameters: {
    activityId: 111,
    environmentId: 8818,
    conversionMetricLocalIds: [
      32767
    ],
    reportInterval: '2017-03-14T05:00Z/2017-07-10T07:00Z'
  },
  activity: {
    id: 111,
    thirdPartyId: 'f79c0aa0-44e4-4766-ab93-1bf11b781f84',
    type: 'ab',
    state: 'approved',
    name: 'Master - Mobile - AB',
    priority: 999,
    modifiedAt: '2017-06-30T19:48:38Z',
    metrics: [
      {
        name: 'Entry',
        metricLocalId: 0
      }
    ],
    experiences: [
      {
        name: '5OFF',
        experienceLocalId: 0
      }
    ]
  },
  report: {
    statistics: {
      totals: {
        visitor: {
          totals: {
            entries: 115,
            conversions: 0
          }
        },
        visit: {
          totals: {
            entries: 274,
            conversions: 0
          }
        }
      }
    }
  }
}

const xtPerformance = {
  reportParameters: {
    activityId: 123,
    environmentId: 8818,
    conversionMetricLocalIds: [
      32767
    ],
    reportInterval: '2017-03-20T16:00Z/2017-07-10T07:00Z'
  },
  activity: {
    id: 123,
    thirdPartyId: '6116ec53-5a2b-4f5d-9268-41e4c153e494',
    type: 'xt',
    state: 'approved',
    name: 'Master - Serverside - XT',
    priority: 0,
    modifiedAt: '2017-06-06T22:00:25Z',
    metrics: [
      {
        name: 'Entry',
        metricLocalId: 0
      }
    ],
    experiences: [
      {
        name: 'USA Experience',
        experienceLocalId: 0
      }
    ]
  },
  report: {
    statistics: {
      totals: {
        visitor: {
          totals: {
            entries: 41,
            conversions: 0
          }
        },
        visit: {
          totals: {
            entries: 52,
            conversions: 0
          }
        }
      }
    }
  }
}

const performance = {
  reportParameters: {
    activityId: 123,
    environmentId: 8818,
    conversionMetricLocalIds: [
      32767
    ],
    reportInterval: '2017-03-20T16:00Z/2017-07-10T07:00Z'
  },
  activity: {
    id: 123,
    thirdPartyId: '6116ec53-5a2b-4f5d-9268-41e4c153e494',
    type: 'xt',
    state: 'approved',
    name: 'Master - Serverside - XT',
    priority: 0,
    modifiedAt: '2017-06-06T22:00:25Z',
    metrics: [
      {
        name: 'Entry',
        metricLocalId: 0
      }
    ],
    experiences: [
      {
        name: 'USA Experience',
        experienceLocalId: 0
      }
    ]
  },
  report: {
    statistics: {
      totals: {
        visitor: {
          totals: {
            entries: 41,
            conversions: 0
          }
        },
        visit: {
          totals: {
            entries: 52,
            conversions: 0
          }
        }
      }
    }
  }
}

const report = {
  reportParameters: {
    activityId: 123,
    environmentId: 8818,
    conversionMetricLocalIds: [
      32767
    ],
    reportInterval: '2017-03-20T16:00Z/2017-07-10T07:00Z'
  },
  activity: {
    id: 123,
    thirdPartyId: '6116ec53-5a2b-4f5d-9268-41e4c153e494',
    type: 'xt',
    state: 'approved',
    name: 'Master - Serverside - XT',
    priority: 0,
    modifiedAt: '2017-06-06T22:00:25Z',
    metrics: [
      {
        name: 'Entry',
        metricLocalId: 0
      }
    ],
    experiences: [
      {
        name: 'USA Experience',
        experienceLocalId: 0
      }
    ]
  },
  report: {
    statistics: {
      totals: {
        visitor: {
          totals: {
            entries: 41,
            conversions: 0
          }
        },
        visit: {
          totals: {
            entries: 52,
            conversions: 0
          }
        }
      }
    }
  }
}

const batch = {
  results: [
    {
      operationId: 1,
      'skipped~': false,
      'statusCode~': 200,
      'headers~': [
        {
          name: 'Content-Type',
          value: 'application/json; charset=UTF-8'
        }
      ],
      'body~': {
        id: 5
      }
    }
  ]
}

const data = {
  activities: activities,
  abActivity: abActivity,
  xtActivity: xtActivity,
  abActivityUpdated: abActivityUpdated,
  xtActivityUpdated: xtActivityUpdated,
  nameActivity: nameActivity,
  changeLog: changeLog,
  offers: offers,
  offer: offer,
  newOffer: newOffer,
  updatedOffer: updatedOffer,
  audiences: audiences,
  audience: audience,
  newAudience: newAudience,
  updatedAudience: updatedAudience,
  properties: properties,
  property: property,
  mboxes: mboxes,
  mbox: mbox,
  attributes: attributes,
  mboxParams: mboxParams,
  environments: environments,
  abPerformance: abPerformance,
  xtPerformance: xtPerformance,
  performance: performance,
  report: report,
  batch: batch
}

module.exports = {
  data: data,
  errors: {
    Bad_Request: BadRequest,
    Unauthorized_Request: UnauthorizedRequest,
    Forbidden_Request: ForbiddenRequest,
    Not_Found: NotFound,
    Internal_Server_Error: InternalServerError
  }
}
