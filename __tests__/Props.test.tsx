import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Post from '../components/Post'
import { POST } from '../types/Types'

describe('ポストコンポーネントのテスト', () => {
  let dummyProps: POST
  //befoerEachにすることでitごとに更新される.
  beforeEach(() => {
    dummyProps = {
      userId: 1,
      id: 1,
      title: 'dummy title 1',
      body: 'dummy body 1',
    }
  })
  it('ポストコンポーネントで正しくpropsが渡される', async () => {
    render(<Post {...dummyProps}></Post>)
    expect(await screen.findByText(dummyProps.id)).toBeInTheDocument()
    expect(await screen.findByText(dummyProps.title)).toBeInTheDocument()
  })
})
