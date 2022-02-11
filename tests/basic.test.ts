import {getLogger} from "../src"

describe(`Logging Module`, function(){
    it(`Instantiates`, function(){
       const logger = getLogger();
       expect(logger).toBeDefined();
    });
});