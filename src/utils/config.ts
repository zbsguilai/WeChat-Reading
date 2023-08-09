import { workspace } from 'vscode';

const configState = {
  get proxyPort() {
    return getConfig('wxRead.proxyPort') as number;
  },
  get scale() {
    return getConfig('wxRead.scale') as number;
  },
};

function getConfig(key: string) {
  return workspace.getConfiguration().get(key);
}

export { configState };