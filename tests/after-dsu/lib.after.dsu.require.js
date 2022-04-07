/**
 * This file is meant to Load all @GlassProject dependencies after OpenDSU
 * has been loaded to confirm no circular imports are found
 */
try {
    const path = require('path');
    const {info} = require(path.join(process.cwd(), "lib"));

    if (!info)
        throw new Error("could not load from lib");

    info("Lib Loaded after OpenDSU")
} catch (e) {
    throw (e);
}
