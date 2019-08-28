import {Component, Prop, h} from '@stencil/core'
import classNames from 'classnames/dedupe'

@Component({
  tag: 'pt-template-component',
  styleUrl: 'template-component.styl',
  //shadow: true,
})
export class TemplateComponent {

  @Prop() class: string
  @Prop() test: string = 'Hello World'

  render() {
    const className = classNames(
      'pt-template-component',
      {
        'my-class': true,
      },
      this.class && this.class.replace('hydrated', '')
    )
    return <div class={className}>{this.test}</div>
  }
  
}
