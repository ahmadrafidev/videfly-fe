import { Pencil, Trash2, Sparkles } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Product } from "../../types/product"

export function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{products.length} produk</p>

      {products.map((product) => (
        <div
          key={product.id}
          className="p-4 border rounded-xl space-y-3 md:space-y-0 md:flex md:items-center md:justify-between"
        >
          <div className="flex gap-3 items-start md:items-center md:flex-1">
            <div className="w-16 h-16 rounded-lg overflow-hidden border shrink-0">
              <Image
                src={product.image || "/images/default-product.jpg"}
                alt={product.name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex-1 space-y-1 md:grid md:grid-cols-3 md:items-center md:gap-4 md:space-y-0">
              {/* Name */}
              <div>
                <h3 className="font-semibold text-sm leading-tight line-clamp-2">
                  {product.name}
                </h3>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">{product.brand}</p>
              </div>

              <div className="flex items-center gap-1 text-xs">
                <Image
                  src={`/images/${product.marketplace.toLowerCase()}-icon.png`}
                  alt={product.marketplace}
                  width={14}
                  height={14}
                />
                <span>{product.marketplace}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:ml-4 mt-2 md:mt-0">
            <Button
              variant="outline"
              className="flex-1 md:flex-none rounded-full border-[#703BE7] text-[#703BE7] text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Buat Video
            </Button>

            <Button size="icon" variant="ghost" className="text-muted-foreground">
              <Pencil className="w-4 h-4" />
            </Button>

            <Button size="icon" variant="ghost" className="text-muted-foreground">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
