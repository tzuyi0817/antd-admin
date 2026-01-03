import { useEffect } from 'react';
import { App } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';

export let globalMessage: MessageInstance;

export function setMessageApi(api: MessageInstance) {
  globalMessage = api;
}

export function MessageProvider() {
  const { message } = App.useApp();

  useEffect(() => {
    setMessageApi(message);
  }, [message]);

  return null;
}
