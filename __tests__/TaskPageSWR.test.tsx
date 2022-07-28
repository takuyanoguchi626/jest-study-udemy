import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup, findByText } from '@testing-library/react'
import { SWRConfig } from 'swr'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import TaskPage from '../pages/task-page'
import { TASK } from '../types/Types'

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
            title: 'task A',
            completed: false,
          },
          {
            userId: 4,
            id: 4,
            title: 'task B',
            completed: true,
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

describe('タスクページのSWRのテスト', () => {
  let staticProps: TASK[]
  staticProps = [
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
  ]
  it('SSGのデータが描画された後にSWRのデータで上書きされるか', async () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <TaskPage staticTasks={staticProps}></TaskPage>
      </SWRConfig>
    )
    expect(await screen.findByText('static task C')).toBeInTheDocument()
    expect(screen.getByText('static task D')).toBeInTheDocument()
    expect(await screen.findByText('task A')).toBeInTheDocument()
    expect(screen.getByText('task B')).toBeInTheDocument()
  })
  it('エラーの時、正しくエラーメッセージが表示されるか', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/todos/?_limit=10',
        (req, res, ctx) => {
          return res(ctx.status(400))
        }
      )
    )
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <TaskPage staticTasks={staticProps}></TaskPage>
      </SWRConfig>
    )
    expect(await screen.findByText('Error!')).toBeInTheDocument()
  })
})
