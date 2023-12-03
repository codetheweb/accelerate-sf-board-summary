import { getDbFromEnv } from "@/db/get-db"
import { getVideoChapters } from "@/lib/get-video-chapters"
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Card, CardBody, CardHeader, Heading, Image, VStack, Link as ChakraLink, UnorderedList, ListItem} from "@chakra-ui/react"
import { format } from "date-fns"
import Link from "next/link"

// The San Francisco Board of Supervisors meeting on November 28, 2023, began with the acknowledgment of the Ramaytush Ohlone people as the original inhabitants of the San Francisco Peninsula. The Board proceeded with the Pledge of Allegiance, communications, and approval of previous meeting minutes. Consent agenda items 1-17 were approved, and no items were removed for separate consideration.

// The board then discussed a third draft of a charter amendment related to the police department staffing levels. Supervisor Safai, the sponsor, emphasized the budgetary challenges the city faces and the need for a thoughtful conversation about all aspects of public safety. He also mentioned a fiscal responsibility amendment that requires a funding source for any new measures. The amendment aims to change the conversation around minimum police staffing levels. Various supervisors expressed their opinions on the matter. Some voiced concerns about the implications of the amendment and the city’s budget deficit.

// Other notable items included approval of grant funding for the Buchanan Mall project and various lease approvals for city properties. The board also discussed an ordinance to extend the cannabis event pilot program and an amendment to the business and tax regulations code related to transfer tax rates for affordable housing.

// During general public comments, individuals spoke on various topics, including technology concerns, housing issues, safety, and recognition of community leaders.

// The Board also recognized Martha Ryan, the founder and executive director emeritus of the Homeless Prenatal Program, for her contributions to the city and her work with vulnerable populations.

// Supervisor Safai introduced legislation to restore and expand the Homeward Bound program.

// At the end of the meeting, the Board adjourned in memory of Marsalina Marsal V. Espinosa, and several items were submitted for future consideration without discussion.

// The session concluded with the imperative agenda item recognizing November 28, 2023, as In-Home Supportive Services Provider Day in San Francisco. The resolution was adopted unanimously.

// [Note: This summary is based on the provided meeting transcript and does not include details from any portion of the meeting that was not included in the transcript.]
// ```

const getData = async (meeting_id: string) => {
  const {db} = getDbFromEnv()

  const items = await db.selectFrom("agenda_item").where("meeting_id", "=", meeting_id).selectAll().execute()
  const meeting = await db.selectFrom("meeting").where("meeting_id", "=", meeting_id).selectAll().executeTakeFirstOrThrow()

  const chapters = await getVideoChapters()

  return {
    chapters,
    items,
    meeting
  }
}

export default async function MeetingPage({params}: {params: {meeting_id: string}}) {
  const {meeting, chapters} = await getData(params.meeting_id)

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

      <Card p={6} w="fit-content" float="right">
        {meeting.minutes_url && (
          <ChakraLink href={meeting.minutes_url} isExternal>
            Meeting Minutes
          </ChakraLink>
        )}

{meeting.video_url && (
          <ChakraLink href={meeting.video_url} isExternal>
            Video
          </ChakraLink>
        )}

        {meeting.agenda_url && (
          <ChakraLink href={meeting.agenda_url} isExternal>
            Agenda
          </ChakraLink>
        )}

        {meeting.details_url && (
          <ChakraLink href={meeting.details_url} isExternal>
            Details
          </ChakraLink>
        )}
      </Card>

      <VStack gap={10} maxW="xl" mx="auto" mt={10} alignItems="flex-start">
<Box>
        <Heading size="md" mb={2}>
          Item 18: (Charter Amendment related to Police Staffing)
        </Heading>
        <UnorderedList>
          <ListItem>
            Supervisor Safai sponsored the charter amendment. The measure involved a discussion about increasing the minimum number of officers, recruitment funding, and fiscal responsibility.
          </ListItem>
          <ListItem>
            Supervisor Dorsey voted against the measure, expressing dissatisfaction with it being aspirational rather than concrete and expressing concerns about future tax measures being redirected to police funding.
          </ListItem>
          <ListItem>
            Supervisor Engardio also voted against, citing that the measure does not definitively fund police hiring and its potential legal consequences.
          </ListItem>
          <ListItem>
            Supervisor Ronen spoke against the measure, pointing out its lack of sense and potential negative consequences on future budget allocation.
          </ListItem>
          <ListItem>
            The charter amendment was approved by a vote of 6 ayes and 5 noes, with Supervisors Dorsey, Engardio, Mandelman, Preston, and Ronan voting no.
          </ListItem>
        </UnorderedList>
        </Box>

        <Box>
        <Heading size="md"mb={2}>
          Item 19: (Business and Tax Regulations Code Amendment)
        </Heading>
        <UnorderedList>
          <ListItem>
            All supervisors voted in favor, and the ordinance was finally passed on the first reading.
          </ListItem>
        </UnorderedList>
        </Box>

        <Box>
        <Heading size="md"mb={2}>
          Item 26: (Special Tax Bonds Issuance for Treasure Island)
        </Heading>
        <UnorderedList>
          <ListItem>
            The resolution was adopted with the same house, same call; no objections.
          </ListItem>
        </UnorderedList>
        </Box>

        <Box>
        <Heading size="md"mb={2}>
          Motion (Item 27): (Budget and Legislative Analyst Performance Audits)
        </Heading>
        <UnorderedList>
          <ListItem>
            The motion for performance audits was approved with the same house, same call; no objections.
          </ListItem>
        </UnorderedList>
        </Box>

        <Box>
        <Heading size="md"mb={2}>
          Item 32-35 (Committee Reports):
        </Heading>
        <UnorderedList>
          <ListItem>
            These reports were related to planning code and zoning amendments, with extensive discussion on compliance with state law, streamlining housing projects, and potential amendments regarding housing in certain districts.
          </ListItem>
          <ListItem>
            Supervisor Melgar requested a continuance for Item 32 due to concerns raised in a corrective action letter from the state and the potential for additional amendments from other supervisors.
          </ListItem>
          <ListItem>
            The item was continued to December 5, 2023, unanimously.
          </ListItem>
        </UnorderedList>
        </Box>

        <Box>
        <Heading size="md"mb={2}>
          General Public Comment:
        </Heading>
        <UnorderedList>
          <ListItem>
            Various individuals spoke on matters including technology and surveillance concerns, the flat Earth theory, the detrimental effects of digital surveillance, rent control, the commendation of various community members' contributions, and requesting support for mothers and families of murdered children.
          </ListItem>
        </UnorderedList>
        </Box>

        <Box>
        <Heading size="md"mb={2}>
          Adoption Without Committee Reference (Items 38 and 39):
        </Heading>
        <UnorderedList>
          <ListItem>
            Both items were adopted with the same house, same call; no objections.
          </ListItem>
        </UnorderedList>
        </Box>

        <Box>
        <Heading size="md"mb={2}>
          Imperative Agenda:
        </Heading>
        <UnorderedList>
          <ListItem>
            A resolution declaring November 28, 2023, as In-Home Supportive Services Provider Day in San Francisco was adopted unanimously.
          </ListItem>
        </UnorderedList>
        </Box>

        <Box>
        <Heading size="md"mb={2}>
          In Memoriam:
        </Heading>
        <UnorderedList>
          <ListItem>
            The meeting adjourned in memory of Mr. Marsalina "Marsal" V. Espinosa.
          </ListItem>
        </UnorderedList>
        </Box>
      </VStack>
    </main>
    </>
  )
}
