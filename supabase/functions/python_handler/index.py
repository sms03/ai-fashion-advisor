
import json
from typing import Dict, Any

def handle_request(event: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
    """
    Handle incoming requests to the Python function
    """
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
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
            },
            "body": json.dumps(result)
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
            },
            "body": json.dumps({"error": str(e)})
        }

