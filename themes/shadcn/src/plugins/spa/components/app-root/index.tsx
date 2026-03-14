import { Toaster } from '../../../../components/ui/sonner'
import { AvatarContext } from '../../context/avatar-context'
import { Page } from '../page'
import 'tona-sonner/dist/style.css'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useAvatar } from '../../hooks/use-avatar'

function PageWrapper() {
  const avatar = useAvatar()

  return (
    <TooltipProvider>
      <AvatarContext.Provider value={avatar}>
        <Page />
      </AvatarContext.Provider>
    </TooltipProvider>
  )
}

export function AppRoot() {
  return (
    <>
      <PageWrapper />
      <Toaster />
    </>
  )
}
