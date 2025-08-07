import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

export type MessageType = 'error' | 'warning' | 'info' | 'success';

@Component({
  selector: 'app-message',
  template: `
    <div class="message" [class]="type" [ngClass]="{ 'with-icon': icon, 'closable': closable }">
      <div class="content">
        <i *ngIf="icon" class="icon {{icon}}"></i>
        <ng-container *ngIf="!isTemplate; else templateContent">
          {{ content }}
        </ng-container>
        <ng-template #templateContent>
          <ng-container *ngTemplateOutlet="contentTemplate || null"></ng-container>
        </ng-template>
      </div>
      <button *ngIf="closable" class="close-btn" (click)="onClose.emit()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `,
  styles: [`
    .message {
      position: relative;
      padding: 1rem 1.5rem;
      margin: 0.5rem 0;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      max-width: 100%;
      
      &.with-icon {
        padding-left: 3.5rem;
        
        .icon {
          position: absolute;
          left: 1.25rem;
          font-size: 1.25rem;
        }
      }
      
      &.closable {
        padding-right: 3rem;
      }
      
      .content {
        flex: 1;
      }
      
      .close-btn {
        background: none;
        border: none;
        padding: 0.25rem;
        margin-left: 0.5rem;
        cursor: pointer;
        color: inherit;
        opacity: 0.7;
        
        &:hover {
          opacity: 1;
        }
      }
      
      /* Tipos de mensagem */
      &.error {
        background-color: var(--error-bg);
        color: var(--error-text);
        border-left: 4px solid var(--error-color);
      }
      
      &.warning {
        background-color: var(--warning-bg);
        color: var(--warning-text);
        border-left: 4px solid var(--warning-color);
      }
      
      &.info {
        background-color: var(--info-bg);
        color: var(--info-text);
        border-left: 4px solid var(--info-color);
      }
      
      &.success {
        background-color: var(--success-bg);
        color: var(--success-text);
        border-left: 4px solid var(--success-color);
      }
    }
  `],
  standalone: false,
})
export class MessageComponent {
  @Input() type: MessageType = 'info';
  @Input() content: string = '';
  @Input() contentTemplate?: TemplateRef<any>;
  @Input() icon?: string;
  @Input() closable: boolean = true;

  @Output() onClose = new EventEmitter<void>();

  get isTemplate(): boolean {
    return this.contentTemplate !== undefined;
  }
}
