import { BackToTop } from '../back-to-top'
import { Footer } from '../footer'
import { Separator } from '../separator'
import { TopNavBar } from '../top-nav-bar'
import { About } from './about'
import { ItemGroups } from './item-groups'
import { PostList } from './post-list'
import { ProfileCover } from './profile-cover'
import { ProfileHeader } from './profile-header'

export function HomePage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <TopNavBar sticky></TopNavBar>
      <main className='max-w-screen overflow-x-hidden px-2'>
        <div className='mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22'>
          <ProfileCover />

          <ProfileHeader />
          <Separator />

          <About />
          <Separator />

          <ItemGroups />
          <Separator />

          <PostList />
          <Separator />
        </div>
      </main>
      <Footer></Footer>
      <BackToTop></BackToTop>
    </div>
  )
}
