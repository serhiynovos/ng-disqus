import { NgDisqusService } from './ng-disqus.service';
import { NgDisqusComponent } from './ng-disqus.component';
import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';

export const SHORTNAME = new InjectionToken<string>('SHORTNAME');

export function NgDisqusServiceFactory(shortname: string) {
  return new NgDisqusService(shortname);
}

@NgModule({
  declarations: [
    NgDisqusComponent
  ],
  exports: [
    NgDisqusComponent
  ]
})
export class NgDisqusModule {
  public static forRoot(shortName: string): ModuleWithProviders {
    return {
      ngModule: NgDisqusModule,
      providers: [
        { provide: SHORTNAME, useValue: shortName },
        {
          provide: NgDisqusService,
          useFactory: NgDisqusServiceFactory,
          deps: [SHORTNAME]
        }
      ]
    };
  }
}
