import {parse} from "date-fns"
import { getDb } from "@/db/get-db";
import { callPythonScrapeScript } from "@/lib/legistar-scraper";
import { loadEnvFromFile } from "@/lib/load-env-from-file";

const main = async () => {
  loadEnvFromFile();

  const {db} = getDb(process.env.DATABASE_URL!)

  const events = await callPythonScrapeScript({limit: 2})

  for (const event of events) {
    await db.transaction().execute(async trx => {
      const values = {
        name: event.name,
        start_time: parse(`${event.meeting_date} ${event.meeting_time}`, "M/d/yyyy h:mm aa", new Date()),
        location: event.meeting_location,
        details_url: event.meeting_details_url,
        agenda_url: event.agenda_url,
        minutes_url: event.minutes_url,
        video_url: event.video_url,
        transcript_url: event.transcript_url,
      }

      const {meeting_id} = await trx
      .insertInto("meeting")
      .values(values)
      .onConflict(qb => qb.columns(["name", "start_time"]).doUpdateSet(values))
      .returning("meeting_id").executeTakeFirstOrThrow()

      if (event.items.length > 0) {
        await trx
        .insertInto("agenda_item")
        .values(event.items.map(item => ({
          meeting_id,
          ext_file_id: item.file_id,
          type: item.type,
          status: item.status,
          title: item.title,
          action: item.action,
          result: item.result,
        })))
        .onConflict(qb => qb.columns(["meeting_id", "ext_file_id"]).doUpdateSet({
          type: "EXCLUDED.type",
          status: "EXCLUDED.status",
          title: "EXCLUDED.title",
          action: "EXCLUDED.action",
          result: "EXCLUDED.result",
        }))
        .execute()
      }
    })
  }
}

void main()
