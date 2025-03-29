/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import Image from "next/image"
import { Bell, Loader2, SlidersHorizontal, BadgeCent } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import { CustomSortSelect } from "../CustomSortSelect/CustomSortSelect"
import { ConnectMarketplaceDialog } from "../ConnectMarketplaceDialog/ConnectMarketplaceDialog"
import { ImportProductsModal } from "../ImportProductsModal/ImportProductsModal"
import { ConnectedStoresSelector } from "../../components/ConnectedStoresSelector/ConnectedStoresSelector"
import { useConnectedStores } from "../../store/useConnectedStores"

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
  const { connectStore } = useConnectedStores()

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

  function handleConnect(name: string) {
    setIsConnected(true)
    connectStore(name) 
  }

  return (
    <div className="px-4 pt-6 pb-20 space-y-4">
      <div className="flex items-center justify-between">
        <button className="p-2 rounded-md text-muted-foreground sm:hidden">
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0" width="16" height="2" rx="1" fill="currentColor"/>
            <rect y="6" width="10" height="2" rx="1" fill="currentColor"/>
            <rect y="12" width="16" height="2" rx="1" fill="currentColor"/>
          </svg>
        </button>

        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button className="relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <div className="relative flex items-center pl-3 pr-1 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500">
            <BadgeCent className="w-4 h-4 text-white mr-1" />
            <span className="text-sm font-medium text-white mr-2">5 Koin</span>

            <div className="relative w-6 h-6">
              <Image
                src="/images/tokopedia-icon.png"
                alt="User Avatar"
                fill
                className="rounded-full border-2 border-white object-cover"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-white flex items-center justify-center">
                <svg className="w-2 h-2 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <h1 className="text-2xl font-semibold">Produk</h1>

      {isConnected && (
        <div className="grid grid-cols-2 gap-2">
          <ConnectedStoresSelector />
          <Button className="bg-[#703BE7]" onClick={handleImportProducts}>Import Produk</Button>
        </div>
      )}

      <div className="space-y-3">
        <div className="relative">
          <Input
            type="search"
            placeholder="Cari produk..."
            className="w-full pl-10 bg-muted text-muted-foreground rounded-xl"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="w-full rounded-full border-muted text-foreground font-medium"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filter
          </Button>

          <CustomSortSelect
            value={sortValue}
            onChange={setSortValue}
            className="w-full text-foreground"
          />
        </div>
      </div>

      {!isConnected && <EmptyStateNoStore onConnect={handleConnect} />}

      {isConnected && !loading && products.length === 0 && (
        <EmptyStateNoProducts
          marketplaceFilter={marketplaceFilter}
          onChangeMarketplace={setMarketplaceFilter}
          onImport={handleImportProducts}
        />
      )}

      {isConnected && loading && <LoadingState />}

      {isConnected && !loading && products.length > 0 && <ProductList products={products} />}
    </div>
  )
}

function EmptyStateNoStore({ onConnect }: { onConnect: (name: string) => void }) {
  return (
    <div className="relative border rounded-lg px-4 py-6 text-center space-y-4 min-h-[70vh] flex flex-col items-center justify-center">
      <div className="absolute top-2 left-4 text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">
        0 produk
      </div>

      <div className="flex justify-center gap-4">
        {["blibli", "lazada", "shopee", "tiktokshop", "tokopedia"].map((m) => (
          <Image key={m} src={`/images/${m}-icon.png`} alt={m} width={32} height={32} />
        ))}
      </div>

      <p className="text-sm font-medium max-w-[250px]">
        Tampilkan katalog produk dari toko onlinemu secara otomatis
      </p>

      <ConnectMarketplaceDialog
        onConnect={onConnect}
        trigger={<Button className="bg-[#703BE7]" variant="default">Tautkan Marketplace</Button>}
      />
    </div>
  )
}

function EmptyStateNoProducts({
  onImport,
  marketplaceFilter,
  onChangeMarketplace,
}: {
  onImport: () => void
  marketplaceFilter: string
  onChangeMarketplace: (v: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="relative border rounded-lg px-4 py-6 min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <div className="absolute top-2 left-4 text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">
          0 produk
        </div>

        <div className="text-4xl">
          <Image
            src="/images/catalog.png"
            width={50}
            height={40}
            alt="Catalog Picture"
            quality={100}
          />
        </div>

        <p className="text-lg max-w-[250px] font-bold">
          Import data produk untuk pembuatan konten praktis
        </p>

        <Button
          onClick={() => setOpen(true)}
          variant="default"
          className="bg-[#703BE7]"
        >
          Impor Data Produk
        </Button>
      </div>

      <ImportProductsModal
        open={open}
        onOpenChange={setOpen}
        marketplace={marketplaceFilter}
        onImportSuccess={onImport}
      />
    </>
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
                <Image
                  src={`/images/${product.marketplace.toLowerCase()}.png`}
                  alt={product.marketplace}
                  className="h-4 w-4"
                  width={10}
                  height={10}
                />
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
