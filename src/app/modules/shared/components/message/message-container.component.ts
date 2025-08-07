import { Component, TemplateRef } from "@angular/core";
import { MessageService } from "../../services/message.service";

@Component({
  selector: 'app-message-container',
  template: `
    <div class="message-container">
      @for(msg of messageService.getMessages();track msg){
      <app-message
        [type]="msg.type"
        [content]="getContent(msg.content)"
        [contentTemplate]="getContentTemplate(msg.content)"
        [icon]="msg.options.icon"
        [closable]="msg.options.closable !== false"
        (onClose)="messageService.remove(msg)">
    </app-message>
      }
    </div>
  `,
  styles: [`
    .message-container {
     position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      max-width: 350px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  `],
  standalone: false,
})
export class MessageContainerComponent {
  constructor(public messageService: MessageService) { }

  getContent(content: string | TemplateRef<any>): string {
    return this.isTemplateRef(content) ? '' : content;
  }

  getContentTemplate(content: string | TemplateRef<any>): TemplateRef<any> | undefined {
    return this.isTemplateRef(content) ? content : undefined;
  }

  private isTemplateRef(content: any): content is TemplateRef<any> {
    return content instanceof TemplateRef;
  }
}