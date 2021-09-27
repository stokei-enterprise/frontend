import { useCallback, useState } from 'react'

export interface UseDisclosureProps {
  readonly startOpen?: boolean
}
export interface UseDisclosureResponse {
  readonly isOpen: boolean
  readonly onOpen: () => void
  readonly onClose: () => void
  readonly onToggle: () => void
}

export const useDisclosure = (
  data?: UseDisclosureProps
): UseDisclosureResponse => {
  const [isOpen, setIsOpen] = useState(() => data?.startOpen === true)
  const onOpen = useCallback(() => setIsOpen(true), [])
  const onClose = useCallback(() => setIsOpen(false), [])
  const onToggle = useCallback(() => setIsOpen((oldIsOpen) => !oldIsOpen), [])
  return {
    isOpen,
    onOpen,
    onClose,
    onToggle
  }
}
