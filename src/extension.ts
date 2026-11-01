import * as vscode from 'vscode';

async function enforceEnglishLanguage(manualTrigger = false) {
  const currentEnvLanguage = vscode.env.language;
  const config = vscode.workspace.getConfiguration('workbench');
  const currentConfigLocale = config.get<string>('locale');
  const targetLocale = 'en';

  const isEnvNonEnglish = !currentEnvLanguage.toLowerCase().startsWith('en');
  const isConfigNonEnglish = Boolean(currentConfigLocale && !currentConfigLocale.toLowerCase().startsWith('en'));

  if (isEnvNonEnglish || isConfigNonEnglish) {
    if (currentConfigLocale !== targetLocale) {
      await config.update('locale', targetLocale, vscode.ConfigurationTarget.Global);
    }

    const message = 'VS Code language set to English. Reload window to apply changes.';
    const selection = await vscode.window.showInformationMessage(message, 'Reload Window');

    if (selection === 'Reload Window') {
      vscode.commands.executeCommand('workbench.action.reloadWindow');
    }
  } else if (manualTrigger) {
    vscode.window.showInformationMessage('VS Code is already configured to use English.');
  }
}

export function activate(context: vscode.ExtensionContext) {
  // Check language settings on activation
  enforceEnglishLanguage();

  // Watch for configuration changes to workbench.locale
  const configChangeListener = vscode.workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration('workbench.locale')) {
      enforceEnglishLanguage();
    }
  });

  // Command to manually check and switch language
  const switchCommand = vscode.commands.registerCommand('extension.switchToEnglish', () => {
    enforceEnglishLanguage(true);
  });

  context.subscriptions.push(configChangeListener, switchCommand);
}

export function deactivate() {}
