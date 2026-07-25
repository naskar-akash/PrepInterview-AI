from flask import Blueprint, request, jsonify
from ..controller.payment_controller import create_order, verify_payment
from ..middleware.is_auth import is_auth

payment_bp = Blueprint('payment', __name__, url_prefix='/payment')

@payment_bp.route('/create-order', methods=["POST"])
@is_auth
def create_order_route(cur_user=None):
    data = request.get_json()
    plan_id = data.get("plan_id")
    amount = data.get("amount")
    credits = data.get("credits")
    response,status_code = create_order(cur_user.id, plan_id, amount, credits)
    return response, status_code

@payment_bp.route('/verify', methods=['POST'])
@is_auth
def verify_payment_route(cur_user=None):
    data = request.get_json()
    razorpay_order_id = data.get("razorpay_order_id")
    razorpay_payment_id = data.get("razorpay_payment_id")
    razorpay_signature = data.get("razorpay_signature")
    response, status_code = verify_payment(razorpay_order_id, razorpay_payment_id, razorpay_signature)
    return response, status_code