import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, resource, signal, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ODataModel } from '../../models/odata.model';
import { FlexiGridModule, FlexiGridService, StateModel } from 'flexi-grid';

@Component({
  imports: [RouterLink, FlexiGridModule],
  templateUrl: './kargolar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class KargolarComponent {

  token = signal<string>("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEyZTdhNGI1LTQzYmYtNDAyYy1iNTdlLTJmZDEwNmVjMDY4OSIsIm5iZiI6MTc0MTM2ODg0MCwiZXhwIjoxNzQxNDU1MjQwLCJpc3MiOiJFbXJlIENhbiIsImF1ZCI6IkVtcmUgQ2FuIn0.nUOCnBn3DDpCJnHUiqHmHdTiNEqUAIr9mZC02Fi6DtW1ArF2PLUhdR3l6i1-BdpIGCwo5_Kf9ONbncRjuPP8HA");

  result = resource({
    request: () => this.state(),
    loader:async () => {

      let endPoint = "https://localhost:7213/odata/kargolarim?$count=true";
      const odataEndPoint = this.#grid.getODataEndpoint(this.state());
      endPoint += "&" + odataEndPoint;
      const res = await lastValueFrom(this.#http.get<ODataModel<any[]>>(endPoint,{
        headers: {"Authorization":"Bearer " + this.token()}
      }));
      return res;
    }
  });

  data = computed(() => this.result.value()?.value);
  total = computed(() => this.result.value()?.['@odata.count']);
  loading = computed(() => this.result.isLoading());
  state = signal<StateModel>(new StateModel());


  #http = inject(HttpClient);
  #grid = inject(FlexiGridService);

  dataStateChange(event:StateModel){
    this.state.set(event);
  }
}
