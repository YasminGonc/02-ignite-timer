import { differenceInSeconds } from 'date-fns'
import { useEffect, useState } from 'react'
import { CountDownContainer, Separator } from './styles'

export function Countdown() {
  const [amountSecondsPast, setAmountSecondsPast] = useState(0)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )

          setAmountSecondsPast(totalSeconds)

          clearInterval(interval)
        } else {
          setAmountSecondsPast(secondsDifference)

          document.title = `Ignite timer`
        }
      }, 1000)
    }

    return () => {
      // esse retorno vai servir para "resetar" o ciclo anterior, caso eu insira um novo ciclo
      clearInterval(interval) // essa função vem do setInterval, é uma função nativa
    }
  }, [activeCycle, totalSeconds, activeCycleId])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}