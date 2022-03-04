import {getLogger} from "../src";
import {allCallback, Callback, CriticalError, LoggedError, Logger, LOGGER_LEVELS, criticalCallback, errorCallback, infoCallback, getObjectName} from "../src";

describe(`Logging Module`, function(){

    let logger: Logger;

    beforeEach(() => {
        logger = getLogger();
        logger.setLevel(LOGGER_LEVELS.ALL);
        jest.clearAllMocks();
        jest.spyOn(logger, 'report');
    })


    it(`Instantiates`, function(){
       expect(logger).toBeDefined();
    });

    it(`Reports Errors according to level properly`, () => {
        const errorFunction = function(callback: Callback){
            callback("este e um erro de teste")
        }

        const wrapperFunction = function(callback: Callback){
            errorFunction((err) => {
                if (err)
                    return allCallback(err, callback);
                callback();
            })
        }

        wrapperFunction((err) => {
            expect(err).toBeDefined();
            expect(logger.report).toHaveBeenCalledTimes(1);
            const e = new LoggedError(err as Error);
            expect(logger.report).toHaveBeenCalledTimes(1);
            const e2 = new CriticalError(e as Error);
            expect(logger.report).toHaveBeenCalledTimes(2);
        });
    });

    it("Handles this in functions", () => {
        function testFunction(){
            return;
        }

        const testConst = function(){
            return;
        }

        expect(getObjectName(testFunction)).toBe("testFunction");
        expect(getObjectName(testConst)).toBe("testConst");
    })

    it(`Uses Callbacks properly and handles This`, (cb) => {

        const clazz = class {
            constructor(){}
        }

        const c = new clazz();

        allCallback.call(c, "este e um erro de teste {0}", (err) => {
            expect(err).toBeDefined();
            expect(logger.report).toHaveBeenCalledTimes(1);
            allCallback.call(c, err as Error, (err) => {
                expect(logger.report).toHaveBeenCalledTimes(1);
                infoCallback.call(c, err as Error, (err) => {
                    expect(logger.report).toHaveBeenCalledTimes(2);
                    infoCallback.call(c, err as Error, (err) => {
                        expect(logger.report).toHaveBeenCalledTimes(2);
                        errorCallback.call(c, err as Error, (err) => {
                            expect(logger.report).toHaveBeenCalledTimes(3);
                            errorCallback.call(c, err as Error, (err) => {
                                expect(logger.report).toHaveBeenCalledTimes(3);
                                criticalCallback.call(c, err as Error, (err) => {
                                    expect(logger.report).toHaveBeenCalledTimes(4);
                                    criticalCallback.call(c, err as Error, (err) => {
                                        expect(logger.report).toHaveBeenCalledTimes(4);
                                        cb();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }, "replacement");
    });
});