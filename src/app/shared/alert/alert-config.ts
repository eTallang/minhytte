import { AlertSeverity } from './alert-severity';

export class AlertConfig {
  severity: AlertSeverity = 'error';
  duration = 5000;
  closeable = true;
  action: string | undefined;
}

export class DefualtAlertConfig extends AlertConfig {
  title?: string;
  content?: string;
}
