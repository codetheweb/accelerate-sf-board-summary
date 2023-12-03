import { getDbFromEnv } from '@/db/get-db'
import { Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { format } from 'date-fns'
import Link from 'next/link'
import useSWR from 'swr'

async function getData() {
  const {db} = getDbFromEnv()

  return await db.selectFrom('meeting').selectAll().execute()
}

export default async function Home() {
  const meetings = await getData()

  return (
    <main>
      <Heading textAlign="center" mb={10}>San Francisco Meetings</Heading>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                Name
              </Th>
              <Th>
                Time
              </Th>
              <Th>
                Details
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              meetings.map(meeting => (
                <Tr key={meeting.meeting_id}>
                  <Td>{meeting.name}</Td>
                  <Td>
                    {format(new Date(meeting.start_time), 'MM/dd/yyyy hh:mm a')}
                    {meeting.start_time > new Date() ? ' (Upcoming)' : ''}
                  </Td>
                  <Td>
                    <Link href={`/meeting/${meeting.meeting_id}`}>
                      View
                    </Link>
                  </Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </TableContainer>
    </main>
  )
}
