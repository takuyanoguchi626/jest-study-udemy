import { useStateContext } from '../context/StateProvider'

const ContextA: React.FC = () => {
  const { toggle, setToggle } = useStateContext()

  return (
    <>
      <button
        data-testid="toggleChangeBtn"
        onClick={() => setToggle((toggle) => !toggle)}
      >
        change
      </button>
      <div>ContextA</div>
      <div data-testid="toggleA">{toggle ? 'true' : 'false'}</div>
    </>
  )
}

export default ContextA
