import { storiesOf } from '@storybook/html'

storiesOf('Components/Widget Page', module)
  .add(
    'Default',
    () => `
    <style>
      .widgets {
        display: flex;
        width: 60%;
        border: 1px solid #efefef;
        margin: 5rem auto;
      }
      .widgets pt-widget-page {
        flex: 1;
        padding: 1rem;
      }
    </style>
    <div class="widgets">
      <pt-widget-page strategy="n495" height="100"></pt-widget>
    </div>`,
  )
