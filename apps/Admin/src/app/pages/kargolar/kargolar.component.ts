import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, resource, signal, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ODataModel } from '../../models/odata.model';
import { FlexiGridModule, FlexiGridService, StateModel } from 'flexi-grid';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { BreadCrumbModel } from '../../models/breadcrumb.model';
import BlankComponent from '../../components/blank/blank.component';

@Component({
  imports: [RouterLink, FlexiGridModule, BlankComponent],
  templateUrl: './kargolar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class KargolarComponent {


  result = resource({
    request: () => this.state(),
    loader:async () => {
      let endPoint = "https://localhost:7213/odata/kargolarim?$count=true";
      const odataEndPoint = this.#grid.getODataEndpoint(this.state());
      endPoint += "&" + odataEndPoint;
      const res = await lastValueFrom(this.#http.get<ODataModel<unknown[]>>(endPoint));
      return res;
    }
  });

  readonly data = computed(() => this.result.value()?.value ?? []);
  readonly total = computed(() => this.result.value()?.['@odata.count'] ?? 0);
  readonly loading = computed(() => this.result.isLoading());
  readonly state = signal<StateModel>(new StateModel());


  #http = inject(HttpClient);
  #grid = inject(FlexiGridService);
  #breadCrumb = inject(BreadcrumbService);

  constructor(){
    this.#breadCrumb.reset();
    this.#breadCrumb.add("Kargolarım","/kargolar","package_2");
  }

  dataStateChange(event:StateModel){
    this.state.set(event);
  }
}
