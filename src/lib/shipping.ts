export interface ShippingEstimate {
  courier: string
  service: string
  description: string
  cost: number
  etd: string
}

export function estimateShipping(destination: string, weightKg: number): ShippingEstimate[] {
  const dest = destination.toLowerCase()
  const isTier1 = ["jakarta", "bandung", "bogor", "depok", "bekasi", "tangerang"].some((c) => dest.includes(c))
  const isTier2 = ["surabaya", "yogyakarta", "semarang", "solo", "malang"].some((c) => dest.includes(c))
  const baseRate = isTier1 ? 12000 : isTier2 ? 18000 : 28000

  const weight = Math.max(1, Math.ceil(weightKg))

  return [
    {
      courier: "JNE",
      service: "REG",
      description: "Layanan Reguler",
      cost: baseRate * weight,
      etd: "2-3 hari",
    },
    {
      courier: "JNE",
      service: "YES",
      description: "Yakin Esok Sampai",
      cost: Math.round(baseRate * weight * 1.8),
      etd: "1 hari",
    },
    {
      courier: "J&T",
      service: "EZ",
      description: "Layanan Reguler",
      cost: Math.round(baseRate * weight * 0.95),
      etd: "2-4 hari",
    },
    {
      courier: "SiCepat",
      service: "BEST",
      description: "Best Seller Service",
      cost: Math.round(baseRate * weight * 0.9),
      etd: "2-3 hari",
    },
  ]
}
