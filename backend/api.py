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
def modifyuser():
    try:
        if request.method == 'GET': 
            user_id = request.args.get('ID')
            if user_id:
                todo = users_ref.document(user_id).get()
                return jsonify(todo.to_dict()), 200

        elif request.method == 'POST': 
            user_data = request.json

            # Add user data and let Firebase automatically generate the document ID
            result = users_ref.add(user_data)
            new_user_ref = result[1]  # Get the DocumentReference
            generated_id = new_user_ref.id  # Get the generated ID

            # Update the document with the generated ID in the 'ID' field
            new_user_ref.update({"ID": generated_id})  # Add the 'ID' field with the document ID

            # Return the response with the correct document ID
            return jsonify({
                "success": True, 
                "id": generated_id,  # Firebase-generated document ID
                "user_id": generated_id  # The ID field added to the document
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
def validate_qty(qty):
    if qty < 1:
        return False
    return True


@app.route('/cart', methods=['POST'])
def add_to_cart():
    try:
        user_id = request.args.get('user_id')
        if not user_id:
            return jsonify({"message": "User ID is required"}), 400
        
        request_data = request.get_json()
        products = request_data.get('products')
        
        if not products or not isinstance(products, list):
            return jsonify({"message": "Products should be a list"}), 400

        cart_doc_ref = cart_ref.document(user_id)
        cart_doc = cart_doc_ref.get()

        if not cart_doc.exists:
            cart_ref.document(user_id).set({
                'user_id': user_id,
                'cart_items': [],
                'final_total': 0
            })
            cart_doc = cart_ref.document(user_id).get()

        cart_data = cart_doc.to_dict()
        cart_items = cart_data.get('cart_items', [])

        for product in products:
            sku = product.get('sku')
            qty = product.get('qty')

            if not sku or not qty:
                return jsonify({"message": "SKU and quantity are required"}), 400

            if not validate_qty(qty):
                return jsonify({"message": "Quantity must be greater than 0"}), 400

            product_docs = products_ref.where("SKU", "==", sku).limit(1).get()
            if not product_docs:
                return jsonify({"message": f"Product with SKU {sku} not found"}), 404

            product_data = product_docs[0].to_dict()
            price_unit = product_data.get('Price')

            if price_unit is None or not isinstance(price_unit, (int, float)):
                return jsonify({"message": "Product price not available or is not a valid number"}), 400

            total = price_unit * qty

            product_found = False
            for item in cart_items:
                if item['sku'] == sku:
                    item['qty'] += qty
                    item['total'] = item['price_unit'] * item['qty']
                    product_found = True
                    break

            if not product_found:
                cart_items.append({
                    'sku': sku,
                    'qty': qty,
                    'price_unit': price_unit,
                    'total': total,
                    'status': 'active'
                })

        final_total = round(sum(item['total'] for item in cart_items), 2)

        cart_doc_ref.update({
            'cart_items': cart_items,
            'final_total': final_total
        })

        return jsonify({"message": "Products added to cart successfully"}), 200
    
    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500


@app.route('/cart', methods=['GET'])
def get_cart():
    try:
        user_id = request.args.get('user_id')
        if not user_id:
            return jsonify({"message": "User ID is required"}), 400

        cart_doc_ref = cart_ref.document(user_id)
        cart_doc = cart_doc_ref.get()

        if not cart_doc.exists:
            return jsonify({"message": "Cart not found for this user"}), 404

        cart_data = cart_doc.to_dict()
        final_total = round(cart_data.get("final_total", 0), 2)

        return jsonify({
            "cart_items": cart_data.get("cart_items", []),
            "final_total": "{:.2f}".format(final_total)
        }), 200
    
    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500


@app.route('/cart', methods=['PUT'])
def update_cart_item():
    try:
        user_id = request.args.get('user_id')
        if not user_id:
            return jsonify({"message": "User ID is required"}), 400
        
        request_data = request.get_json()
        sku = request_data.get('sku')
        new_sku = request_data.get('new_sku')
        new_qty = request_data.get('new_qty')

        if not sku or (new_qty is None and not new_sku):
            return jsonify({"message": "SKU, new quantity, and/or new SKU are required"}), 400

        if new_qty is not None and not validate_qty(new_qty):
            return jsonify({"message": "Quantity must be greater than 0"}), 400

        cart_doc_ref = cart_ref.document(user_id)
        cart_doc = cart_doc_ref.get()

        if not cart_doc.exists:
            return jsonify({"message": "Cart not found for this user"}), 404

        cart_data = cart_doc.to_dict()
        cart_items = cart_data.get('cart_items', [])

        product_found = False
        for item in cart_items:
            if item['sku'] == sku:
                if new_sku:
                    item['sku'] = new_sku

                if new_qty is not None:
                    item['qty'] = new_qty

                final_sku = new_sku if new_sku else sku
                product_docs = products_ref.where("SKU", "==", final_sku).limit(1).get()
                if not product_docs:
                    return jsonify({"message": f"Product with SKU {final_sku} not found"}), 404

                product_data = product_docs[0].to_dict()
                price_unit = product_data.get('Price')

                if price_unit is None or not isinstance(price_unit, (int, float)):
                    return jsonify({"message": "Product price is not available or not valid"}), 400

                item['price_unit'] = price_unit
                item['total'] = price_unit * item['qty']

                product_found = True
                break

        if not product_found:
            return jsonify({"message": "Product not found in the cart"}), 404

        final_total = sum(item['total'] for item in cart_items)

        cart_doc_ref.update({
            'cart_items': cart_items,
            'final_total': round(final_total, 2)
        })

        return jsonify({"message": "Cart item updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500


@app.route('/cart/remove', methods=['DELETE'])
def remove_from_cart():
    try:
        # Get user_id and sku from the request
        user_id = request.args.get('user_id')
        if not user_id:
            return jsonify({"message": "User ID is required"}), 400

        sku = request.args.get('sku')
        if not sku:
            return jsonify({"message": "SKU is required"}), 400

        # Reference to the user's cart document
        cart_doc_ref = cart_ref.document(user_id)
        cart_doc = cart_doc_ref.get()

        if not cart_doc.exists:
            return jsonify({"message": "Cart not found for this user"}), 404

        # Get the cart data
        cart_data = cart_doc.to_dict()
        cart_items = cart_data.get('cart_items', [])

        # Check if the item with the given SKU exists in the cart
        product_found = False
        for item in cart_items:
            if item['sku'] == int(sku):  # Make sure sku is treated as an integer
                cart_items.remove(item)
                product_found = True
                break

        if not product_found:
            return jsonify({"message": "Product not found in the cart"}), 404

        # Recalculate the final total, ensuring it defaults to 0 if no items are left
        if cart_items:
            final_total = sum(item['total'] for item in cart_items)
        else:
            final_total = 0.0

        # Update Firestore with the new cart items and final total
        cart_doc_ref.update({
            'cart_items': cart_items,
            'final_total': round(final_total, 2)  # Ensure it's rounded to two decimal places
        })

        return jsonify({"message": "Product removed from cart successfully"}), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500

'''---------------------------CHECKOUT---------------------------'''
@app.route('/checkout/<user_id>', methods=['POST'])
def checkout(user_id):
    try:
        # Retrieve the user's shopping cart from Firestore
        cart_ref = db.collection('ShoppingCart')
        cart_doc_ref = cart_ref.document(user_id)
        cart_doc = cart_doc_ref.get()

        # If the cart doesn't exist for the user, return an error
        if not cart_doc.exists:
            return jsonify({"message": "Shopping cart not found for this user"}), 404
        
        cart_data = cart_doc.to_dict()
        cart_items = cart_data.get('cart_items', [])
        final_total = cart_data.get('final_total', 0)

        # If the cart is empty (final_total is 0), return an error
        if final_total == 0 or not cart_items:
            return jsonify({"message": "Cart is empty"}), 400

        # Retrieve the card information from the request body
        card_info = {
            "First_Name": request.json.get('First_Name'),
            "Last_Name": request.json.get('Last_Name'),
            "Number": int(request.json.get('Number')),  # Convert to int for the card number
            "Expiry": str(request.json.get('Expiry')),  # Keep as string (for example '12/25')
            "CVV": int(request.json.get('CVV')),  # Convert to int for CVV
            "Total": final_total  # Use the final total from the cart
        }

        # Add the checkout data to the Checkout collection using user_id as the document ID
        card_ref = db.collection('Checkout')
        checkout_doc_ref = card_ref.document(user_id)
        checkout_doc_ref.set(card_info)

        return jsonify({"success": True, "message": "Checkout data saved successfully"}), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500










''' INIT API '''
port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)
    # http://127.0.0.1:8080 local host
    # http://192.168.1.65:8080 ip de mi computadora