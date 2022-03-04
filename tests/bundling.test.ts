import {LoggedError} from "../lib"; // at least one import is needed so the file is considered a module byt jest

describe("Distribution Tests", () => {
    it ("reads lib", () => {
        try {
            const {info, getLogger} = require("../lib");
            const reportSpy = jest.spyOn(getLogger(), "report");
            info("Info Message");
            expect (reportSpy).toHaveBeenCalled();
        } catch (e) {
            expect(e).toBeUndefined();
        }

    })

    it ("reads JS Bundle", () => {
        try {
            const {info, getLogger} = require("../dist/logging.bundle.js")
            const reportSpy = jest.spyOn(getLogger(), "report");
            info("Info Message");
            expect (reportSpy).toHaveBeenCalled();
        } catch (e) {
            expect(e).toBeUndefined();
        }
    })
})