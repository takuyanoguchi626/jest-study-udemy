import '@testing-library/jest-dom/extend-expect'
import { cleanup, render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { getPage, initTestHelpers } from 'next-page-tester'

initTestHelpers()

const server = setupServer(
  rest.get(
    'https://jsonplaceholder.typicode.com/todos/?_limit=10',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            userId: 3,
            id: 3,
            title: 'static task C',
            completed: true,
          },
          {
            userId: 4,
            id: 4,
            title: 'static task D',
            completed: false,
          },
        ])
      )
    }
  )
)
beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => {
  server.close()
})

describe('タスクページのテスト', () => {
  it('SSGでとってきたデータが正しく画面に描画されるか', async () => {
    const { page } = await getPage({
      route: '/task-page',
    })
    render(page)
    expect(await screen.findByText('todos page')).toBeInTheDocument()
    expect(screen.getByText('static task C')).toBeInTheDocument()
    expect(screen.getByText('static task D')).toBeInTheDocument()
  })
})
