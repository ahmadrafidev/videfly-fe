"use client"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface CustomSortSelectProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function CustomSortSelect({
  value,
  onChange,
  className,
}: CustomSortSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn(className)}>
        <SelectValue placeholder="Urutkan:" />
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
