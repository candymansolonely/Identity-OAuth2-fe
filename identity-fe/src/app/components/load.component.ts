import { LoginService } from '@/services/login.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ValidatorForm } from 'common-lib/src/public-api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-load',
  imports: [ProgressSpinnerModule],
  template: `
    <div class="flex flex-col items-center justify-center h-screen">
      <p class="mb-5">Đang xử lý đăng nhập, vui lòng chờ...</p>
      <p-progress-spinner ariaLabel="loading" />
    </div>`
})
export class LoadComponent {

  private router = inject(Router);
  private loginService = inject(LoginService);

  ngOnInit(): void {
    this.onLogin();
  }

  redirectLoginMSA(returnURL: string) {
    this.loginService.getLoginURL({
      returnURL: returnURL,
      feDomain: origin
    },
      'text'
    ).subscribe(url => {
      console.log("Login URL:", url);
      window.location.href = url; // nếu muốn redirect
    });
  }

  onLogin() {
    const currentUrl = window.location.href;
    const returnUrlParams: ReturnUrlParams = this.parseReturnUrl(currentUrl);

    if (!returnUrlParams.token) {
      this.redirectLoginMSA(returnUrlParams.redirectUri as string);
      return;
    }
    console.log(returnUrlParams.returnURL);


    const payload = {
      token: returnUrlParams.token
    };
    this.loginService.login(payload).subscribe({
      next: (res) => {
        // Điều hướng về trang redirectUri
        window.location.href = returnUrlParams.returnURL as string;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  parseReturnUrl(fullUrl: string) {
    // Tách query của URL gốc
    const url = new URL(fullUrl);

    // get token
    const tokenEncoded = url.searchParams.get("token");
    const token = tokenEncoded;

    // other

    const returnUrlEncoded = url.searchParams.get("returnUrl") || url.searchParams.get("ReturnURL");
    if (!returnUrlEncoded) {
      throw new Error("ReturnURL not found");
    }

    // Decode ReturnURL
    const returnURL = decodeURIComponent(returnUrlEncoded);

    // Tách query trong returnURL
    const [path, queryString] = returnURL.split("?");

    const params = new URLSearchParams(queryString);

    // Lấy các biến
    const responseType = params.get("response_type") ?? "";
    const clientId = params.get("client_id") ?? "";
    const state = params.get("state") ?? "";
    const redirectUri = params.get("redirect_uri") ?? "";
    const scope = params.get("scope") ?? "";
    const codeChallenge = params.get("code_challenge") ?? "";
    const codeChallengeMethod = params.get("code_challenge_method") ?? "";
    const nonce = params.get("nonce") ?? "";

    return {
      returnURL,
      responseType,
      clientId,
      state,
      redirectUri,
      scope,
      codeChallenge,
      codeChallengeMethod,
      nonce,
      token
    };
  }
}

type ReturnUrlParams = {
  returnURL: string | '' | null,
  responseType: string | '' | null,
  clientId: string | '' | null,
  state: string | '' | null,
  redirectUri: string | '' | null,
  scope: string | '' | null,
  codeChallenge: string | '' | null,
  codeChallengeMethod: string | '' | null,
  nonce: string | '' | null,
  token: string | '' | null
}
