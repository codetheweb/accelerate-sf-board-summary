from legistar.events import LegistarEventsScraper
from json import dumps
import signal
import time

class GracefulKiller:
  kill_now = False
  def __init__(self):
    signal.signal(signal.SIGINT, self.exit_gracefully)
    signal.signal(signal.SIGTERM, self.exit_gracefully)

  def exit_gracefully(self, *args):
    self.kill_now = True

if __name__ == '__main__':
    s = LegistarEventsScraper()
    s.BASE_URL = 'https://sfgov.legistar.com/'
    s.EVENTSPAGE = "https://sfgov.legistar.com/Calendar.aspx"

    killer = GracefulKiller()
    for meeting in s.events(since=2023):
        if killer.kill_now:
          break

        event = meeting[0]
        agenda = meeting[1]

        parsed = {
            "name": event["Name"],
            "meeting_date": event["Meeting Date"],
            "meeting_time": event["Meeting Time"],
            "meeting_location": event["Meeting Location"],
            "meeting_details_url": event["Meeting Details"]["url"],
            "agenda_url": event["Agenda"]["url"],
            "items": []
        }

        if isinstance(event["Minutes"], dict):
            parsed["minutes_url"] = event["Minutes"]["url"]

        if isinstance(event["Video"], dict):
            parsed["video_url"] = event["Video"]["url"]

        if isinstance(event["Transcript"], dict):
            parsed["transcript_url"] = event["Transcript"]["url"]

        for item in agenda:
            parsed_item = item[0]

            # Skip empty rows
            if parsed_item["Type"] == "":
                continue

            parsed["items"].append({
                "file_id": parsed_item["File\xa0#"]["label"],
                "type": parsed_item["Type"],
                "status": parsed_item["Status"],
                "title": parsed_item["Title"],
                "action": parsed_item["Action"],
                "result": parsed_item["Result"],
            })

        print(dumps(parsed))
