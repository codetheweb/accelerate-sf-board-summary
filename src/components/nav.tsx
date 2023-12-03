"use client";
import { useSearchValue } from "@/lib/search-value-provider";
import { HStack, Heading, Input, Spacer } from "@chakra-ui/react";
import Link from "next/link";

export const Nav = () => {
  const [search, setSearch] = useSearchValue()

  return (
  <HStack as="nav" spacing={4} shadow="sm" rounded="md" p={4} mb={5}>
    <Heading size="md" as={Link} href="/">San Francisco Meetings</Heading>

    <Spacer/>

      <Input placeholder="Search by topic..." maxW="md" mx="auto" value={search} onChange={event => setSearch(event.target.value)}/>
  </HStack>
)
}
