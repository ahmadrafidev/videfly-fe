"use client"

import { useState } from "react"
import Image from "next/image"
import { Loader2, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { CustomSortSelect } from "../CustomSortSelect/CustomSortSelect"
import { ConnectMarketplaceDialog } from "../ConnectMarketplaceDialog/ConnectMarketplaceDialog"
import { MarketplaceFilterSelect } from "../MarketplaceFilterSelect/MarketplaceFilterSelect"

interface Product {
  id: number
  name: string
  brand: string
  marketplace: string
}

export default function ProductsPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [sortValue, setSortValue] = useState("terbaru")
  const [marketplaceFilter, setMarketplaceFilter] = useState("tokopedia")

  function handleConnectStore() {
    setIsConnected(true)
  }

  function handleImportProducts() {
    setLoading(true)
    setTimeout(() => {
      setProducts([
        { id: 1, name: "Bulgarian Rose & Body Serum", brand: "EARTH LOVE LIFE", marketplace: "Tokopedia" },
        { id: 2, name: "UV Shield Sunscreen Gel SPF 30", brand: "Wardah", marketplace: "Tokopedia" },
      ])
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="px-4 pt-6 pb-20 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Produk</h1>
        <div className="relative flex items-center space-x-2">
          <div className="rounded-full bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1">5 Koin</div>
          <Image src="/avatar.png" alt="User Avatar" width={32} height={32} className="rounded-full" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        {isConnected && (
          <>
            <span className="bg-muted text-muted-foreground px-3 py-1 rounded-lg text-sm">Toko Terhubung (1)</span>
            <Button onClick={handleImportProducts}>Import Produk</Button>
            <Input type="search" placeholder="Cari produk..." className="w-full sm:w-auto" />
            <Button variant="outline" className="w-full sm:w-auto">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Filter
            </Button>
          </>
        )}
        <CustomSortSelect value={sortValue} onChange={setSortValue} />
      </div>


      {!isConnected && <EmptyStateNoStore onConnect={() => setIsConnected(true)} />}
      {isConnected && !loading && products.length === 0 && <EmptyStateNoProducts onImport={handleImportProducts} />}
      {isConnected && loading && <LoadingState />}
      {isConnected && !loading && products.length > 0 && <ProductList products={products} />}
    </div>
  )
}

function EmptyStateNoStore({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="border rounded-lg px-4 py-6 text-center space-y-4">
      <div className="flex justify-center gap-4">
        <Image src="/images/blibli-icon.png" alt="Blibli" width={32} height={32} />
        <Image src="/images/lazada-icon.png" alt="Lazada" width={32} height={32} />
        <Image src="/images/shopee-icon.png" alt="Shopee" width={32} height={32} />
        <Image src="/images/tiktokshop-icon.png" alt="TiktokShop" width={32} height={32} />
        <Image src="/images/tokopedia-icon.png" alt="Tokopedia" width={32} height={32} />
      </div>
      <p className="text-sm font-medium">Tampilkan katalog produk dari toko onlinemu secara otomatis</p>
      <ConnectMarketplaceDialog onConnect={onConnect} />
    </div>
  )
}

function EmptyStateNoProducts({ onImport }: { onImport: () => void }) {
  return (
    <div className="border rounded-lg px-4 py-6 text-center space-y-4">
      <MarketplaceFilterSelect value={"tokopedia"} onChange={() => {}} />
      <div className="text-4xl">📦</div>
      <p className="text-sm font-medium">Import data produk untuk pembuatan konten praktis</p>
      <Button onClick={onImport} variant="default">Import Data Produk</Button>
    </div>
  )
}


function LoadingState() {
  return (
    <div className="border rounded-lg px-4 py-6 text-center">
      <p className="mb-2 font-medium">Kami sedang mengambil data produk dari akun tokomu...</p>
      <Loader2 className="h-6 w-6 animate-spin mx-auto text-purple-500" />
    </div>
  )
}

function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{products.length} produk</p>
      {products.map((product) => (
        <div key={product.id} className="p-4 border rounded-md flex items-start justify-between">
          <div>
            <h3 className="font-semibold leading-snug">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
            <div className="mt-1 text-xs flex items-center gap-1">
              <span className="inline-flex items-center gap-1">
                <img src={`/icons/${product.marketplace.toLowerCase()}.png`} alt={product.marketplace} className="h-4 w-4" />
                {product.marketplace}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Buat Video</Button>
          </div>
        </div>
      ))}
    </div>
  )
}
