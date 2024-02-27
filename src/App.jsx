import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DynamicForm } from './components/FormularioDinamico.jsx'


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DynamicForm/>} />
      </Routes>
    </BrowserRouter>
  )
}
