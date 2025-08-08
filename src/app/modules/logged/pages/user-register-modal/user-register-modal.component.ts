import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { UserGetResponseDto } from "../../dtos/user-get-response.dto";

@Component({
    selector: 'app-user-register-modal',
    templateUrl: './user-register-modal.component.html',
    styleUrls: ['./user-register-modal.component.scss'],
    standalone: false,
})
export class UserRegisterModalComponent {

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