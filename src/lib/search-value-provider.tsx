"use client";
import { useRouter, usePathname } from 'next/navigation';
import React, {createContext, useContext, useEffect, useState} from 'react'

const Context = createContext<[
  string,
  React.Dispatch<React.SetStateAction<string>>
]>(["", () => {}])

export const useSearchValue = () => {
  const value = useContext(Context)
  if (!value) {
    throw new Error('useSearchValue must be used within SearchValueProvider')
  }
  return value
}

export const SearchValueProvider = ({ children }: { children: React.ReactNode}) => {
  const [value, setValue] = useState('')

  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    if (value !== "" && router.w !== "/search") {
      router.push("/search")
    }
  }, [value, router, pathname])

  return (
    <Context.Provider value={[value, setValue]}>
      {children}
    </Context.Provider>
  )
}
