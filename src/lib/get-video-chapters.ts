import { loadEnvFromFile } from "./load-env-from-file"

type Chapter = {
  chapter_number: number
  start: number
  end: number
  chapter_title: string
  chapter_summary: string
}

export const getVideoChapters = async (): Promise<Chapter[]> => {
  loadEnvFromFile()

  const baseUrl = "https://api.twelvelabs.io/v1.2"
const apiKey = process.env.TWELVE_LABS_API_KEY
const data = {
  "type": "chapter",
  "video_id": "6545f967195730422cc3832b"
}

// Send request
const response = await fetch(baseUrl + "/summarize", {
    method: "POST",
    headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(data)
})
const json = await response.json()

return json.chapters
}
