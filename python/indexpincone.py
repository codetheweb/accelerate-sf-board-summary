import pinecone    

from utils import process_directory, get_key, hash_string

api_key = get_key("pinecone")

pinecone.init(      
	api_key=api_key,    
	environment="gcp-starter"
)      
index = pinecone.Index("board")

def index_embeddings(file_name, content):
    for embedding_record in content:
        id = hash_string(embedding_record["content"])

        index.upsert(vectors=[
            {
                "id": id,
                "values": embedding_record["embedding"],
                "metadata": {
                    "start": embedding_record["start"],
                    "end": embedding_record["end"]
                }
            }
        ])

process_directory("python/resources/chunkembeddings", index_embeddings)