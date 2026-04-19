
import { Component } from '@angular/core';
import { LabelComponent } from '../../form/label/label.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { InputFieldComponent } from '../../form/input/input-field.component';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/api/auth.service';

@Component({
  selector: 'app-signin-form',
  imports: [
    LabelComponent,
    ButtonComponent,
    InputFieldComponent,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
],
  templateUrl: './signin-form.component.html',
  styles: ``
})
export class SigninFormComponent {

  showPassword = false;
  isChecked = false;

  email = '';
  password = '';

  protected errorSignIn: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly _authService: AuthService
  ) {}

  signInForm = new FormGroup({
    email: new FormControl('',{nonNullable: true,validators: [Validators.required, Validators.email]}),
    password: new FormControl('',{nonNullable: true,validators: [Validators.required]}),
  });

  get emailCtrl() {
    return this.signInForm.controls.email;
  }

  get passwordCtrl() {
    return this.signInForm.controls.password;
  }

  get emailInvalid() {
    return this.emailCtrl.invalid && (this.emailCtrl.touched || this.emailCtrl.dirty);
  }

  get passwordInvalid() {
    return this.passwordCtrl.invalid && (this.passwordCtrl.touched || this.passwordCtrl.dirty);
  }

  async onSubmit() {
    if (this.signInForm.valid) {
      const body = this.signInForm.getRawValue();
      const result = await this._authService.signIn({ email: body.email, password: body.password });
      
      if (result?.status === 200) {
        console.log("Sign-in successful:", result);
        this.router.navigate(['']);
      }

    } else {
      this.signInForm.markAllAsTouched();
      console.log("Form is invalid:", this.signInForm.valid);
      return;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignIn() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Remember Me:', this.isChecked);
  }
}
