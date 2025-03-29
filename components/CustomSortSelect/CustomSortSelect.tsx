"use client"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

interface CustomSortSelectProps {
  value: string
  onChange: (value: string) => void
}

export function CustomSortSelect({ value, onChange }: CustomSortSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Urutkan: Terbaru" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="terbaru">Terbaru</SelectItem>
        <SelectItem value="terlama">Terlama</SelectItem>
        <SelectItem value="az">Nama: A-Z</SelectItem>
        <SelectItem value="za">Nama: Z-A</SelectItem>
      </SelectContent>
    </Select>
  )
}
