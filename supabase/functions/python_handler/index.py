
import json
from typing import Dict, Any

def handle_request(event: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
    """
    Handle incoming requests to the Python function
    """
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        "Content-Type": "application/json"
    }

    # Handle CORS preflight request
    if event.get('method', '') == 'OPTIONS':
        return {
            "statusCode": 204,
            "headers": cors_headers,
            "body": ""
        }

    try:
        # Parse the request body
        body = json.loads(event.get('body', '{}'))
        
        # Your Python logic here
        result = {
            "message": "Hello from Python!",
            "received_data": body
        }
        
        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps(result)
        }
    except Exception as e:
        print(f"Error in Python handler: {str(e)}")  # Add logging
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"error": str(e)})
        }

