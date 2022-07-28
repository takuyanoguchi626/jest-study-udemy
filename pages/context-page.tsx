import ContextA from '../components/ContextA'
import ContextB from '../components/ContextB'
import Layout from '../components/Layout'
import { StateProvider } from '../context/StateProvider'

const ContextPage: React.FC = () => {
  return (
    <Layout title="context">
      <p className="text-4xl">context page</p>
      <StateProvider>
        <ContextA></ContextA>
        <ContextB></ContextB>
      </StateProvider>
    </Layout>
  )
}
export default ContextPage
