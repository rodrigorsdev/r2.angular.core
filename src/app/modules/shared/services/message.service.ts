import { Injectable, TemplateRef } from '@angular/core';
import { MessageType } from '../components/message/message.component';

export interface MessageOptions {
  duration?: number;
  icon?: string;
  closable?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Array<{
    content: string | TemplateRef<any>,
    type: MessageType,
    options: MessageOptions
  }> = [];

  getMessages() {
    return this.messages;
  }

  show(content: string | TemplateRef<any>, type: MessageType = 'info', options: MessageOptions = {}) {
    const message = { content, type, options };
    this.messages.push(message);
    
    if (options.duration) {
      setTimeout(() => {
        this.remove(message);
      }, options.duration);
    }
  }

  remove(message: any) {
    const index = this.messages.indexOf(message);
    if (index > -1) {
      this.messages.splice(index, 1);
    }
  }

  clear() {
    this.messages = [];
  }

  // Métodos rápidos
  success(content: string | TemplateRef<any>, options?: MessageOptions) {
    this.show(content, 'success', { icon: 'fas fa-check-circle', ...options });
  }

  error(content: string | TemplateRef<any>, options?: MessageOptions) {
    this.show(content, 'error', { icon: 'fas fa-exclamation-circle', ...options });
  }

  warning(content: string | TemplateRef<any>, options?: MessageOptions) {
    this.show(content, 'warning', { icon: 'fas fa-exclamation-triangle', ...options });
  }

  info(content: string | TemplateRef<any>, options?: MessageOptions) {
    this.show(content, 'info', { icon: 'fas fa-info-circle', ...options });
  }
}