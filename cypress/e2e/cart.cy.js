describe('Carrito de compras', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('muestra el carrito vacío por defecto', () => {
    cy.get('[data-cy="cart-button"]').click()
    cy.contains('Tu carrito está vacío').should('be.visible')
    cy.contains('Ir al catálogo').should('be.visible')
  })

  it('agrega un vehículo desde el catálogo y actualiza el badge', () => {
    cy.contains('[data-cy="car-card"]', 'Mazda CX-5').within(() => {
      cy.get('[data-cy="add-to-cart-btn"]').click()
    })
    cy.get('[data-cy="cart-badge"] .MuiBadge-badge').should('contain.text', '1')

    cy.get('[data-cy="cart-button"]').click()
    cy.contains('Tu carrito').should('be.visible')
    cy.get('[data-cy="cart-item"]').should('have.length', 1)
    cy.contains('[data-cy="cart-item"]', 'Mazda CX-5').should('be.visible')
  })

  it('acumula cantidad al agregar el mismo vehículo dos veces', () => {
    cy.contains('[data-cy="car-card"]', 'Mazda CX-5').within(() => {
      cy.get('[data-cy="add-to-cart-btn"]').click()
      cy.get('[data-cy="add-to-cart-btn"]').click()
    })
    cy.get('[data-cy="cart-badge"] .MuiBadge-badge').should('contain.text', '2')

    cy.get('[data-cy="cart-button"]').click()
    cy.get('[data-cy="cart-item"]').should('have.length', 1)
  })

  it('incrementa, decrementa y quita productos, recalculando el total', () => {
    cy.contains('[data-cy="car-card"]', 'Mazda CX-5').within(() => {
      cy.get('[data-cy="add-to-cart-btn"]').click()
    })
    cy.contains('[data-cy="car-card"]', 'Toyota Corolla').within(() => {
      cy.get('[data-cy="add-to-cart-btn"]').click()
    })
    cy.get('[data-cy="cart-button"]').click()

    // Mazda: $145.000.000 + Toyota: $98.000.000 = $243.000.000
    cy.get('[data-cy="cart-total"]').should('contain.text', '243.000.000')

    cy.contains('[data-cy="cart-item"]', 'Mazda CX-5').within(() => {
      cy.get('[aria-label="Aumentar cantidad"]').click()
    })
    // 2x Mazda ($290M) + 1x Toyota ($98M) = $388.000.000
    cy.get('[data-cy="cart-total"]').should('contain.text', '388.000.000')

    cy.contains('[data-cy="cart-item"]', 'Toyota Corolla').within(() => {
      cy.get('[aria-label="Quitar"]').click()
    })
    cy.get('[data-cy="cart-item"]').should('have.length', 1)
    cy.get('[data-cy="cart-total"]').should('contain.text', '290.000.000')
  })

  it('no permite bajar la cantidad de 1', () => {
    cy.contains('[data-cy="car-card"]', 'Mazda CX-5').within(() => {
      cy.get('[data-cy="add-to-cart-btn"]').click()
    })
    cy.get('[data-cy="cart-button"]').click()
    cy.contains('[data-cy="cart-item"]', 'Mazda CX-5').within(() => {
      cy.get('[aria-label="Disminuir cantidad"]').should('be.disabled')
    })
  })

  it('completa el checkout simulado y vacía el carrito', () => {
    cy.contains('[data-cy="car-card"]', 'Mazda CX-5').within(() => {
      cy.get('[data-cy="add-to-cart-btn"]').click()
    })
    cy.get('[data-cy="cart-button"]').click()
    cy.get('[data-cy="checkout-btn"]').click()

    cy.contains('¡Pedido simulado con éxito!').should('be.visible')

    cy.contains('Volver al catálogo').click()
    cy.contains('h4', 'Catálogo de vehículos').should('be.visible')

    cy.get('[data-cy="cart-button"]').click()
    cy.contains('Tu carrito está vacío').should('be.visible')
  })

  it('persiste el carrito entre recargas de página', () => {
    cy.contains('[data-cy="car-card"]', 'Mazda CX-5').within(() => {
      cy.get('[data-cy="add-to-cart-btn"]').click()
    })
    cy.reload()
    cy.get('[data-cy="cart-badge"] .MuiBadge-badge').should('contain.text', '1')
  })
})
