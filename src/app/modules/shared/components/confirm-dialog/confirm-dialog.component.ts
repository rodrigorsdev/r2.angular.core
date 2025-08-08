import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
    standalone: false,
})
export class ConfirmDialogComponent {
    @Input() title = 'Confirmar Ação';
    @Input() message = 'Tem certeza que deseja continuar?';
    @Output() confirm = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    visible = true;

    onConfirm(): void {
        this.visible = false;
        this.confirm.emit();
    }

    onCancel(): void {
        this.visible = false;
        this.cancel.emit();
    }
}