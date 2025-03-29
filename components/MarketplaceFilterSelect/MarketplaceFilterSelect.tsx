"use client"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

interface MarketplaceFilterSelectProps {
  value: string
  onChange: (value: string) => void
}

export function MarketplaceFilterSelect({ value, onChange }: MarketplaceFilterSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Dari Tokopedia" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="blibli">Blibli</SelectItem>
        <SelectItem value="lazada">Lazada</SelectItem>
        <SelectItem value="shopee">Shopee</SelectItem>
        <SelectItem value="tiktokshop">TikTok Shop</SelectItem>
        <SelectItem value="tokopedia">Tokopedia</SelectItem>
      </SelectContent>
    </Select>
  )
}
