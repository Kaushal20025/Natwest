import * as vscode from 'vscode';
import OpenAI from 'openai';  // Ensure this package is installed via npm

export function activate(context: vscode.ExtensionContext) {
    console.log('ChatGPT Assistant is now active!');

    // Register the command for starting the chat
    let disposable = vscode.commands.registerCommand('chatgptAssistant.start', async () => {
        // Fetch the API key from VSCode settings
        const apiKey = vscode.workspace.getConfiguration('chatgptAssistant').get('apiKey') as string;

        // If no API key is found, show an error message
        if (!apiKey) {
            vscode.window.showErrorMessage('Please configure your OpenAI API key in the settings.');
            return;
        }

        const openai = new OpenAI({
            apiKey: apiKey  // Use the API key from the settings
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

    // Register the completion item provider
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(
            { scheme: 'file', language: 'javascript' }, // Change this to the relevant language
            {
                provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                    const completionItems: vscode.CompletionItem[] = [];

                    // Check if the current character before the cursor is '?'
                    const linePrefix = document.lineAt(position).text.substring(0, position.character);
                    if (linePrefix.endsWith('?')) {
                        // Add a completion item
                        const completionItem = new vscode.CompletionItem('Example Completion', vscode.CompletionItemKind.Text);
                        completionItem.detail = 'This is a completion suggestion';
                        completionItem.documentation = 'Details about this completion';
                        completionItems.push(completionItem);
                    }

                    return completionItems;
                }
            },
            '?' // Trigger character
        )
    );
}

export function deactivate() {}
