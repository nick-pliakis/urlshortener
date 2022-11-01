import json, base64, hashlib, re
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Url

def index(request):
    # Simple welcome message for verifying Django functionality
    return JsonResponse({"welcome": "Welcome to the Url Shortener API!"})

@csrf_exempt
def shortenURL(request):
    # Ensure that the correct method is being used
    if request.method != "POST": 
        return JsonResponse({ "status": "error", "message": "This method is not allowed", "data": {} }, status=405)
    # TODO: Validate the existence of URL

    data = json.loads(request.body.decode("utf-8"))

    # Custom validation for URL (also catches empty URLs)
    if not validateUrl(data.get("url")):
        return JsonResponse({ "status": "error", "message": "The URL is malformed. Did you include the http(s) protocol?"}, status=400)

    result = Url.objects.filter(url=data.get("url"))
    # If URL already exists in database, do nothing and notify the user
    if result.exists():
        return JsonResponse({ "status": "error", "message": "The URL already exists!", "data": { "url": result.get().url, "shortened_url": result.get().shortened_url } }, status=409)

    new_url = Url(url=data.get("url"), shortened_url="https://tier.app/"+convertUrlToBase64(data.get("url")))
    new_url.save()
    
    # Return URL in the format of https://tier.app/{CREATED_HASH}
    return JsonResponse({ "status": "success", "message": "URL shortened successfully!", "data": { "url": new_url.url, "shortened_url": new_url.shortened_url } })
    
@csrf_exempt
def fetchStoredURL(request):
    # Ensure that the correct method is being used
    if request.method != "POST": 
        return JsonResponse({"status": "error", "message": "This method is not allowed"}, status=405)
    # TODO: Validate the existence of URL

    data = json.loads(request.body.decode("utf-8"))

    # Custom validation for URL (also catches empty URLs)
    if not validateUrl(data.get("shortened_url"), True):
        return JsonResponse({ "status": "error", "message": "The URL is malformed. Did you include the http(s) protocol and the tier.app domain?"}, status=400)

    # Raise error and notify user if URL is not in the database
    try:
        fetch_url = Url.objects.get(shortened_url=data.get("shortened_url"))
    except:
        return JsonResponse({ "status": "error", "message": "This short URL does not exist in our system!", "data": {} }, status=404)

    return JsonResponse({ "status": "success", "message": "Full URL retrieved successfully!", "data": { "url": fetch_url.url, "shortened_url": fetch_url.shortened_url } })

def convertUrlToBase64(url):
    base64_bytes = base64.urlsafe_b64encode(hashlib.shake_128(bytes(url, "ascii")).digest(10))
    return base64_bytes.decode("ascii")

def validateUrl(url, is_tier = False):
    if url is None: return False
    tier_pattern = r"https?:\/\/(www\.)?tier\.app\/[-a-zA-Z0-9@:%._\+~#=]{1,256}"
    regular_pattern = r"https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
    if is_tier:
        pattern = re.compile(tier_pattern)
    else: 
        pattern = re.compile(regular_pattern)
    return re.fullmatch(pattern, url)    
