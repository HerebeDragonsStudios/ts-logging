import {Err} from "../../src";
const {runCommand} = require('@glass-project/dsu-utils/src/emulateWorkspace.js');

describe("Loading After OpenDSU", () => {
    jest.setTimeout(150000)
    it("Loads lib after OpenDSU", (jestCallback) => {
        runCommand("node", "./node_modules/@glass-project/dsu-utils/src/after-dsu-boot.js", "--script=./tests/after-dsu/lib.after.dsu.require.js", (err: Err, log: {data: string[], error: string[]}) => {
            jestCallback(err);
        })
    })
})