import { LoginService } from '@/services/login.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService, ValidatorForm } from 'common-lib/src/public-api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
@Component({
  selector: 'app-login',
  imports: [
    CommonModule, ReactiveFormsModule, InputTextModule, PasswordModule, FormsModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private loginService = inject(LoginService);
  private http = inject(HttpClient);
  private notificationService = inject(NotificationService);



  loginForm!: FormGroup;
  loading = false;
  error = '';
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: [null],
      password: [null]
    })
  }
  onLogin() {
    let valid = ValidatorForm(this.loginForm, true);
    if (!valid) {
      this.notificationService.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    this.loading = true;

    const payload = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    const currentUrl = window.location.href;
    // Tách query string từ URL hiện tại
    const queryString = currentUrl.split('?')[1];
    const queryStringDecode = decodeURIComponent(queryString);
    // const queryStringDecodeTwice = decodeURIComponent(queryString);
    const params = new URLSearchParams(queryStringDecode);
    // Lấy giá trị redirect_uri (đã mã hóa)
    const redirectUri = params.get('redirect_uri');
    console.log(redirectUri);
    if (!redirectUri) {
      console.error("URL không hợp lệ!")
      return;
    }
    this.loginService.login(payload).subscribe({
      next: (res) => {
        // Điều hướng về trang redirectUri
        if (redirectUri) {
          window.location.href = redirectUri;
        }
      },
      error: (err) => {
        console.log(err);
      },
    }).add(() => (this.loading = false));
  }
}


