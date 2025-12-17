import { describe, it, expect } from 'vitest'
import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../src/ui/App.jsx'

describe('App', () => {

  it('muestra la marca en el navbar', () => {
    render(<BrowserRouter><App /></BrowserRouter>)

    // Tomamos SOLO el <nav> y buscamos dentro
    const nav = screen.getByRole('navigation')
    expect(within(nav).getByText('Galería Online')).toBeInTheDocument()
  })

  it('muestra el link Obras', () => {
    render(<BrowserRouter><App /></BrowserRouter>)
    expect(screen.getByText('Obras')).toBeInTheDocument()
  })

  it('muestra el texto de bienvenida', () => {
    render(<BrowserRouter><App /></BrowserRouter>)
    expect(screen.getByText(/Bienvenido/i)).toBeInTheDocument()
  })

})

