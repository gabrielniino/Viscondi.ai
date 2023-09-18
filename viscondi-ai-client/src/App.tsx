import { Github } from 'lucide-react'
import { Button } from "./components/ui/button"
import { Separator } from './components/ui/separator'
import { Textarea } from './components/ui/textarea'

export function App() {

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Header */}
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">Viscondi.ai</h1>

        <div className="flex items-center gap-3">
          <span className="text-small text-muted-foreground">
            Desenvolvido por Nino
          </span>

          <Separator orientation='vertical' className='h-6' />

          <Button variant={"outline"}>
            <Github className='w-4 h-4 mr-2' />
            Github
          </Button>
        </div>
      </div>

      {/* Main  */}
      <main className='flex-1 p-6 flex gap-6'>
        {/* Content  */}
        <div className='flex flex-col flex-1 gap-4'>
          {/* Text area */}
          <div className='grid grid-rows-2 gap-4 flex-1'>
            <Textarea
            className='resize-none'
              placeholder='Inclua o prompt para a IA...'
            />
            <Textarea
            className='resize-none'
              placeholder='Resultado gerado pela IA...'
              readOnly
            />
          </div>

          <p className='text-small text-muted-foreground'>
            Projeto <code className='text-yellow-400'>{'{Viscondi.ai}'}</code>
          </p>
        </div>
        {/* Aside  */}
        <aside className='w-80'></aside>
      </main>
    </div>
  )
}