import '@testing-library/jest-dom/extend-expect'
import { screen, render, cleanup } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { SWRConfig } from 'swr'
import CommentPage from '../pages/comment-page'

const handlers = [
  rest.get(
    'https://jsonplaceholder.typicode.com/comments/?_limit=10',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            postId: '1',
            id: '1',
            name: 'test name',
            email: 'test email',
            body: 'test body 1',
          },
          {
            postId: '2',
            id: '2',
            name: 'test name',
            email: 'test email',
            body: 'test body 2',
          },
        ])
      )
    }
  ),
]

const server = setupServer(
  rest.get(
    'https://jsonplaceholder.typicode.com/comments/?_limit=10',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            postId: '1',
            id: '1',
            name: 'test name',
            email: 'test email',
            body: 'test body 1',
          },
          {
            postId: '2',
            id: '2',
            name: 'test name',
            email: 'test email',
            body: 'test body 2',
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

describe('useSWRを使うコメントページのテスト', () => {
  it('useSWRでとってきたデータが正しくレンダリングされるかのテスト', async () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <CommentPage></CommentPage>
      </SWRConfig>
    )
    expect(await screen.findByText('1: test body 1')).toBeInTheDocument()
    expect(screen.getByText('2: test body 2')).toBeInTheDocument()
  })
  it('useSWRでデータが取れなかった時に正しくエラーがレンダリングされるか', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/comments/?_limit=10',
        (req, res, ctx) => {
          return res(ctx.status(400))
        }
      )
    )
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <CommentPage></CommentPage>
      </SWRConfig>
    )
    expect(await screen.findByText('Error!')).toBeInTheDocument()
  })
})
