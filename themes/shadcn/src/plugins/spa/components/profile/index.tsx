import { Github, Mail, MapPin } from 'lucide-preact'
import { useProfileData } from './hooks'

export function Profile() {
  const { data: profile } = useProfileData()

  return (
    <div className='mx-auto w-full max-w-2xl px-4 py-6'>
      <div className='flex flex-col items-center gap-4 border-border border-b pb-6 text-center sm:flex-row sm:items-start sm:gap-6 sm:text-left'>
        <div className='shrink-0'>
          <div className='relative'>
            <img
              src={profile?.avatar}
              alt={profile?.nickname}
              className='h-20 w-20 rounded-full border-2 border-primary object-cover'
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src =
                  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNmM2Y0ZjYiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjOWNhM2FmIj4KPHBhdGggZD0iTTEyIDEyYzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNHptMCAyYy0yLjY3IDAtOCAxLjMzLTggNHYyaDE2di0yYzAtMi42Ny01LjMzLTQtOC00eiIvPgo8L3N2Zz4KPC9zdmc+'
              }}
            />
          </div>
        </div>
        <div className='flex-1'>
          <h2 className='mb-2 font-bold text-2xl text-foreground'>
            {profile?.nickname}
          </h2>
          {profile?.bio && (
            <p className='mb-4 text-muted-foreground text-sm leading-relaxed'>
              {profile?.bio}
            </p>
          )}
          <div className='flex flex-wrap items-center justify-center gap-4 sm:justify-start'>
            {profile?.socials?.map((s) => {
              if (s.name === 'github') {
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 text-primary text-sm transition-colors hover:text-primary/80'
                  >
                    <Github className='size-4' strokeWidth={1} />
                    <span>GitHub</span>
                  </a>
                )
              }
              if (s.name === 'website') {
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground'
                  >
                    <MapPin className='size-4' strokeWidth={1} />
                    <span>主页</span>
                  </a>
                )
              }
              if (s.name === 'rss') {
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground'
                  >
                    <Mail className='size-4' strokeWidth={1} />
                    <span>RSS</span>
                  </a>
                )
              }
              return null
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
