import { useCallback, useState } from 'preact/hooks'
import { Footer } from '../footer'
import { PostActions } from '../post-actions'
import { PostComments } from '../post-comments'
import { PostDetails } from '../post-details'
import { PostHero } from '../post-hero'
import { PostToc } from '../post-toc'
import { Separator } from '../separator'
import { TopNavBar } from '../top-nav-bar'

function PostContent() {
  const [isDetailsReady, setIsDetailsReady] = useState(false)

  return (
    <>
      <PostDetails
        onReady={useCallback(() => setIsDetailsReady(true), [])}
      ></PostDetails>
      {isDetailsReady && (
        <>
          <PostActions></PostActions>
          <Separator />
          <PostComments></PostComments>
          <Separator />
        </>
      )}
    </>
  )
}

export function PostPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <TopNavBar containerClassName='md:max-w-5xl h-16'></TopNavBar>
      <main className='max-w-screen overflow-x-hidden px-2'>
        <div className='mx-auto flex flex-col items-stretch text-[1.05rem] text-neutral-800 sm:text-[15px] md:max-w-5xl xl:w-full dark:text-neutral-300'>
          <PostHero></PostHero>
          <PostContent></PostContent>
        </div>
      </main>
      <Footer containerClassName='md:max-w-5xl py-8'></Footer>
      <PostToc></PostToc>
    </div>
  )
}
