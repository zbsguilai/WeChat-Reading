"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./utils/config");
class ReaderViewProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView, context, _token) {
        this._view = webviewView;
        this._view.webview.options = {
            enableScripts: true,
        };
        this._view.webview.html = this.getHtmlForWebview();
    }
    getHtmlForWebview() {
        const { scale } = config_1.configState;
        const width = 95 / scale;
        const height = width;
        return `<!DOCTYPE html>
		<html lang="en">
		<head>
		  <meta charset="UTF-8">
		  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
		  <title>微信读书</title>
		  <style>
			html, body, iframe { margin: 0; width: 100%; height: 100%; border: none; overflow: hidden; }
			iframe {
			  width: ${width}vw;
			  height: ${height}vh;
			  transform: scale(${scale});
			  transform-origin: top left;
			}
		  </style>
		</head>
		<body>
		  <iframe src="http://localhost:${config_1.configState.proxyPort}" />
		</body>
	  </html>`;
    }
}
ReaderViewProvider.viewType = 'wxRead-view';
exports.default = ReaderViewProvider;
//# sourceMappingURL=SidebarProvider.js.map