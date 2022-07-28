import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContextA from '../components/ContextA'
import ContextB from '../components/ContextB'
import { StateProvider } from '../context/StateProvider'

describe('Contextのテスト', () => {
  it('useContextで状態管理してるtoggleが正しく変化するか', () => {
    render(
      <StateProvider>
        <ContextA></ContextA>
        <ContextB></ContextB>
      </StateProvider>
    )
    expect(screen.getByTestId('toggleA').textContent).toBe('false')
    expect(screen.getByTestId('toggleB').textContent).toBe('false')
    userEvent.click(screen.getByTestId('toggleChangeBtn'))
    expect(screen.getByTestId('toggleA').textContent).toBe('true')
    expect(screen.getByTestId('toggleB').textContent).toBe('true')
  })
})
