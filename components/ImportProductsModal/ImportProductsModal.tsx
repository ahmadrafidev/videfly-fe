"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void
  marketplace: string
  onImportSuccess: () => void
}

const productCategories = [
  { name: "Semua produk", count: 93 },
  { name: "3.3 Ramadhan Sale", count: 10 },
  { name: "Skincare", count: 43 },
  { name: "Bodycare", count: 40 },
]

export function ImportProductsModal({ open, onOpenChange, marketplace, onImportSuccess }: Props) {
  const [selected, setSelected] = useState<string[]>([])

  const handleCheckbox = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    )
  }

  const handleImport = () => {
    toast.success("Berhasil mengambil 10 produk aktif!")
    onImportSuccess()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm space-y-4">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">Pilih Data Produk</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Label className="text-sm">Dari</Label>
          <Select value={marketplace} onValueChange={() => {}}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih marketplace" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tokopedia">Tokopedia</SelectItem>
              <SelectItem value="shopee">Shopee</SelectItem>
              <SelectItem value="lazada">Lazada</SelectItem>
              <SelectItem value="blibli">Blibli</SelectItem>
              <SelectItem value="tiktokshop">TiktokShop</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Pilih produk</Label>
          {productCategories.map((cat) => (
            <div key={cat.name} className="flex items-center space-x-2">
              <Checkbox
                id={cat.name}
                checked={selected.includes(cat.name)}
                onCheckedChange={() => handleCheckbox(cat.name)}
              />
              <label htmlFor={cat.name} className="text-sm">
                {cat.name} ({cat.count})
              </label>
            </div>
          ))}
        </div>

        <Button className="w-full mt-2" onClick={handleImport}>
          Impor
        </Button>
      </DialogContent>
    </Dialog>
  )
}
