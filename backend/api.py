import os
from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
from google.cloud.firestore_v1.base_query import FieldFilter

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
users_ref = db.collection('Users')
#falta esto cuando agregues la BD en BDScipt
#users_ref=db.collection('Userss')

''' ENDPOINTS '''
#POST USER- agregar y traer usuario
@app.route('/User', methods=['POST', 'GET'])
def createuser():
    try:
        if request.method == 'GET': 
            user_id = request.args.get('ID')
            if user_id:
                todo = users_ref.document(user_id).get()
                return jsonify(todo.to_dict()), 200

        elif request.method == 'POST': 
            user_data = request.json
            
            # Add the user data and let Firebase automatically generate the document ID
            result = users_ref.add(user_data)
            
            # Access the second element of the tuple (the DocumentReference)
            new_user_ref = result[1]
            
            # Return the response with the correct document ID
            return jsonify({
                "success": True, 
                "id": new_user_ref.id,  # Firebase-generated document ID
                "user_id": user_data.get('ID')  # Manually specified user ID in the document
            }), 200
        else:
            return jsonify({"Message": "No existe endpoint"}), 200
    except Exception as e:
        return f"An Error Occured: {e}"
    
#PUT USER- Modificar usuario
@app.route('/User/<user_id>', methods=['PUT'])
def update_user(user_id):
    """
    Update user credentials (like email, password) in Firestore
    :param user_id: The ID of the user to update
    :return: Success or error response
    """
    try:
        user_data = request.json  # The updated user data from the request

        # Fetch the user's document by ID
        user_ref = users_ref.document(user_id)
        user_doc = user_ref.get()

        # Check if the user exists
        if not user_doc.exists:
            return jsonify({"error": "User not found"}), 404

        # Update the user's data in Firestore
        user_ref.update(user_data)

        return jsonify({
            "success": True,
            "message": "User updated successfully",
            "updated_data": user_data
        }), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500

        

    
#ESTO ES DEL EJEMPLO

@app.route('/add', methods=['POST']) #ignora, esto es un ejemplo
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
