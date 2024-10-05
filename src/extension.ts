import * as vscode from 'vscode';
import OpenAI from 'openai';  // Ensure this package is installed via npm

export function activate(context: vscode.ExtensionContext) {
    console.log('ChatGPT Assistant is now active!');

    let disposable = vscode.commands.registerCommand('chatgptAssistant.start', async () => {
        const openai = new OpenAI({
            apiKey: 'sk-bOSZvh5iIIUQRZ8wMyPITDCfR1BuLVUXSpGSy2BttwT3BlbkFJMTkPJHg7WgmnJnpEoxPi47hg8N7m2Ndsovz5Cb_XwA'  // Your API key
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
                model: "gpt-4",  // Adjust model as necessary
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
            } else {
                vscode.window.showErrorMessage('No suggestions received from ChatGPT.');
            }
        } catch (error: any) {
            vscode.window.showErrorMessage(`Error: ${error?.message || error}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}