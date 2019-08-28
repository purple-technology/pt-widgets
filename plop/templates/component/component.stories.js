import { storiesOf } from '@storybook/html'

storiesOf('Components/TemplateComponent', module)
  .add('Default', () => `<pt-template-component></pt-template-component>`)
  .add(
    'With Input',
    () => `<pt-template-component test="John" class="xx"></pt-template-component>`,
  )
