import os
from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app

''' CONSTANTS '''
CERTIFICATE_PATH = 'C:\\Users\\yoall\\OneDrive\\Documents\\GitHub\\E-ORDER\\backend\\eorder-db-firebase-adminsdk-drxxe-a87c5bdb7a.json'

# Initialize Flask App, libreria que ayuda a hacer apis usando python
app = Flask(__name__)

# Initialize Firestore DB
cred = credentials.Certificate(CERTIFICATE_PATH)
default_app = initialize_app(cred)
db = firestore.client()

''' COLLECTIONS / TABLAS '''
products_ref = db.collection('Products')#apuntador a la collection products
#falta esto cuando agregues la BD en BDScipt
#users_ref=db.collection('Userss')

''' ENDPOINTS '''
@app.route('/add', methods=['POST'])
def create():
    """
        create() : Add document to Firestore collection with request body
        Ensure you pass a custom ID as part of json body in post request
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    try:
        id = request.json['id']
        products_ref.document(id).set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/products', methods=['GET'])
def read():
    """
        read() : Fetches documents from Firestore collection as JSON
        todo : Return document that matches query ID
        all_todos : Return all documents
    """
    try:
      # localhost:8080/products => trae todos los productos de la coleccion
      # localhost:8080/products?sku=478564 => trae solo un producto

        # Check if ID was passed to URL query
        product_id = request.args.get('sku')    
        if product_id:
            todo = products_ref.document(product_id).get()
            return jsonify(todo.to_dict()), 200
        else:
            all_products = [doc.to_dict() for doc in products_ref.stream()]
            return jsonify(all_products), 200
    except Exception as e:
        return f"An Error Occured: {e}"
@app.route('/update', methods=['POST', 'PUT'])
def update():
    """
        update() : Update document in Firestore collection with request body
        Ensure you pass a custom ID as part of json body in post request
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        id = request.json['id']
        products_ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/delete', methods=['GET', 'DELETE'])
def delete():
    """
        delete() : Delete a document from Firestore collection
    """
    try:
        # Check for ID in URL query
        todo_id = request.args.get('id')
        products_ref.document(todo_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

''' INIT API '''
port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)
    # http://127.0.0.1:8080 local host
    # http://192.168.1.65:8080 ip de mi computadora
