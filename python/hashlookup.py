from utils import process_directory, hash_string

hashes = dict()

def store_hashes(file_name, content):
    for idx in range(len(content)):
        record = content[idx]
        id = hash_string(record["content"])
        hashes[id] = {
            **record,
            "file_name": file_name
        }

def init():
    process_directory("python/resources/chunkembeddings", store_hashes)

def get_by_id(id):
    return hashes.get(id)
