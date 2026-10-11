import '@testing-library/jest-dom/vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Button from '../src/components/Button'
import Input from '../src/components/Input'

describe('Button', () => {
  it('renders its children with the primary style by default', () => {
    render(<Button>Save medication</Button>)

    expect(screen.getByRole('button', { name: 'Save medication' }))
      .toHaveClass('clay-button-primary')
  })

  it('uses the secondary style and calls onClick', () => {
    const onClick = vi.fn()
    render(<Button variant="secondary" onClick={onClick}>Cancel</Button>)

    const button = screen.getByRole('button', { name: 'Cancel' })
    fireEvent.click(button)

    expect(button).toHaveClass('clay-button-secondary')
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick while disabled', () => {
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Save</Button>)

    const button = screen.getByRole('button', { name: 'Save' })
    fireEvent.click(button)

    expect(button).toBeDisabled()
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('Input', () => {
  it('renders the configured input and required indicator', () => {
    render(
      <Input
        label="Medication name"
        placeholder="Enter a name"
        value="Aspirin"
        onChange={() => {}}
        required
      />,
    )

    expect(screen.getByText('Medication name')).toBeInTheDocument()
    expect(screen.getByText('*')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter a name')).toHaveValue('Aspirin')
    expect(screen.getByPlaceholderText('Enter a name')).toBeRequired()
  })
})
