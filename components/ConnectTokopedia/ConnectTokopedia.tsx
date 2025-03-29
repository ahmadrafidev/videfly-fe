"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function ConnectTokopedia() {
  const { toast } = useToast()

  const handleConnect = () => {
    toast({
      title: "Berhasil menghubungkan akun Tokopedia!",
      description: "Anda dapat mulai menggunakan fitur Tokopedia sekarang.",
    })
  }

  return (
    <div>
      <Button onClick={handleConnect}>
        Connect Tokopedia
      </Button>
    </div>
  )
}
