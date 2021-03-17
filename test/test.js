const chai = require('chai')
const expect = chai.expect
const differ = require('..')

describe('object deep differ', function () {

  it('is not undefined', () => {
    expect(differ).not.to.be.undefined
  })

  context('objects with numbers', () => {
    it('with no difference', function () {
      const source = { a: 1 }
      const defaults = { a: 1 }
      const result = differ(defaults, source)
      expect(result).to.deep.equal({})
    })

    it('with difference', function () {
      const source1 = { a: 1 }
      const defaults1 = { a: 2 }
      const result = differ(defaults1, source1)
      expect(result).to.deep.equal(source1)
    })
  })

  context('objects with strings', () => {
    it('with no difference', function () {
      const source = { a: 'hello' }
      const defaults = { a: 'hello' }
      const result = differ(defaults, source)
      expect(result).to.deep.equal({})
    })

    it('with difference', function () {
      const source1 = { a: 'hello' }
      const defaults1 = { a: 'hello world' }
      const result = differ(defaults1, source1)
      expect(result).to.deep.equal(source1)
    })
  })

  context('objects with arrays', () => {
    it('with no difference', function () {
      const source = { a: [ 1, 2, 3 ] }
      const defaults = { a: [ 1, 2, 3 ] }
      const result = differ(defaults, source)
      expect(result).to.deep.equal({})
    })

    it('with difference', function () {
      const source1 = { a: [ 1, 2, 3, 4, 5 ] }
      const defaults1 = { a: [ 1, 2, 3 ] }
      const result = differ(defaults1, source1)
      expect(result).to.deep.equal(source1)
    })
  })

  it('should work for objects with arrays', function () {
    const defaultsArr = { a: { b: [ 1, 2, 3 ] } }

    const srcArr = { a: { b: [ 1, 2, 3 ] } }
    const srcArr1 = { a: { b: [ 1, 2, 3, 4, 5 ] } }

    const result = differ(defaultsArr, srcArr)
    const result1 = differ(defaultsArr, srcArr1)

    expect(result).to.deep.equal({})
    expect(result1).to.deep.equal(srcArr1)
  })

  it('should work for objects with numbers', () => {
    const defaultsNum = { a: { b: 1 } }

    const sourceNum = { a: { b: 1 } }
    const sourceNum1 = { a: { b: 2 } }

    const result = differ(defaultsNum, sourceNum)
    const result1 = differ(defaultsNum, sourceNum1)

    expect(result).to.deep.equal({})
    expect(result1).to.deep.equal(sourceNum1)
  })

  it('should work for objects with strings', () => {
    const defaultsStr = { a: { b: 'hello' } }

    const sourceStr = { a: { b: 'hello' } }
    const sourceStr1 = { a: { b: 'hello world' } }

    const result = differ(defaultsStr, sourceStr)
    const result1 = differ(defaultsStr, sourceStr1)

    expect(result).to.deep.equal({})
    expect(result1).to.deep.equal(sourceStr1)

  })

  it('should work for objects with objects', () => {
    const defaultsObj = { a: { b: { c: 'hello' } } }

    const sourceObj = { a: { b: { c: 'hello' } } }
    const sourceObj1 = { a: { b: { c: 'hello world' } } }
    const sourceObj2 = { a: { d: { e: 'hello world' } } }

    const result = differ(defaultsObj, sourceObj)
    const result1 = differ(defaultsObj, sourceObj1)
    const result2 = differ(defaultsObj, sourceObj2)

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

    const diffd = differ(prev, curr)

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

    const diffd = differ(prev, curr)

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
      differ(prev, curr)
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
      differ(prev, curr)
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
      differ(prev, curr)
    ).to.eql({
      first: {
        additional: 'property'
      }
    })
  })
})
