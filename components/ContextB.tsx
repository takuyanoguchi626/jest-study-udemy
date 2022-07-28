import { useStateContext } from '../context/StateProvider'

const ContextB: React.FC = () => {
  const { toggle } = useStateContext()

  return (
    <>
      <div>ContextB</div>
      <div data-testid="toggleB">{toggle ? 'true' : 'false'}</div>
    </>
  )
}

export default ContextB
