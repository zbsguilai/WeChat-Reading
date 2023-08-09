
import * as vscode from 'vscode';
import SidebarProvider from './SidebarProvider';
import { startProxy } from './utils/proxy';
import { configState } from './utils/config';
let proxy: any;
let webviewPanel: vscode.WebviewPanel | undefined = undefined;
export async function activate(context: vscode.ExtensionContext) {
	proxy = startProxy(configState.proxyPort);
	console.log('Congratulations, your extension "wxRead" is now active!');
	// //helloWorld
	// context.subscriptions.push(vscode.commands.registerCommand('wxRead.helloWorld', async () => {
	// 	vscode.window.showInformationMessage('Hello World from helloWord!');
	// }));
	// //打开文件夹
	// context.subscriptions.push(vscode.commands.registerCommand('wxRead.openFolder', async () => {
	// 	// vscode.window.showInformationMessage('Hello World from helloWord!');
	// 	const folderUri = vscode.Uri.file('/Users/zbs/dongwan/dist');
	// 	const success = await vscode.commands.executeCommand('vscode.openFolder', folderUri);
	// 	if (success) {
	// 		vscode.window.showInformationMessage('Successfully opened the folder.');
	// 	} else {
	// 		vscode.window.showErrorMessage('Failed to open the folder.');
	// 	}
	// }));

	// // 在您的扩展激活时，执行以下代码来设置上下文
	// vscode.commands.executeCommand('setContext', 'wxRead.showMyCommand', true);
	// //注释
	// context.subscriptions.push(vscode.commands.registerCommand('wxRead.note', () => {
	// 	vscode.commands.executeCommand('editor.action.addCommentLine');
	// 	console.log('asdas')
	// }));
	// //sayHello
	// const commandHandler = (name: string = 'world') => {
	// 	console.log(`Hello ${name}!!!`);
	// };
	// context.subscriptions.push(vscode.commands.registerCommand("wxRead.sayHello", commandHandler));

	// //when的应用
	// // 假设打开了很酷的事物，并且数量大于 2 
	// const numberOfCoolOpenThings = 1;
	// // 更新上下文的值，以便启用或禁用命令 wxRead.showHelloMessage
	// vscode.commands.executeCommand('setContext', 'wxRead.numberOfCoolOpenThings', numberOfCoolOpenThings);

	// // 在您的扩展激活时，执行以下代码来设置上下文
	// vscode.commands.executeCommand('setContext', 'wxRead.showMyCommand', true);
	// // 定义命令 wxRead.showHelloMessage，并在 package.json 文件中注册该命令
	// vscode.commands.registerCommand('wxRead.showHelloMessage', () => {
	// 	vscode.window.showInformationMessage('Hello, World!');
	// 	console.log(numberOfCoolOpenThings, 'numberOfCoolOpenThings')
	// });
	// //获取全部命令
	// vscode.commands.getCommands().then(res => {
	// 	console.log('所有命令：', res);
	// });


	// //微信读书案例
	// let disposable = vscode.commands.registerCommand('wxRead.wxRead', function () {
	// 	// 1.创建并显示Webview
	// 	const panel = vscode.window.createWebviewPanel(
	// 		// 该webview的标识，任意字符串
	// 		'wxRead-view',
	// 		// webview面板的标题，会展示给用户
	// 		'微信读书',
	// 		// webview面板所在的分栏
	// 		vscode.ViewColumn.One,
	// 		// 其它webview选项
	// 		{
	// 			enableScripts: true, // 启用JS，默认禁用
	// 			retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
	// 		}
	// 	);

	// });
	// context.subscriptions.push(disposable);



	const readerViewProvider = new SidebarProvider(context.extensionUri);
	vscode.window.registerWebviewViewProvider('wxRead-view', readerViewProvider, {
	  webviewOptions: {
		retainContextWhenHidden: true,
	  },
	});

	// createWebview(context);

	// context.subscriptions.push(
    //     vscode.commands.registerCommand('extension.showWebview', () => {
    //         if (!webviewPanel) {
    //             createWebview(context);
    //         } else {
    //             webviewPanel.reveal(vscode.ViewColumn.One);
    //         }
    //     }),

    //     vscode.commands.registerCommand('extension.hideWebview', () => {
    //         if (webviewPanel) {
    //             webviewPanel.dispose();
    //             webviewPanel = undefined;
    //         }
    //     })
    // );

	context.subscriptions.push(
        vscode.commands.registerCommand('wxRead.showWebview', () => {
			vscode.commands.executeCommand("workbench.view.extension.wxRead-container");
        }),

        vscode.commands.registerCommand('wxRead.hideWebview', () => {
			vscode.commands.executeCommand('workbench.action.closeSidebar'); // 关闭侧边栏
        })
    );

	

}

// This method is called when your extension is deactivated
export function deactivate() {
	if (proxy) {
		proxy.close();
	}
}


function createWebview(context:any) {
	// 创建 Webview 窗口
	webviewPanel = vscode.window.createWebviewPanel(
		// 该webview的标识，任意字符串
		'wxRead-view',
		// webview面板的标题，会展示给用户
		'微信读书',
		// webview面板所在的分栏
		vscode.ViewColumn.One,
		// 其它webview选项
		{
			enableScripts: true, // 启用JS，默认禁用
			retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
		}
	);
	//设置标题前图标
	webviewPanel.iconPath = {
		dark: vscode.Uri.file(context.extensionPath + '/media/read-icon-dark.png'),
		light: vscode.Uri.file(context.extensionPath + '/media/read-icon-light.png')
	};
	webviewPanel.webview.html = `<!DOCTYPE html>
					<html lang="en">
					<head>
						<meta charset="UTF-8">
						<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
						<meta content="portrait" name="x5-orientation">
						<meta content="true" name="x5-fullscreen">
						<meta content="portrait" name="screen-orientation">
						<meta content="yes" name="full-screen">
						<meta content="webkit" name="renderer">
						<meta content="IE=Edge" http-equiv="X-UA-Compatible">
						<title>微信读书</title>
						<style>
						html,body,iframe{
							width:100%;
							height:100%;
							border:0;
							overflow: hidden;
						}
						</style>
					</head>
					<body>
						<iframe src="http://localhost:${configState.proxyPort}" />
					</body>
					</html>`;
}