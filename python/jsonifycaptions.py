import os
import json
import re

from utils import process_directory_to_json

def parse_caption_file(content):
    # Regular expression to match the time codes and text
    timecode_regex = re.compile(r'(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})')
    content_regex = re.compile(r'(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})(.*?)(?=\d{2}:\d{2}:\d{2}\.\d{3} -->|\Z)', re.DOTALL)

    captions = []

    matches = content_regex.findall(content)
    
    for match in matches:
        start_time, end_time, caption_text = match
        caption_text = caption_text.strip().replace('\n', ' ')
        captions.append({
            'start': start_time,
            'end': end_time,
            'content': caption_text
        })

    return captions

def split_into_sentences(obj):
    sentence_endings = re.compile(r'(?<=[.!?]) +')
    sentences = sentence_endings.split(obj['content'])
    # Assume that all sentences within the same string have the same timestamps.
    return [{'start': obj['start'], 'end': obj['end'], 'content': s} for s in sentences if s]

def merge_caption_json(sentence_objects):
    chunks = []
    current_chunk = []
    current_start_time = None
    current_end_time = None
    
    sentences_per_chunk = 15
    for obj in sentence_objects:
        if not current_start_time:
            current_start_time = obj['start']
        current_chunk.append(obj['content'])
        
        # Set end time to the end time of the latest sentence.
        current_end_time = obj['end']
        
        if len(current_chunk) == sentences_per_chunk:
            chunks.append({
                'start': current_start_time,
                'end': current_end_time,
                'content': ' '.join(current_chunk)
            })
            # Overlap: start next chunk with the last sentence from the current one.
            current_start_time = sentence_objects[sentence_objects.index(obj)-2]['start'] if len(sentence_objects) > 3 else obj['start']
            current_chunk = current_chunk[-1:]
            
    if current_chunk:
        # Add last chunk.
        chunks.append({
            'start': current_start_time,
            'end': current_end_time,
            'content': ' '.join(current_chunk)
        })
    
    return chunks


process_directory_to_json('python/resources/captions', 'python/resources/jsoncaptions', parse_caption_file, is_json=False)
process_directory_to_json('python/resources/jsoncaptions', 'python/resources/jsonchunks', merge_caption_json)
