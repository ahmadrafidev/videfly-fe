"use client"

import { useState, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useConnectedStores } from "@/store/useConnectedStores"
import { toast } from "sonner"

const ALL_MARKETPLACES = [
  "Tokopedia",
  "Shopee",
  "Lazada",
  "TiktokShop",
  "Blibli",
]

export function ConnectedStoresSelector() {
  const { connectedStores, connectStore } = useConnectedStores()
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    setSelected(connectedStores)
  }, [connectedStores])

  const toggleMarketplace = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    )
  }

  const handleConnect = () => {
    selected.forEach(connectStore)
    toast.success("Toko berhasil terhubung!", {
      description: `Kami telah menghubungkan: ${selected.join(", ")}.`,
    })
  }

  return (
    <Select>
      <SelectTrigger className="w-full justify-between bg-white text-foreground">
        <div className="flex items-center gap-2">
          <span className="text-sm">Toko Terhubung</span>
          {connectedStores.length > 0 && (
            <span className="inline-flex items-center justify-center text-white text-xs font-bold w-5 h-5 rounded-full bg-[#703BE7]">
              {connectedStores.length}
            </span>
          )}
        </div>
      </SelectTrigger>
      <SelectContent>
        <div className="space-y-1 px-2 py-2">
          {ALL_MARKETPLACES.map((store) => (
            <label key={store} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selected.includes(store)}
                onCheckedChange={() => toggleMarketplace(store)}
              />
              <span className="text-sm">{store}</span>
            </label>
          ))}
        </div>

        <div className="p-2 border-t mt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={handleConnect}
            className="w-full"
            disabled={selected.length === 0}
          >
            Tautkan Marketplace
          </Button>
        </div>
      </SelectContent>
    </Select>
  )
}
