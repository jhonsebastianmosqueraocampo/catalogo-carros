describe('Catálogo de vehículos', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('muestra los 10 vehículos disponibles al cargar', () => {
    cy.contains('h4', 'Catálogo de vehículos').should('be.visible')
    cy.contains('10 de 10 vehículos disponibles').should('be.visible')
    cy.get('[data-cy="car-card"]').should('have.length', 10)
  })

  it('filtra por texto de búsqueda', () => {
    cy.get('[data-cy="filter-search"]').type('Mazda')
    cy.get('[data-cy="car-card"]').should('have.length', 1)
    cy.contains('[data-cy="car-card"]', 'Mazda CX-5').should('be.visible')
  })

  it('filtra por marca', () => {
    cy.get('[data-cy="filter-brand"]').click()
    cy.get('[data-cy="brand-option-Toyota"]').click()
    cy.get('[data-cy="car-card"]').should('have.length', 1)
    cy.contains('[data-cy="car-card"]', 'Toyota Corolla').should('be.visible')
  })

  it('filtra por tipo de vehículo', () => {
    cy.get('[data-cy="filter-type"]').click()
    cy.get('[data-cy="type-option-SUV"]').click()
    cy.get('[data-cy="car-card"]').should('have.length', 3)
  })

  it('combina búsqueda y filtro de tipo', () => {
    // Ford Ranger y Ford F-150 son ambos Pickup; "F-150" acota a un único resultado.
    cy.get('[data-cy="filter-type"]').click()
    cy.get('[data-cy="type-option-Pickup"]').click()
    cy.get('[data-cy="car-card"]').should('have.length', 2)

    cy.get('[data-cy="filter-search"]').type('F-150')
    cy.get('[data-cy="car-card"]').should('have.length', 1)
    cy.contains('[data-cy="car-card"]', 'Ford F-150').should('be.visible')
  })

  it('muestra un mensaje cuando no hay resultados', () => {
    cy.get('[data-cy="filter-search"]').type('Ferrari')
    cy.contains('No encontramos vehículos con esos filtros.').should('be.visible')
    cy.get('[data-cy="car-card"]').should('not.exist')
  })

  it('limpia los filtros y restaura el catálogo completo', () => {
    cy.get('[data-cy="filter-search"]').type('Mazda')
    cy.get('[data-cy="car-card"]').should('have.length', 1)

    cy.get('[data-cy="reset-filters"]').click()

    cy.get('[data-cy="filter-search"]').should('have.value', '')
    cy.get('[data-cy="car-card"]').should('have.length', 10)
  })
})
