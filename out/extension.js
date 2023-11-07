"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const SidebarProvider_1 = require("./SidebarProvider");
const proxy_1 = require("./utils/proxy");
const config_1 = require("./utils/config");
const vscode_1 = require("vscode");
let proxy;
// let myStatusBarItem: vscode.StatusBarItem;
async function activate(context) {
    proxy = (0, proxy_1.startProxy)(config_1.configState.proxyPort);
    const readerViewProvider = new SidebarProvider_1.default(context.extensionUri);
    vscode.window.registerWebviewViewProvider('wxRead-view', readerViewProvider, {
        webviewOptions: {
            retainContextWhenHidden: true,
        }
    });
    const statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right, 100);
    statusBarItem.text = `$(book) 微信读书`;
    statusBarItem.tooltip = `点击打开微信读书`;
    statusBarItem.command = 'wxRead.showWebview';
    statusBarItem.show();
    //   vscode.window.showInformationMessage("Click the status bar button to open the bottom menu or WebView.", "Open").then((action) => {
    //     if (action === "Open") {
    //         vscode.commands.executeCommand('extension.showWebView');
    //     }
    // });
    context.subscriptions.push(vscode.commands.registerCommand('wxRead.showWebview', () => {
        vscode.commands.executeCommand("workbench.view.extension.wxRead-container");
    }), vscode.commands.registerCommand('wxRead.hideWebview', () => {
        vscode.commands.executeCommand('workbench.action.closeSidebar'); // 关闭侧边栏
    }), statusBarItem);
}
exports.activate = activate;
function deactivate() {
    if (proxy) {
        proxy.close();
    }
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map