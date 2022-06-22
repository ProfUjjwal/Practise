import { createMockContext, Mocks } from '@zopsmart/zode'

import { createAccount, getAccount, deleteAccount, updateAccount } from './accountservice'

const describeDescription = 'mock sql Database'

describe(describeDescription, () => {
    const mockDatabase = Mocks.sqlDatabase()
    const id = "6406b530-9e19-4723-8f19-38e4d518aa4d"
    const mockContext = createMockContext({
        database: mockDatabase,
        state: {
            body: { "name": "zopsmart" },
            params: { id }
        }
    })
    test('should be able to test the sqlQuery fn', async () => {
        const res = await createAccount(mockContext)
        expect(mockDatabase.rawQuery).toHaveBeenCalledTimes(1)
    })
    test('should be able to test the sqlQuery fn', async () => {
        const res = await getAccount(mockContext)
        expect(mockDatabase.rawQuery).toHaveBeenCalledTimes(1)
    })
    test('should be able to test the sqlQuery fn', async () => {
        const res = await updateAccount(mockContext)
        expect(mockDatabase.rawQuery).toHaveBeenCalledTimes(1)
    })
    test('should be able to test the sqlQuery fn', async () => {
        const res = await deleteAccount(mockContext)
        expect(mockDatabase.rawQuery).toHaveBeenCalledTimes(1)
    })
})