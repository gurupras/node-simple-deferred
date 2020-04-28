import Deferred from '../index'

describe('Deferred', () => {
  test('Can create object without argument', async () => {
    expect(() => new Deferred()).not.toThrow()
  })
  test('Resolving the deferred object resolves the promise it returns', async () => {
    const promise = new Deferred()
    promise.resolve()
    await expect(promise).toResolve()
  })
  test('Rejecting the deferred object rejects the promise it returns', async () => {
    const promise = new Deferred()
    promise.reject(new Error('bad'))
    await expect(promise).rejects.toBeInstanceOf(Error)
  })
  describe('Executor', () => {
    test('Resolves if executor resolves', async () => {
      const fn = jest.fn().mockImplementation((resolve, reject) => resolve())
      const promise = new Deferred(fn)
      await expect(promise).toResolve()
    })
    test('Rejects if executor rejects', async () => {
      const fn = jest.fn().mockImplementation((resolve, reject) => reject('bad'))
      const promise = new Deferred(fn)
      await expect(promise).rejects.toEqual('bad')
    })
  })
})
