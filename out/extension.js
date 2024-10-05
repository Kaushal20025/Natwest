"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const openai_1 = __importDefault(require("openai")); // Ensure this package is installed via npm
function activate(context) {
    console.log('ChatGPT Assistant is now active!');
    let disposable = vscode.commands.registerCommand('chatgptAssistant.start', async () => {
        const openai = new openai_1.default({
            apiKey: 'sk-bOSZvh5iIIUQRZ8wMyPITDCfR1BuLVUXSpGSy2BttwT3BlbkFJMTkPJHg7WgmnJnpEoxPi47hg8N7m2Ndsovz5Cb_XwA' // Your API key
        });
        // Get the current text editor content
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found!');
            return;
        }
        const documentText = editor.document.getText();
        vscode.window.showInformationMessage('Fetching AI suggestion for your code...');
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4", // Adjust model as necessary
                messages: [
                    {
                        "role": "user",
                        "content": `Can you suggest improvements for the following code: ${documentText}`
                    }
                ]
            });
            const response = completion.choices[0].message?.content;
            if (response) {
                // Show the response in a VS Code information message
                vscode.window.showInformationMessage(`ChatGPT Suggestion: ${response}`);
            }
            else {
                vscode.window.showErrorMessage('No suggestions received from ChatGPT.');
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error: ${error?.message || error}`);
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map