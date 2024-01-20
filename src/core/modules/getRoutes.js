const { green } = require('colorette');
const fs = require('fs');
const { capitalizeFirstLetter } = require('../utils/formatter');

/**
 * Get Controller from Route Path
 * @param {string} controllerPath
 * @param {string} filePath
 */
function _getController(controllerPath, filePath) {
    if (fs.existsSync(controllerPath)) {
        const msgType = green('routes');

        const routeDir = green(filePath);
        const message = `controller ${routeDir} registered`;

        // require controller
        require(controllerPath);
    }
}

/**
 * Get Routes
 * @param {string} basePath
 */
const getRoutes = (basePath) => {
    const checkJS = basePath.match('src');

    if (checkJS) {
        // loop main controller directory
        fs.readdirSync(basePath).forEach((file) => {
            const regexExt = /^.*\.(js)$/;
            const matchFile = file.match(regexExt);

            const controllerPath = `${basePath}/${file}`;
            const controllerExist = fs.existsSync(controllerPath);

            if (matchFile) {
                const splitFilename = file.split('.');
                const filename = capitalizeFirstLetter(splitFilename[0]);

                _getController(controllerPath, filename);
            }

            if (!matchFile || !controllerExist) {
                getRoutes(controllerPath);
            }
        });
    }
};

module.exports = { getRoutes };
