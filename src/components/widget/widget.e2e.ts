import { newE2EPage } from '@stencil/core/testing'

describe('widget', () => {
  it('renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<pt-widget></pt-widget>')
    const element = await page.find('pt-widget')
    expect(element).toHaveClass('hydrated')
  })

  it('renders changes to the name data', async () => {
    const page = await newE2EPage()

    await page.setContent('<pt-widget></pt-widget>')
    const component = await page.find('pt-widget')
    const element = await page.find('pt-widget >>> div')
    expect(element.textContent).toEqual(`Hello World`)

    component.setProperty('test', 'Ahoy')
    await page.waitForChanges()
    expect(element.textContent).toEqual(`Ahoy`)
  })
})
