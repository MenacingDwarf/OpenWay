from django.shortcuts import render
from django.http import JsonResponse


def start(request):
    return render(request, 'frontend/index.html')


def claim(request):
    if request.method == "POST":
        print(request.POST['name'])
        return JsonResponse({})
    else:
        return render(request, 'frontend/index.html')
