"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configState = void 0;
const vscode_1 = require("vscode");
const configState = {
    get proxyPort() {
        return getConfig('wxRead.proxyPort');
    },
    get scale() {
        return getConfig('wxRead.scale');
    },
};
exports.configState = configState;
function getConfig(key) {
    return vscode_1.workspace.getConfiguration().get(key);
}
//# sourceMappingURL=config.js.map