import os
import json
import openai

import hashlib

def hash_string(input_string):
    # Create a new sha256 hash object
    hasher = hashlib.sha256()
    # Update the hash object with the bytes of the input string
    hasher.update(input_string.encode('utf-8'))
    # Get the hexadecimal representation of the hash
    hex_dig = hasher.hexdigest()
    return hex_dig

def get_home_dir():
    home_dir = os.environ.get("HOME")
    if home_dir is None:
        home_dir = os.environ.get("HOMEPATH")

    home_dir = home_dir.replace("\\", "/")
    print("Home:" + home_dir)

    return home_dir

def get_key(key_name):
    home_dir = get_home_dir()
    with open(home_dir + "/" + key_name + ".key", "r") as keyfile:
        key = keyfile.read()
        print(key_name + "=" + key)
        return key

def process_directory(dir_in, callback, is_json=True, limit=-1):
    file_index = 0
    for file_name in os.listdir(dir_in):
        file_index += 1
        if limit >= 0 and file_index > limit:
            break
            
        file_path = os.path.join(dir_in, file_name)
        if os.path.isfile(file_path):
            # Run parse_caption_file function to get the result (assuming it's defined elsewhere)
            with open(file_path, 'r') as file:
                content = file.read()
                if is_json:
                    content = json.loads(content)
                
                callback(file_name, content)

def process_directory_to_json(dir_in, json_out, callback, is_json=True, limit=-1):
    # Make sure the output directory exists
    if not os.path.exists(json_out):
        os.makedirs(json_out)

    def callback_writer(file_name, content):
        result = callback(content)

        # Define the output file name by replacing the extension with .json
        json_file_name = os.path.splitext(file_name)[0] + '.json'
        json_file_path = os.path.join(json_out, json_file_name)
        
        # Write the result to a JSON file in the output directory
        with open(json_file_path, 'w') as json_file:
            json.dump(result, json_file, indent=4)

    process_directory(dir_in, callback_writer, is_json=is_json, limit=limit)

def embed(text):
    response = openai.Embedding.create(model="text-embedding-ada-002", input=[text])
    return response.data[0].embedding
