import {
    debugCallback,
    Err,
    errorCallback,
    getLogger,
    loggedCallback,
    LoggedError,
    LOGGER_LEVELS,
    LoggerMessage
} from "../../src";

describe("Error Chaining", () => {
    it("replaces the message on create error", () => {
        const err = new LoggedError("this is {0} {1} {2}", undefined, 0, "an", "error", "message")
        expect(err.message).toEqual("this is an error message")
    })

    it("replaces the message on callback create error", (callback) => {
        debugCallback("this is {0} {1} {2}", (err: Err, ...args) => {
            expect(err).toBeDefined();
            expect(err).toBeInstanceOf(LoggedError)
            expect((err as Error)?.message).toEqual("this is an error message");
            callback()
        }, "an", "error", "message");
    })


    it("keeps the same error despite callback wrapping", (callback) => {
        debugCallback("this is {0} {1} {2}", (err: Err) => {
            expect(err).toBeDefined();
            expect(err).toBeDefined();
            expect(err).toBeInstanceOf(LoggedError)
            expect((err as Error)?.message).toEqual("this is an error message");
            expect((err as LoggedError).loggedAt).toEqual(1)
            loggedCallback(err as LoggerMessage, LOGGER_LEVELS.INFO, (err2: Err) => {
                expect(err2).toBeDefined();
                expect(err2).toBeDefined();
                expect(err2).toBeInstanceOf(LoggedError)
                expect((err2 as Error)?.message).toEqual("this is an error message");
                expect((err2 as LoggedError).loggedAt).toEqual(2)

                expect(err).toBe(err2);
                callback()
            })
        }, "an", "error", "message");
    })
})