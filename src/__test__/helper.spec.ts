import * as helper from '../helper'

describe('Helpers', () => {
  const dir = process.cwd()

  it('should return template path if [function, ts]', () => {
    expect(helper.getTemplate(true, true)).toEqual(
      `${dir}/src/templates/web/component.tsx.function.hbs`
    )
  })

  it('should return template path if [function, js]', () => {
    expect(helper.getTemplate(true, false)).toEqual(
      `${dir}/src/templates/web/component.js.function.hbs`
    )
  })

  it('should return template path if [class, ts]', () => {
    expect(helper.getTemplate(false, true)).toEqual(
      `${dir}/src/templates/web/component.tsx.class.hbs`
    )
  })

  it('should return template path if [class, js]', () => {
    expect(helper.getTemplate(false, false)).toEqual(
      `${dir}/src/templates/web/component.js.class.hbs`
    )
  })
})
