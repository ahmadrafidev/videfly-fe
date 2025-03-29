"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function FetchProducts() {
  const { toast } = useToast()

  function handleFetchSuccess(productCount: number) {
    toast({
      title: `Berhasil mengambil ${productCount} produk aktif!`,
      description: "Sekarang Anda dapat melihat semua produk yang aktif.",
    })
  }

  function handleFetch() {
    handleFetchSuccess(10)
  }

  return (
    <div>
      <Button onClick={handleFetch}>
        Fetch Active Products
      </Button>
    </div>
  )
}
