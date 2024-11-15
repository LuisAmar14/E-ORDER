''' COMMAND '''
'''

python src/lib/scripts/importCSVToFirebase.py

'''

''' LIBRARIES '''
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import numpy as np
import json
import csv
import re

''' CONSTANTS '''
COLLECTION_NAME = "Products"
CSV_DB = './Products.csv'
CERTIFICATE_PATH = 'C:\\Users\\yoall\\OneDrive\\Documents\\GitHub\\E-ORDER\\backend\\eorder-db-firebase-adminsdk-drxxe-a87c5bdb7a.json'

''' CREDENTIALS '''
cred = credentials.Certificate(CERTIFICATE_PATH)
app = firebase_admin.initialize_app(cred)
db = firestore.client()

''' FIREBASE FUNCTIONS '''
def json_to_firebase(json_object, firebase_collection_name):
    collection = db.collection(firebase_collection_name)
    for obj in json_object:
        doc_ref = collection.document()
        doc_ref.set(obj)

''' FUNCTIONS '''
def parse_csv_to_json(csv_filepath, json_filepath="", count_stop=-1):
    json_array = []
    with open(csv_filepath, mode='r', encoding='utf8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        line_count = 0
        for row in csv_reader:
            try: 
                # custom stop
                if line_count == count_stop: break

                # avoid columns
                if line_count == 0:
                    line_count += 1

                ####### process rows #######
                row["Price"] = float(row["Price"])
                row["SKU"] = int(row["SKU"])

                # add row to array
                json_array.append(row)
                
                line_count += 1
            except:
                print("An exception occurred in ROW", row)

    # write file is json_filepath is provided
    if json_filepath != "":
        with open(json_filepath, 'w', encoding='utf-8') as jsonf: 
            json_string = json.dumps(json_array, indent=4, ensure_ascii=False)
            jsonf.write(json_string)
    print('Done.\n==> Total new elements:', len(json_array))
    return json_array





''' MAIN '''
json_obj = parse_csv_to_json(CSV_DB)
json_to_firebase(json_obj, COLLECTION_NAME)





















