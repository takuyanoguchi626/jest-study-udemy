import axios from 'axios'
import { GetStaticProps } from 'next'
import useSWR from 'swr'
import Layout from '../components/Layout'
import { getAllTasksData } from '../lib/fetch'
import { TASK } from '../types/Types'

interface STATICPROPS {
  staticTasks: TASK[]
}

const axiosFetcher = async () => {
  const result = await axios.get<TASK[]>(
    'https://jsonplaceholder.typicode.com/todos/?_limit=10'
  )
  return result.data
}

const TaskPage: React.FC<STATICPROPS> = ({ staticTasks }) => {
  const { data: tasks, error } = useSWR('todosFetch', axiosFetcher, {
    fallbackData: staticTasks,
    revalidateOnMount: true,
  })

  if (error) return <span>Eror!</span>

  return (
    <Layout title="todos">
      <p className="text-4xl">todos page</p>
      <ul>
        {tasks &&
          tasks.map((task) => {
            return (
              <li key={task.id}>
                {task.id}
                {': '}
                <span>{task.title}</span>
              </li>
            )
          })}
      </ul>
    </Layout>
  )
}
export default TaskPage

export const getStaticProps: GetStaticProps = async () => {
  const staticTasks = await getAllTasksData()
  return {
    props: { staticTasks },
  }
}
