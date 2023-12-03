CREATE EXTENSION "uuid-ossp";

CREATE TABLE meeting (
  meeting_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  start_time timestamptz NOT NULL,
  location text NOT NULL,
  details_url text NOT NULL,
  agenda_url text NOT NULL,
  minutes_url text,
  video_url text,
  transcript_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (name, start_time)
);

CREATE TABLE agenda_item (
  agenda_item_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  meeting_id uuid NOT NULL REFERENCES meeting(meeting_id),
  ext_file_id text NOT NULL,
  type text NOT NULL,
  status text,
  title text NOT NULL,
  action text,
  result text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (meeting_id, ext_file_id)
);
