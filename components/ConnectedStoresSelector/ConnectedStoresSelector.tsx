"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useConnectedStores } from "../../store/useConnectedStores.ts"

export function ConnectedStoresSelector() {
  const { connectedStores } = useConnectedStores()

  return (
    <Select>
      <SelectTrigger className="w-full justify-between bg-muted text-foreground">
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
        {connectedStores.map((store) => (
          <SelectItem key={store} value={store}>
            {store}
          </SelectItem>
        ))}
        {connectedStores.length === 0 && (
          <div className="text-center text-sm text-muted-foreground px-2 py-3">
            Belum ada toko yang terhubung
          </div>
        )}
        <div className="p-2 border-t mt-1">
          <Button variant="outline" size="sm" className="w-full">
            Tautkan Marketplace
          </Button>
        </div>
      </SelectContent>
    </Select>
  )
}
