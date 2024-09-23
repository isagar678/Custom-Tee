from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .services import generate_image

@csrf_exempt
def generate_image_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            prompt = data.get('prompt', '')
            if not prompt:
                return JsonResponse({'error': 'No prompt provided'}, status=400)

            # Call the service to generate image
            image_data = generate_image(prompt)
            if image_data:
                return JsonResponse({'photo': f"data:image/png;base64,{image_data}"}, status=200)
            else:
                return JsonResponse({'error': 'Image generation failed'}, status=500)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)
