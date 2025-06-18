import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast 
            key={id} 
            className="mb-2 last:mb-0"
            {...props}
          >
            <div className="grid gap-1 flex-1">
              {title && <ToastTitle className="text-sm">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-sm">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="absolute right-2 top-2" />
          </Toast>
        )
      })}
      <ToastViewport className="top-0 right-0 left-auto bottom-auto" />
    </ToastProvider>
  )
}
