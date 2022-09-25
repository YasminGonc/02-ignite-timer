import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'

import { History } from './pages/History'
import { Home } from './pages/Home'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        {/* path é o endereço que a pessoa está acessando, a home é a página inicial, basta colocar /
        Element é a rota que eu quero carregar */}
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
