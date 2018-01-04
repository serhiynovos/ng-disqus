import { Injectable, Inject } from '@angular/core';
import { SHORTNAME } from './ng-disqus.module';

@Injectable()
export class NgDisqusService {
  constructor(
    @Inject(SHORTNAME)
    public shortname: string
  ) {

  }
}