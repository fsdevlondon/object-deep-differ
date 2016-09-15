var chai = require('chai')
var expect = chai.expect
var diff = require('../index')

describe('object deep differ', function () {

  it('should work for objects with numbers', function () {
    expect(diff).not.to.be.undefined

    var source = { a: 1 }
    var defaults = { a: 1 }
    var result = diff(defaults, source)
    expect(result).to.deep.equal({})

    var source1 = { a: 1 }
    var defaults1 = { a: 2 }
    var result = diff(defaults1, source1)
    expect(result).to.deep.equal(source1)

  })

  it('should work for objects with strings', function () {
    expect(diff).not.to.be.undefined

    var source = { a: 'hello' }
    var defaults = { a: 'hello' }
    var result = diff(defaults, source)
    expect(result).to.deep.equal({})

    var source1 = { a: 'hello' }
    var defaults1 = { a: 'hello world' }
    var result = diff(defaults1, source1)
    expect(result).to.deep.equal(source1)
  })

  it('should work for objects with arrays', function () {
    expect(diff).not.to.be.undefined

    var source = { a: [ 1, 2, 3 ] }
    var defaults = { a: [ 1, 2, 3 ] }
    var result = diff(defaults, source)
    expect(result).to.deep.equal({})

    var source1 = { a: [ 1, 2, 3, 4, 5 ] }
    var defaults1 = { a: [ 1, 2, 3 ] }
    var result = diff(defaults1, source1)
    expect(result).to.deep.equal(source1)
  })

  it('should work for objects with objects', function () {
    expect(diff).not.to.be.undefined
    // test for object array
    var defaultsArr = { a: { b: [ 1, 2, 3 ] } }

    var srcArr = { a: { b: [ 1, 2, 3 ] } }
    var srcArr1 = { a: { b: [ 1, 2, 3, 4, 5 ] } }

    var result = diff(defaultsArr, srcArr)
    var result1 = diff(defaultsArr, srcArr1)

    expect(result).to.deep.equal({})
    expect(result1).to.deep.equal(srcArr1)

    // test for object number
    var defaultsNum = { a: { b: 1 } }

    var sourceNum = { a: { b: 1 } }
    var sourceNum1 = { a: { b: 2 } }

    var result = diff(defaultsNum, sourceNum)
    var result1 = diff(defaultsNum, sourceNum1)

    expect(result).to.deep.equal({})
    expect(result1).to.deep.equal(sourceNum1)

    // test for object string
    var defaultsStr = { a: { b: 'hello' } }

    var sourceStr = { a: { b: 'hello' } }
    var sourceStr1 = { a: { b: 'hello world' } }

    var result = diff(defaultsStr, sourceStr)
    var result1 = diff(defaultsStr, sourceStr1)

    expect(result).to.deep.equal({})
    expect(result1).to.deep.equal(sourceStr1)

    // test for object object
    var defaultsObj = { a: { b: { c: 'hello' } } }

    var sourceObj = { a: { b: { c: 'hello' } } }
    var sourceObj1 = { a: { b: { c: 'hello world' } } }
    var sourceObj2 = { a: { d: { e: 'hello world' } } }

    var result = diff(defaultsObj, sourceObj)
    var result1 = diff(defaultsObj, sourceObj1)
    var result2 = diff(defaultsObj, sourceObj2)

    expect(result).to.deep.equal({})
    expect(result1).to.deep.equal(sourceObj1)
    expect(result2).to.deep.equal(sourceObj2)

  })

  it('should calculate diff when an array has been pushed into', () => {
    const prev = {
      first: {
        arr: [
          { obj: 'obj1' }
        ]
      }
    }

    const curr = {
      first: {
        arr: [
          { obj: 'obj1' },
          { obj: 'obj2' },
          { obj: 'obj3' }
        ]
      }
    }

    const diffd = diff(prev, curr)

    expect(
      diffd
    ).to.eql({
      first: {
        arr: [
          { obj: 'obj1' },
          { obj: 'obj2' },
          { obj: 'obj3' }
        ]
      }
    })
  })

  it('should calculate diff when an existing value in an array has been edited', () => {
    const prev = {
      first: {
        arr: [
          { obj: 'obj1' },
          { obj: 'obj2' }
        ]
      }
    }

    const curr = {
      first: {
        arr: [
          { obj: 'obj-1' },
          { obj: 'obj2' }
        ]
      }
    }

    const diffd = diff(prev, curr)

    expect(
      diffd
    ).to.eql({
      first: {
        arr: [
          { obj: 'obj-1' },
          { obj: 'obj2' }
        ]
      }
    })
  })

  it('should show diff when deeply nested property is added', () => {
    const prev = {
      first: {
        not: 'changed'
      }
    }

    const curr = {
      first: {
        not: 'changed',
        second: {
          additional: 'property'
        }
      }
    }

    expect(
      diff(prev, curr)
    ).to.eql({
      first: {
        second: {
          additional: 'property'
        }
      }
    })
  })

  it('should show diff of modified existing property', () => {
    const prev = {
      first: {
        leave: 'me',
        update: 'me'
      }
    }

    const curr = {
      first: {
        leave: 'me',
        update: 'you'
      }
    }

    expect(
      diff(prev, curr)
    ).to.eql({
      first: {
        update: 'you'
      }
    })
  })

  it('should show diff when new property is added', () => {
    const prev = {
      first: {
        leave: 'me'
      }
    }

    const curr = {
      first: {
        leave: 'me',
        additional: 'property'
      }
    }

    expect(
      diff(prev, curr)
    ).to.eql({
      first: {
        additional: 'property'
      }
    })
  })
})
