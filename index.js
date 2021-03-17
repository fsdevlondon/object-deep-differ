'use strict'

const map = require('lodash/map')
const isArray = require('lodash/isArray')
const cloneDeep = require('lodash/cloneDeep')
const isEmpty = require('lodash/isEmpty')
const difference = require('lodash/difference')

function diff (defaults, source) {
  const result = cloneDeep(source)

  map(result, function (value, key) {
    if (typeof (value) === 'object') {

      if (isArray(value)) {
        const tmp = difference(value, (defaults !== null ? defaults[ key ] : []))

        if (!tmp.length) {
          delete result[ key ]
        }

      } else {

        if (defaults !== null &&
            ((typeof defaults[ key ] === 'undefined') ||
            (value === null && defaults[ key ] !== null))) {

          result[ key ] = value

        } else {

          const tmp = diff((defaults !== null ? defaults[ key ] : {}), value)
          if (isEmpty(tmp)) {

            delete result[ key ]
          } else {

            result[ key ] = tmp
          }
        }
      }

    } else {

      if (defaults !== null && defaults[ key ] === value) {
        delete result[ key ]
      }
    }
  })

  return result
}

module.exports = diff
