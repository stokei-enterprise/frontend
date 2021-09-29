import React from 'react'
import { render, screen } from '@testing-library/react'
import { Badge } from '.'

describe('Badge', () => {
  it('should render badge', () => {
    render(<Badge title='Badge Test' />)

    expect(screen.getByText('Badge Test')).toBeDefined()
  })
})
