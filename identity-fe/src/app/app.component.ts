import { AppConfigService } from '@/services/app-config.service';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from 'common-lib/src/lib/components/notification/notification.component';
import { AppConfigurator } from "./layout/components/app.configurator";
import { LayoutService } from '@/layout/service/layout.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NotificationComponent, AppConfigurator],
  template: `
    <lib-notification></lib-notification>
        <main>
            <router-outlet></router-outlet>
        </main>
        <button class="layout-config-button config-link" (click)="layoutService.toggleConfigSidebar()">
            <i class="pi pi-cog"></i>
        </button>
        <app-configurator location="landing" />
    `
})
export class AppComponent {
  configService = inject(AppConfigService)
  layoutService: LayoutService = inject(LayoutService);

  constructor(){
    document.title = this.configService.getConfig().projectTitle;
    let favicon = document.querySelector("link[rel='icon']");
    favicon?.setAttribute("href",this.configService.getConfig().favicon);
  }
}
