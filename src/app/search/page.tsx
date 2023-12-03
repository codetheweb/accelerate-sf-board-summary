"use client";
import { getDbFromEnv } from '@/db/get-db'
import { useSearchValue } from '@/lib/search-value-provider'
import { Card, Heading, Input, InputGroup, InputLeftElement, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { format } from 'date-fns'
import Link from 'next/link'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function SearchPage() {
  const [search] = useSearchValue()
  const {data} = useSWR<{content: string}[]>(`http://localhost:5000/search?q=${search}`, fetcher)

  return (
    <main>
      <VStack gap={4}>
        {data?.map(result => (
          <Card key={result.content} p={4} w="lg">
            {result.content}
          </Card>
        ))}
      </VStack>
    </main>
  )
}
