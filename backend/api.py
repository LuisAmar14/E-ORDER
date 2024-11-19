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
cart_ref=db.collection('ShoppingCart')
card_ref=db.collection('Checkout')
#falta esto cuando agregues la BD en BDScipt


''' ENDPOINTS '''
'''---------------------------USERS---------------------------'''
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

'''---------------------------PRODUCTS---------------------------'''
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
        category_id=request.args.get('Category') 
         

        if product_id:
            todo = products_ref.document(product_id).get()
            return jsonify(todo.to_dict()), 200
    
        if category_id:
            docs=(
                 products_ref.where(filter=FieldFilter("Category", "==", category_id)).stream()
            )
            products = [doc.to_dict() for doc in docs]
            return jsonify(products),200 
        else:
            all_products = [doc.to_dict() for doc in products_ref.stream()]
            return jsonify(all_products), 200
    except Exception as e:
        return f"An Error Occured: {e}"
    '''---------------------------CART---------------------------'''
@app.route('/cart', methods=['GET', 'POST', 'PUT'])
def manage_cart():
    try:
        user_id = request.args.get('user_id')
        sku = request.args.get('sku')

        # Handle GET request
        if request.method == 'GET':
            if user_id:
                if sku:
                    # Fetch specific product in the cart for the user
                    docs = cart_ref.where('user_id', '==', user_id).where('sku', '==', sku).stream()
                    cart_items = [doc.to_dict() for doc in docs]
                    if cart_items:
                        return jsonify(cart_items[0]), 200  # Return single product
                    return jsonify({"message": "Product not found in cart"}), 404
                else:
                    # Fetch all cart items for the user
                    docs = cart_ref.where('user_id', '==', user_id).stream()
                    cart_items = [doc.to_dict() for doc in docs]
                    return jsonify(cart_items), 200  # Return all products for the user
            else:
                # Fetch all cart items for all users
                all_cart_items = [doc.to_dict() for doc in cart_ref.stream()]
                return jsonify(all_cart_items), 200

        # Handle POST request (adding a product to cart)
        if request.method == 'POST':
            if not user_id or not sku:
                return jsonify({"message": "User ID and SKU are required"}), 400

            qty = request.json.get('qty')
            price_unit = request.json.get('price_unit')

            if not qty or not price_unit:
                return jsonify({"message": "Quantity and price_unit are required"}), 400

            total = price_unit * qty

            cart_ref.add({
                'user_id': user_id,
                'sku': sku,
                'qty': qty,
                'price_unit': price_unit,
                'total': total
            })
            return jsonify({"message": "Product added to cart successfully"}), 200

        # Handle PUT request (updating a product in the cart)
        if request.method == 'PUT':
            if not user_id or not sku:
                return jsonify({"message": "User ID and SKU are required"}), 400

            qty = request.json.get('qty')
            price_unit = request.json.get('price_unit')

            if not qty or not price_unit:
                return jsonify({"message": "Quantity and price_unit are required"}), 400

            total = price_unit * qty

            # Find the cart item using user_id and sku
            existing_cart_item = cart_ref.where('user_id', '==', user_id).where('sku', '==', sku).stream()
            existing_cart_items = [doc for doc in existing_cart_item]

            if existing_cart_items:
                # Update the cart item
                for doc in existing_cart_items:
                    doc.reference.update({
                        'qty': qty,
                        'price_unit': price_unit,
                        'total': total
                    })
                return jsonify({"message": "Cart item updated successfully"}), 200
            else:
                return jsonify({"message": "Product not found in cart"}), 404

    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500




@app.route('/cart/delete', methods=['DELETE'])
def delete_cart_items():
    """
        delete_cart_items() : Deletes all items in the cart for a specific user or a specific product (SKU) for a user.
    """
    try:
        # Get user_id and optional sku from query parameters
        user_id = request.args.get('user_id')
        sku = request.args.get('sku')

        if not user_id:
            return jsonify({"message": "User ID is required"}), 400

        # If SKU is provided, delete only that specific product for the user
        if sku:
            cart_items = cart_ref.where('user_id', '==', user_id).where('sku', '==', sku).stream()
            deleted_count = 0
            for item in cart_items:
                item.reference.delete()
                deleted_count += 1

            if deleted_count > 0:
                return jsonify({"message": f"Deleted {deleted_count} item(s) with SKU {sku} from the cart for user {user_id}"}), 200
            else:
                return jsonify({"message": "No cart items found for this SKU and user"}), 404

        # If no SKU is provided, delete all products for the user
        else:
            cart_items = cart_ref.where('user_id', '==', user_id).stream()
            deleted_count = 0
            for item in cart_items:
                item.reference.delete()
                deleted_count += 1

            if deleted_count > 0:
                return jsonify({"message": f"Deleted {deleted_count} item(s) from the cart for user {user_id}"}), 200
            else:
                return jsonify({"message": "No cart items found for this user"}), 404

    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500


'''---------------------------CHECKOUT---------------------------'''
@app.route('/checkout', methods=['POST'])
def checkout():
    try:
        # Retrieve the user_id from the request body
        user_id = request.json.get('userID')
        
        if not user_id:
            return jsonify({"message": "User ID is required"}), 400
        
        # Check if the user already has a checkout document
        checkout_ref = card_ref.document(user_id)
        checkout_doc = checkout_ref.get()

        if checkout_doc.exists:
            return jsonify({"message": "Checkout already completed for this user"}), 400
        
        # If no checkout data exists, add the checkout data
        checkout_data = {
            "First_Name": request.json.get('First_Name'),
            "Last_Name": request.json.get('Last_Name'),
            "Number": request.json.get('Number'),
            "Expiry": request.json.get('Expiry'),
            "CVV": request.json.get('CVV'),
            "Total": request.json.get('Total'),
            "userID": user_id
        }

        # Add the data to the Checkout collection
        card_ref.document(user_id).set(checkout_data)
        
        return jsonify({"success": True, "message": "Checkout data saved successfully"}), 200

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