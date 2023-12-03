import { getDbFromEnv } from "@/db/get-db"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Card, CardBody, Heading, Image, VStack} from "@chakra-ui/react"
import { format } from "date-fns"
import Link from "next/link"

const getData = async (meeting_id: string) => {
  const {db} = getDbFromEnv()

  const items = await db.selectFrom("agenda_item").where("meeting_id", "=", meeting_id).selectAll().execute()
  const meeting = await db.selectFrom("meeting").where("meeting_id", "=", meeting_id).selectAll().executeTakeFirstOrThrow()

  return {
    items,
    meeting
  }
}

export default async function MeetingPage({params}: {params: {meeting_id: string}}) {
  const {meeting} = await getData(params.meeting_id)

  return (
    <>
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/" as={Link}>Home</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink as={Link} href={`/meeting/${params.meeting_id}`}>{meeting.name} {format(new Date(meeting.start_time), 'MM/dd/yyyy hh:mm a')}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <main>
      <VStack gap={10} maxW="xl" mx="auto" mt={10}>
      <Heading>Summary</Heading>

      {Array.from({length: 3}).map((_, i) => (
        <Card key={i} direction={{base: 'column', sm: i % 2 === 0 ? 'row' : 'row-reverse'}} overflow="hidden" as={Link} href="#" _hover={{transform: "scale(1.1)"}} transition="transform" transitionDuration="150ms">
          <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    alt='Caffe Latte'
  />

          <CardBody display="flex" alignItems="center">
          For most practical applications, when we’d like to make an object that asynchronously generates a sequence of values, we can use an asynchronous generator.
          </CardBody>
        </Card>
      ))}
      </VStack>
    </main>
    </>
  )
}
