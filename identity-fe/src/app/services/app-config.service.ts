import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { IAppConfig, INIT_APP_CONFIG_MODEL } from "@/models/app-config.model";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: IAppConfig = INIT_APP_CONFIG_MODEL;
  private options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      DataType: 'application/json',
    },
  };

  private http = inject(HttpClient);
  load(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `../../assets/config/${environment.env}.json`,
          this.options
        )
        .subscribe({
          next: (data: any) => {
            this.setConfig(data);
            resolve(true);
          },
          error: (error) => {
            console.error('Error loading config:', error || 'Server Error');
            reject(false);
          },
        });
    });
  }
  private setConfig = (data: any): void => {
    //common level 0 props
    Object.assign(this.config, data);

    // other
  };

  getConfig = () => this.config;
}
