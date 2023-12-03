import openai
import pinecone    
from utils import get_key, embed
import hashlookup

openai.api_key = get_key("openai")
api_key = get_key("pinecone")

pinecone.init(      
	api_key=api_key,    
	environment="gcp-starter"
)      
index = pinecone.Index("board")

def search(text):
    embedding = embed(text)
    resp = index.query(vector=embedding, top_k=5)
    for match in resp["matches"]:
        match_record = hashlookup.get_by_id(match['id'])
        print(match_record["start"] + ": " + match_record["content"])

hashlookup.init()
search("item 18")