import React from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from '.'

describe('Button', () => {
  it('should render button', () => {
    render(<Button>Button Test</Button>)

    expect(screen.getByText('Button Test')).toBeDefined()
  })
})
