import { LayoutContainer } from './styles'

import { Header } from '../../components/Header'
import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header /> {/* Componente que vai ficar fixo */}
      <Outlet /> {/* Espaço para inserir o conteúdo específico da página */}
    </LayoutContainer>
  )
}
