import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // Get the current interface language
  const currentLanguage = vscode.env.language;

  // If the language is not English, change it
  if (currentLanguage !== 'en') {
    vscode.workspace
      .getConfiguration('locale')
      .update('value', 'en', vscode.ConfigurationTarget.Global);

    vscode.window.showInformationMessage('Язык интерфейса был изменен на английский!');
  }
}
