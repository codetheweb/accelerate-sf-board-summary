// app/providers.tsx
'use client'

import { SearchValueProvider } from '@/lib/search-value-provider'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <SearchValueProvider>
          {children}
        </SearchValueProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}
