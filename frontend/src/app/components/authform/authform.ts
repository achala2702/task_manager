import { Component, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

export interface TAuthForm {
  username: string;
  password: string;
}

@Component({
  selector: 'app-authform',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './authform.html',
  styleUrl: './authform.scss',
})
export class Authform implements OnInit {

  mode = input<'login' | 'register'>('login');
  authForm!: FormGroup
  submitForm = output<TAuthForm>()

  constructor(private fb: FormBuilder) {}

 ngOnInit(): void {
    this.buildForm();
  }

    private buildForm() {
    const isRegister = this.mode() === 'register';

    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      ...(isRegister && {
        confirmPassword: ['', [Validators.required, this.passwordMatchValidator.bind(this)]],
      }),
    });
  }

  private passwordMatchValidator(control: any) {
    const password = this.authForm?.get('password')?.value;
    return control.value === password ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.submitForm.emit(this.authForm.value);
    }
  }
}
