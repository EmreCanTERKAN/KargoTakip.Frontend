import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { DatePipe } from '@angular/common';

@Component({
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export default class LayoutComponent {
  breadcrumbs = computed(() => this.#breadCrumb.data());
  time = signal<string>("");

  #breadCrumb = inject(BreadcrumbService);
  #date = inject(DatePipe);

  constructor(){
    setInterval(() => {
      this.time.set(this.#date.transform(new Date(), "dd.MM.yyyy HH:mm:ss")!);
    },1000)
  }
}
