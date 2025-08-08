import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserGetResponseDto } from '../../dtos/user-get-response.dto';

@Component({
    selector: 'app-user-form-modal',
    templateUrl: './user-form-modal.component.html',
    styleUrls: ['./user-form-modal.component.scss'],
    standalone: false,
})
export class UserFormModalComponent {
    @Input() data: UserGetResponseDto | null = null;
    @Output() close = new EventEmitter<boolean>();

    form: FormGroup;
    show = true;

    constructor(
        private fb: FormBuilder,
        private userService: UserService
    ) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            birthDate: ['', Validators.required]
        });
    }

    ngOnChanges(): void {
        if (this.data) {
            this.form.patchValue({
                name: this.data.name,
                email: this.data.email,
                birthDate: this.data.birthDate
            });
        } else {
            this.form.reset();
        }
    }

    save(): void {
        if (this.form.valid) {
            const data = this.form.value;

            const operation = this.data
                ? this.userService.update({ ...this.data, ...data })
                : this.userService.register(data);

            operation.subscribe({
                next: () => {
                    this.close.emit(true);
                },
                error: () => {
                    // Tratar erro
                }
            });
        }
    }

    closeModal(success: boolean): void {
        this.show = false;
        setTimeout(() => {
            this.close.emit(success);
        }, 300);
    }
}