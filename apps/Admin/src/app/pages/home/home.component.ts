import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { BreadCrumbModel } from '../../models/breadcrumb.model';
import BlankComponent from '../../components/blank/blank.component';

@Component({
  imports: [BlankComponent],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomeComponent {
    #breadCrumb = inject(BreadcrumbService);

    constructor(){
      const breadCrumbs: BreadCrumbModel[] = [
        {
          name:"Ana Sayfa",
          routerLink: "/",
          icon: "home"
        }
      ];

      this.#breadCrumb.data.set(breadCrumbs);
    }

}
