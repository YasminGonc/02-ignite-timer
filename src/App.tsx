import { ThemeProvider } from 'styled-components'
import { Button } from './components/Button/Button'

import { GlobalStyled } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="danger" />
      <Button variant="success" />
      <Button />

      <GlobalStyled />
    </ThemeProvider>
  )
}
