mockDate()
disableLogging()

function mockDate() {
    process.env.TZ = 'UTC'
    jest.useFakeTimers().setSystemTime(new Date(2018, 5, 27, 0, 0, 0))
}

function disableLogging() {
    process.env.LOG_LEVEL = 'silent'
}