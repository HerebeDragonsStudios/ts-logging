import {Logger} from "../../src";
import {getLogger} from "../../lib"; // at least one import is needed so the file is considered a module byt jest

describe("Distribution Tests", () => {
    it ("reads lib", () => {
        try {
            const {info, getLogger} = require("../../lib");
            const logger: Logger = getLogger()
            const reportSpy = jest.spyOn(logger, "report");
            info("Info Message");
            expect (reportSpy).toHaveBeenCalled();
        } catch (e) {
            expect(e).toBeUndefined();
        }

    })

    it ("reads JS Bundle", () => {
        try {
            const {info, getLogger} = require("../../dist/ts-logging.bundle.min.js")
            const logger: Logger = getLogger()
            const reportSpy = jest.spyOn(logger, "report");
            info("Info Message");
            expect (reportSpy).toHaveBeenCalled();
        } catch (e) {
            expect(e).toBeUndefined();
        }
    })
})