"use client"

import { Button } from "@/components/ui/button"

interface Props {
  name: string
  onConnect: (name: string) => void
}

export function ConnectMarketplaceToast({ name, onConnect }: Props) {
  const handleClick = () => {
    onConnect(name)
  }

  return (
    <Button variant="outline" size="sm" onClick={handleClick}>
      Tautkan
    </Button>
  )
}
