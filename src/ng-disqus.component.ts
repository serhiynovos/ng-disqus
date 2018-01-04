import { NgDisqusService } from './ng-disqus.service';
import {
  Component,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'ng-disqus',
  template: `
  <div id="disqus_thread"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgDisqusComponent implements OnChanges, OnDestroy {
  /** DISQUS options */
  @Input() url: string;
  @Input() identifier: string;
  @Input() title: string;
  @Input() category: string;
  @Input() language: string;

  /** DISQUS events */
  @Output() newComment = new EventEmitter<any>(true);
  @Output() ready = new EventEmitter<any>(true);
  @Output() paginate = new EventEmitter<any>(true);

  constructor(
    private disqusService: NgDisqusService
  ) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (!window['DISQUS']) {
      this.createDisqusScript();
    } else {
      this.reset();
    }
  }

  ngOnDestroy() {
    window['DISQUS'] = undefined;
    window['disqus_config'] = undefined;
  }

  private createDisqusScript() {
    window['disqus_config'] = this.disqus_config;
    const d = document, s = d.createElement('script');
    s.src = `//${this.disqusService.shortname}.disqus.com/embed.js`;
    s.setAttribute('data-timestamp', (new Date()).toISOString());
    (d.head || d.body).appendChild(s);
  }

  private reset() {
    window['DISQUS'].reset({
      reload: true,
      config: this.disqus_config
    });
  }

  get disqus_config() {
    const self = this;
    return function () {
      this.page.identifier = self.identifier;
      this.page.url = self.url;
      this.page.title = self.title;
      this.category_id = self.category;
      this.language = self.language;

      /* Available callbacks are afterRender, onInit, onNewComment, onPaginate, onReady, preData, preInit, preReset */
      this.callbacks.onNewComment = [(e) => {
        self.newComment.emit(e);
      }];

      this.callbacks.onReady = [(e) => {
        self.ready.emit(e);
      }];

      this.callbacks.onPaginate = [(e) => {
        self.paginate.emit(e);
      }];
    };
  }
}
