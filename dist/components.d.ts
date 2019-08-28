/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from './stencil.core';


export namespace Components {
  interface PtWidget {
    'class': string;
    'height': string;
    'strategy': string;
  }
}

declare global {


  interface HTMLPtWidgetElement extends Components.PtWidget, HTMLStencilElement {}
  var HTMLPtWidgetElement: {
    prototype: HTMLPtWidgetElement;
    new (): HTMLPtWidgetElement;
  };
  interface HTMLElementTagNameMap {
    'pt-widget': HTMLPtWidgetElement;
  }
}

declare namespace LocalJSX {
  interface PtWidget extends JSXBase.HTMLAttributes<HTMLPtWidgetElement> {
    'class'?: string;
    'height'?: string;
    'strategy'?: string;
  }

  interface IntrinsicElements {
    'pt-widget': PtWidget;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


