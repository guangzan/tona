import {
  CircleCheckIcon,
  InfoIcon,
  OctagonXIcon,
  TriangleAlertIcon,
  XIcon,
} from 'lucide-preact'
import { Toaster as Sonner, type ToasterProps } from 'tona-sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CircleCheckIcon />,
        info: <InfoIcon />,
        warning: <TriangleAlertIcon />,
        error: <OctagonXIcon />,
        close: <XIcon />,
      }}
      style={
        {
          '--sonner-bg': 'var(--popover)',
          '--sonner-text': 'var(--popover-foreground)',
          '--sonner-text-muted': 'var(--muted-foreground)',
          '--sonner-border': 'var(--border)',
          '--sonner-radius': 'var(--radius)',
          '--sonner-action-bg': 'var(--primary)',
          '--sonner-action-text': 'var(--primary-foreground)',
        } as Record<string, string>
      }
      {...props}
    />
  )
}

export { Toaster }
