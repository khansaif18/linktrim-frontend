import './App.css'
import Layout from './components/Layout'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 '>
      <Navbar />
      <Layout />
    </div>
  )
}

export default App
