import openai
import os

from utils import process_directory_to_json, get_key, embed

openai.api_key = get_key("openai")

def process_chunks(chunks):
    out = []
    for chunk in chunks:
        print(chunk)
        out.append({
            "start": chunk["start"],
            "end": chunk["end"],
            "content": chunk["content"],
            "embedding": embed(chunk["content"])
        })

    return out

process_directory_to_json('python/resources/jsonchunks', 'python/resources/chunkembeddings', process_chunks, limit=1)