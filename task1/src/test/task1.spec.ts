import { reverseStringFromStdin } from '../tasks/task1';

describe('Task1 tests', () => {
  it('Should reverse string from stdin successfully', () => {
    const stringWithCRLF = 'abc\r\n'

    const result = reverseStringFromStdin(stringWithCRLF)

    expect(result).toEqual('cba\r\n')
  })
})
