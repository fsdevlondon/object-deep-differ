const _ = require('lodash')

const diff = function (defaults, source) {
  const result = _.cloneDeep(source)

  _.map(result, function (value, key) {
    if (typeof (value) === 'object') {

      if (_.isArray(value)) {
        const tmp = _.difference(value, defaults[ key ])

        if (!tmp.length) {
          delete result[ key ]
        }

      } else {

        if ((typeof defaults[ key ] === 'undefined') ||
            (value === null && defaults[ key ] !== null)) {

          result[ key ] = value

        } else {

          const tmp = diff(defaults[ key ], value)
          if (_.isEmpty(tmp)) {

            delete result[ key ]
          } else {

            result[ key ] = tmp
          }
        }
      }

    } else {

      if (defaults[ key ] === value) {
        delete result[ key ]
      }
    }
  })

  return result
}

module.exports = diff
