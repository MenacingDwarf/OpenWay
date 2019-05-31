from django.shortcuts import render
from django.http import JsonResponse
from .models import Claim
from django.contrib.auth import authenticate
from django.core import serializers
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def start(request):
    return render(request, 'frontend/index.html')

@ensure_csrf_cookie
def claim(request):
    if request.method == "POST":
        args = request.POST
        areas = []
        area = '; '
        for i in range(1,13):
            curarea = args.get("areaoption"+str(i))
            if curarea:
                if i != 12:
                    areas.append(curarea)
                else:
                    areas.append(args.get("comments"))
        area = area.join(areas)
        opendoors = True if args.get("opendoors") == "Да" else False
        new_claim = Claim(name=args['name'], surname=args['surname'], email=args['email'], birthday=args['birthday'],
              phone=args['phone'], area=area, knowledges=args['knowledges'], opendoors=opendoors)
        new_claim.save()
        print(dict(request.POST))
        return JsonResponse({})
    else:
        return render(request, 'frontend/index.html')

@ensure_csrf_cookie
def admin(request):
    if request.method == "GET":
        return render(request, 'frontend/index.html')
    else:
        try:
            user = authenticate(username=request.POST['login'], password=request.POST['password'])
            if user is not None:
                claims = list(Claim.objects.all())
                return JsonResponse({"message": "success", "claims": serializers.serialize("json", claims, ensure_ascii=False)})
            else:
                return JsonResponse({"message": 'Неверный пароль'})
        except ValueError:
            return JsonResponse({"message": 'Пользователь не зарегистрирован'})

@ensure_csrf_cookie
def login(request):
    if request.method == "GET":
        return render(request, 'frontend/index.html')


@ensure_csrf_cookie
def register(request):
    if request.method == "GET":
        return render(request, 'frontend/index.html')
