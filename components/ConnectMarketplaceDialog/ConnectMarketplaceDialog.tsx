"use client"

import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ConnectMarketplaceToast } from "../ConnectMarketplaceToast/ConnectMarketplaceToast"

const MARKETPLACES = [
  { name: "Blibli", icon: "/images/blibli-icon.png" },
  { name: "Lazada", icon: "/images/lazada-icon.png" },
  { name: "Shopee", icon: "/images/shopee-icon.png" },
  { name: "TiktokShop", icon: "/images/tiktokshop-icon.png" },
  { name: "Tokopedia", icon: "/images/tokopedia-icon.png" },
]

interface Props {
  onConnect: (name: string) => void
  trigger: React.ReactNode
}

export function ConnectMarketplaceDialog({ onConnect, trigger }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-sm p-0 overflow-hidden">
        <div className="flex items-center justify-between p-4">
          <DialogHeader className="p-0">
            <DialogTitle className="text-lg font-semibold">Tautkan Marketplace</DialogTitle>
          </DialogHeader>
          <DialogClose asChild>
            <button aria-label="Close" className="text-muted-foreground hover:text-foreground">×</button>
          </DialogClose>
        </div>
        <div className="px-4 pb-4 space-y-3">
          {MARKETPLACES.map((m) => (
            <div key={m.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src={m.icon} alt={m.name} width={24} height={24} />
                <span className="font-medium">{m.name}</span>
              </div>
              <DialogClose asChild>
                <ConnectMarketplaceToast name={m.name} onConnect={onConnect} />
              </DialogClose>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
