import { Link } from '@tanstack/react-router'
import { HomeLayout } from 'fumadocs-ui/layouts/home'

export function NotFound() {
  return (
    <HomeLayout
      nav={{
        title: 'Tanstack Start',
      }}
      className='justify-center py-32 text-center'
    >
      <div className='flex flex-col items-center gap-4'>
        <h1 className='font-bold text-6xl text-fd-muted-foreground'>404</h1>
        <h2 className='font-semibold text-2xl'>Page Not Found</h2>
        <p className='max-w-md text-fd-muted-foreground'>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          to='/'
          className='mt-4 rounded-lg bg-fd-primary px-4 py-2 font-medium text-fd-primary-foreground text-sm transition-opacity hover:opacity-90'
        >
          Back to Home
        </Link>
      </div>
    </HomeLayout>
  )
}
