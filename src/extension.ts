import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // Получаем текущий язык интерфейса
  const currentLanguage = vscode.env.language;

  // Если язык не является английским, то меняем его
  if (currentLanguage !== 'en') {
    vscode.workspace
      .getConfiguration('locale')
      .update('value', 'en', vscode.ConfigurationTarget.Global);

    vscode.window.showInformationMessage('Язык интерфейса был изменен на английский!');
  }
}
