
import * as vscode from 'vscode';
import SidebarProvider from './SidebarProvider';
import { startProxy } from './utils/proxy';
import { configState } from './utils/config';
import {
	StatusBarAlignment,
	StatusBarItem,
	window,
	ConfigurationChangeEvent,
} from "vscode";
let proxy: any;
// let myStatusBarItem: vscode.StatusBarItem;
export async function activate(context: vscode.ExtensionContext) {
	proxy = startProxy(configState.proxyPort);
	const readerViewProvider = new SidebarProvider(context.extensionUri);
	vscode.window.registerWebviewViewProvider('wxRead-view', readerViewProvider, {
		webviewOptions: {
			retainContextWhenHidden: true,
		}
	});
	const statusBarItem = window.createStatusBarItem(
		StatusBarAlignment.Right,
		100
	);
	statusBarItem.text = `$(book) 微信读书`;
	statusBarItem.tooltip = `点击打开微信读书`;
	statusBarItem.command = 'wxRead.showWebview';
	statusBarItem.show();
	//   vscode.window.showInformationMessage("Click the status bar button to open the bottom menu or WebView.", "Open").then((action) => {
	//     if (action === "Open") {
	//         vscode.commands.executeCommand('extension.showWebView');
	//     }
	// });
	
	context.subscriptions.push(
		vscode.commands.registerCommand('wxRead.showWebview', () => {
			vscode.commands.executeCommand("workbench.view.extension.wxRead-container");
		}),
		vscode.commands.registerCommand('wxRead.hideWebview', () => {
			vscode.commands.executeCommand('workbench.action.closeSidebar'); // 关闭侧边栏
		}), statusBarItem
	)
}

export function deactivate() {
	if (proxy) {
		proxy.close();
	}
}
