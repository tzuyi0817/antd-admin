import { App } from 'antd';
import { useEffect } from 'react';
import type { MessageInstance } from 'antd/es/message/interface';

let _message: MessageInstance | null = null;

export function setMessageApi(api: MessageInstance) {
  _message = api;
}

export function getMessage(): MessageInstance {
  if (!_message) {
    throw new Error('MessageInstance not initialized');
  }

  return _message;
}

export function MessageProvider() {
  const { message } = App.useApp();

  useEffect(() => {
    setMessageApi(message);
  }, [message]);

  return null;
}
