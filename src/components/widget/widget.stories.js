import { storiesOf } from '@storybook/html'

storiesOf('Components/Widget', module)
  .add(
    'Default',
    () => `
    <style>
      .widgets {
        display: flex;
        width: 60%;
        border: 1px solid #efefef;
        border-radius: 1rem;
        box-shadow: 5px 5px 15px rgba(0,0,0,.05);
        margin: 5rem auto;
      }
      .widgets pt-widget {
        flex: 1;
        padding: 1rem 2rem;
        border-left: 1px solid #efefef;
      }
      .widgets .sparkline--tooltip {
          padding: 0.5rem 1rem;
          border-radius: 3px;
      }
    </style>
    <div class="widgets">
      <pt-widget strategy="n367" height="100"></pt-widget>
      <pt-widget strategy="n495" height="100"></pt-widget>
    </div>`,
  )
