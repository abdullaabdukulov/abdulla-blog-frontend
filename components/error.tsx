interface ErrorMessageProps {
  message?: string
}

export function ErrorMessage({ message = "Something went wrong" }: ErrorMessageProps) {
  return (
    <div className="flex h-[200px] w-full items-center justify-center">
      <p className="text-destructive">{message}</p>
    </div>
  )
}

