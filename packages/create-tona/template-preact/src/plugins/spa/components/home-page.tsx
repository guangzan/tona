import { Button } from '@/components/ui/button'

export function HomePage() {
  return (
    <div class="mx-auto max-w-xl p-6">
      <h1 class="mb-4 font-semibold text-2xl leading-none tracking-tight">
        Home Page
      </h1>
      <Button
        onClick={() => {
          window.open('https://github.com/guangzan/tona', '_blank')
        }}
      >
        Github
      </Button>
    </div>
  )
}
