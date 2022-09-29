import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinuteAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'), // na sequência: o task tem que ser uma string, no mínimo 1 caracterer e se não cumprir isso você pode definir uma mensagem de validação
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo mínimo precisa ser de no máximo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
}) // dentro dos parênteses deve estar o formato em que os dados são retornado. Quando damos console.log em handleCreateNewCycle recebemos o retorno do tipo objeto: {tasks: 'content', minutesAmount: 20}

// interface NewCycleFormData {
//   task: string
//   minutesAmount: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // poderia fazer uma tipagem com interface, mas o zod tem um recurso de extrair a tipagem pelo schema que foi definido

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  /* pegar as informações de validação:
  - importar no useForm o formState
  - formState.errors devolve as mensagens de erro
  */

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)
    reset() // o reset só vai funcionar quando eu defini o defaultValues, que são os valores iniciais
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
          </datalist>

          <label htmlFor="minutesAmount">Durante</label>
          <MinuteAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', {
              valueAsNumber: true,
            })} /* nomear o input */
          />
          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
