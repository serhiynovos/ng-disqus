<h1>Angular Disqus</h1>

## Installation

Install it with npm

```bash
$ npm install --save ng-disqus
```

## Usage

Import `DisqusModule` in the root module

```ts
import { NgDisqusModule } from 'ng-disqus';
@NgModule({
  imports: [
    // ...
    NgDisqusModule.forRoot('disqus_shortname')
  ]
})
```

The paramter `shortname` is the unique identifier for your website as registered on Disqus, make sure it is defined in your module.

Now you can add Disqus component

```ts
@Component({
  selector: 'any-component',
  template: `<ng-disqus [identifier]="pageId"></ng-disqus>`
})
export class AnyComponent {

  pageId = '/about';
}
```
