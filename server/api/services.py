import requests
from django.core.exceptions import ImproperlyConfigured
from django.conf import settings
from django.http import JsonResponse
import base64
import io
from PIL import Image

def generate_image(prompt):
    try:
        # API URL and headers
        url = "https://Visionary-LLM.proxy-production.allthingsdev.co/generate"
        headers = {
            'x-apihub-key': settings.VISIONARY_LLM_SECRET_KEY,  # Use Django settings for the API key
            'x-apihub-host': 'Visionary-LLM.allthingsdev.co',
            'x-apihub-endpoint': 'a3a236af-e072-405a-8c4c-e540af401c08'
        }
        # Payload
        params = {'prompt': prompt}
        
        # Make the API request
        response = requests.get(url, headers=headers, params=params)
        
        # Check if request was successful
        if response.status_code == 200:
            data = response.json()
            image_url = data.get('img_url')  # Adjust based on actual key returned by API
            
            # Download and encode image
            if image_url:
                image_response = requests.get(image_url)
                if image_response.status_code == 200:
                    img = Image.open(io.BytesIO(image_response.content))
                    buffered = io.BytesIO()
                    img.save(buffered, format="PNG")
                    img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
                    return img_base64
                else:
                    return None
            else:
                return None
        else:
            return None
    
    except Exception as e:
        # Log the exception and return an error message
        print(f"Error generating image: {str(e)}")
        return None
