import { createFileRoute, Link } from '@tanstack/react-router'
import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { baseOptions } from '@/lib/layout.shared'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className='flex flex-1 flex-col items-center justify-center text-center'>
        <h1 className='mb-4 font-medium text-xl'>
          Fumadocs on Tanstack Start.
        </h1>
        <Link
          to='/docs/$'
          params={{
            _splat: '',
          }}
          className='mx-auto rounded-lg bg-fd-primary px-3 py-2 font-medium text-fd-primary-foreground text-sm'
        >
          Open Docs
        </Link>
      </div>
    </HomeLayout>
  )
}
