import pymongo

def writeData(data):
    client = pymongo.MongoClient()
    db = client.testdb
    collection = db.mycollection
    collection.insert(data)