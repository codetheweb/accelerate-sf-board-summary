import {spawn} from "node:child_process"
import {fileURLToPath} from "node:url"
import path from "node:path"
import ndjson from "ndjson"
import { once } from "node:events"

type ScrapedLegistarEvent = {
  name: string
  meeting_time: string
  meeting_date: string
  meeting_location: string
  meeting_details_url: string
  agenda_url: string
  minutes_url?: string
  video_url?: string
  transcript_url?: string

  items: {
    file_id: string
    type: string
    status: string
    title: string
    action: string
    result: string
  }[]
}

export const callPythonScrapeScript = async ({limit}: {limit?: number} = {}): Promise<ScrapedLegistarEvent[]> => {
  const pathToPythonScript = path.join(fileURLToPath(import.meta.url), "..", "..", "..", "python-legistar-scraper", "scrape.py")

  const child = spawn("poetry", `run -- python ${pathToPythonScript}`.split(" "), {
    cwd: path.dirname(pathToPythonScript),
  })

  const events: ScrapedLegistarEvent[] = []

  child.stdout.pipe(ndjson.parse()).on("data", data => {
    events.push(data)

    if (limit && events.length >= limit) {
      child.kill()
    }
  })

  child.stdout.pipe(process.stdout)

  await once(child, "exit")
  return events
}

(async () => {
  const events = await callPythonScrapeScript({limit: 2})
  console.log(events)
})()
