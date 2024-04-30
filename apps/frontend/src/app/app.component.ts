import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiDialogModule,
  TuiRootModule,
} from '@taiga-ui/core';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { distinctUntilChanged, map, of } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    NgIf,
    AsyncPipe,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_RUSSIAN_LANGUAGE),
    },
  ],
})
export class AppComponent {
  protected readonly router = inject(Router);

  protected readonly isLanding$ = this.router.events.pipe(
    map(() => this.router.routerState.snapshot.url === '/'),
    distinctUntilChanged()
  );
}
