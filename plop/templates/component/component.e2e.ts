import { newE2EPage } from '@stencil/core/testing'

describe('template-component', () => {
  it('renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<pt-template-component></pt-template-component>')
    const element = await page.find('pt-template-component')
    expect(element).toHaveClass('hydrated')
  })

  it('renders changes to the name data', async () => {
    const page = await newE2EPage()

    await page.setContent('<pt-template-component></pt-template-component>')
    const component = await page.find('pt-template-component')
    const element = await page.find('pt-template-component >>> div')
    expect(element.textContent).toEqual(`Hello World`)

    component.setProperty('test', 'Ahoy')
    await page.waitForChanges()
    expect(element.textContent).toEqual(`Ahoy`)
  })
})
