describe('Ficha de detalle de vehículo', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('navega desde el catálogo a la ficha del vehículo', () => {
    cy.contains('[data-cy="car-card"]', 'Mazda CX-5').click()
    cy.url().should('include', '/carro/mazda-cx5-2024')
    cy.contains('h4', 'Mazda CX-5').should('be.visible')
  })

  it('muestra la ficha técnica completa', () => {
    cy.visit('/carro/mazda-cx5-2024')
    cy.contains('Ficha técnica').should('be.visible')
    cy.contains('2.5L 4 cilindros').should('be.visible')
    cy.contains('187 hp').should('be.visible')
    cy.contains('Automática').should('be.visible')
    cy.contains('Rojo Soul').should('be.visible')
  })

  it('cambia la imagen principal al hacer clic en una miniatura', () => {
    cy.visit('/carro/mazda-cx5-2024')
    cy.get('[data-cy="gallery-thumb"]').eq(1).click()
    cy.get('[data-cy="gallery-thumb"]').eq(1).should('have.css', 'opacity', '1')
  })

  it('agrega el vehículo al carrito desde la ficha de detalle', () => {
    cy.visit('/carro/mazda-cx5-2024')
    cy.get('[data-cy="detail-add-to-cart"]').click()
    cy.contains('Mazda CX-5 agregado al carrito.').should('be.visible')
    cy.get('[data-cy="cart-badge"] .MuiBadge-badge').should('contain.text', '1')
  })

  it('redirige al catálogo si el vehículo no existe', () => {
    cy.visit('/carro/no-existe')
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
  })
})
