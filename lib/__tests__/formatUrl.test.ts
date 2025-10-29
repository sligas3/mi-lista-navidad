import { formatUrl, isValidUrl } from '../formatUrl'

describe('formatUrl', () => {
  it('mantiene URLs cortas sin cambios', () => {
    const url = 'https://amazon.com/product'
    expect(formatUrl(url, 50)).toBe(url)
  })

  it('trunca URLs largas elegantemente', () => {
    const url = 'https://www.amazon.com/Very-Long-Product-Name-With-Many-Parameters?ref=123&tracking=456'
    const result = formatUrl(url, 40)
    expect(result.length).toBeLessThanOrEqual(43)
    expect(result).toContain('amazon.com')
  })
})

describe('isValidUrl', () => {
  it('valida URLs correctas', () => {
    expect(isValidUrl('https://example.com')).toBe(true)
  })

  it('rechaza URLs inválidas', () => {
    expect(isValidUrl('not a url')).toBe(false)
  })
})
