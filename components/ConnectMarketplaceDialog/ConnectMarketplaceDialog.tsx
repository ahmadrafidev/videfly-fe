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
import { useConnectedStores } from "@/store/useConnectedStores"
import { toast } from "sonner"

const MARKETPLACES = [
  { name: "Blibli", icon: "/images/blibli-icon.png" },
  { name: "Lazada", icon: "/images/lazada-icon.png" },
  { name: "Shopee", icon: "/images/shopee-icon.png" },
  { name: "TiktokShop", icon: "/images/tiktokshop-icon.png" },
  { name: "Tokopedia", icon: "/images/tokopedia-icon.png" },
]

interface Props {
  onConnect?: (name: string) => void
  trigger: React.ReactNode
}

export function ConnectMarketplaceDialog({ onConnect, trigger }: Props) {
  const { connectStore, connectedStores } = useConnectedStores()

  const handleConnect = (name: string) => {
    if (!connectedStores.includes(name)) {
      connectStore(name)
      toast.success(`Berhasil menghubungkan akun ${name}`, {
        description: `Anda dapat mulai mengimpor produk dari ${name} sekarang.`,
      })
    }
    if (onConnect) onConnect(name)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-sm p-0 overflow-hidden">
        <div className="flex items-center justify-between p-4">
          <DialogHeader className="p-0">
            <DialogTitle className="text-lg font-semibold">
              Tautkan Marketplace
            </DialogTitle>
          </DialogHeader>
          <DialogClose asChild />
        </div>
        <div className="px-4 pb-4 space-y-3">
          {MARKETPLACES.map((m) => (
            <div key={m.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src={m.icon} alt={m.name} width={24} height={24} />
                <span className="font-medium">{m.name}</span>
              </div>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleConnect(m.name)}
                >
                  Tautkan
                </Button>
              </DialogClose>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
