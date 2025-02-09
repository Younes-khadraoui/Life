import ChillingPage from '../pages/ChillingPage'
import JournalsPage from '../pages/JournalsPage'
import TodoPage from '../pages/TodoPage'
import { Route, Routes } from 'react-router'

const MainLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<div></div>}/>
      <Route path="/todos" element={<TodoPage />} />
      <Route path="/journals" element={<JournalsPage />} />
      <Route path="/chilling" element={<ChillingPage />} />
      <Route path="*" element={<div className='p-6 text-red-500 text-xl font-semibold'>Are u lost ?</div>} />
    </Routes>
  )
}

export default MainLayout
