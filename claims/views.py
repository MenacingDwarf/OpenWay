from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from .models import Claim, UserAdmin, UserStudent
from django.contrib.auth import authenticate, logout, login
from django.forms.models import model_to_dict
from django.core import serializers
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def start(request):
    return render(request, 'frontend/index.html')


@ensure_csrf_cookie
def claim(request):
    if request.method == "POST" and request.user.is_authenticated:
        args = request.POST
        areas = []
        area = '; '
        for i in range(1, 13):
            curarea = args.get("areaoption" + str(i))
            if curarea:
                if i != 12:
                    areas.append(curarea)
                else:
                    areas.append(args.get("comments"))
        area = area.join(areas)
        opendoors = True if args.get("opendoors") == "Да" else False
        new_claim = Claim(sender=UserStudent.objects.get(user=request.user), name=args['name'], surname=args['surname'],
                          email=args['email'], birthday=args['birthday'],
                          phone=args['phone'], area=area, knowledges=args['knowledges'], opendoors=opendoors)
        new_claim.save()
        return JsonResponse({})
    else:
        return render(request, 'frontend/index.html')


def accept_claim(request):
    if request.method == "POST":
        print(request.POST.get('id'))
        claim = Claim.objects.get(id=request.POST.get('id'))
        claim.status = "Принята"
        claim.accepted_admin = UserAdmin.objects.get(user=request.user)
        claim.save()
        return JsonResponse({})


def decline_claim(request):
    if request.method == "POST":
        print(request.POST.get('id'))
        claim = Claim.objects.get(id=request.POST.get('id'))
        claim.status = "Отклонена"
        claim.save()
        return JsonResponse({})


@ensure_csrf_cookie
def admin(request):
    if request.method == "POST":
        claims = list(Claim.objects.all())
        return JsonResponse({"claims": serializers.serialize("json", claims, ensure_ascii=False)})
    else:
        return render(request, 'frontend/index.html')


def change_admin(request):
    if request.method == "POST":
        print(request.POST)
        admin = UserAdmin.objects.get(user=request.user)
        admin.answer = request.POST.get('answer')
        admin.task = request.POST.get('task')
        admin.save()
        return JsonResponse({})


@ensure_csrf_cookie
def log_in(request):
    if request.method == "GET":
        return render(request, 'frontend/index.html')
    else:
        try:
            user = authenticate(username=request.POST['login'], password=request.POST['password'])
            if user is not None:
                login(request, user)
                try:
                    return JsonResponse(
                        {'is_auth': True, 'message': 'success',
                         'user_info': {'type': 'admin',
                                       'info': model_to_dict(UserAdmin.objects.get(user=request.user))}})
                except UserAdmin.DoesNotExist:
                    try:
                        claim = model_to_dict(Claim.objects.get(sender=UserStudent.objects.get(user=request.user)))
                        if claim['status'] == "Принята":
                            claim['admin'] = model_to_dict(UserAdmin.objects.get(id=claim['accepted_admin']))
                        return JsonResponse(
                            {'is_auth': True, 'message': 'success',
                             'user_info': {'type': 'student',
                                           'info': model_to_dict(UserStudent.objects.get(user=request.user)),
                                           'claim': claim}})
                    except Claim.DoesNotExist:
                        return JsonResponse(
                            {'is_auth': True, 'message': 'success',
                             'user_info': {'type': 'student',
                                           'info': model_to_dict(UserStudent.objects.get(user=request.user))}})
            else:
                return JsonResponse({'message': 'Неверный пароль'})
        except ValueError:
            return JsonResponse({'message': 'Пользователь не зарегистрирован'})


def get_user(request):
    if request.user.is_authenticated:
        try:
            return JsonResponse(
                {'is_auth': True, 'message': 'success',
                 'user_info': {'type': 'admin', 'info': model_to_dict(UserAdmin.objects.get(user=request.user))}})
        except UserAdmin.DoesNotExist:
            try:
                claim = model_to_dict(Claim.objects.get(sender=UserStudent.objects.get(user=request.user)))
                if claim['status'] == "Принята":
                    claim['admin'] = model_to_dict(UserAdmin.objects.get(id=claim['accepted_admin']))
                return JsonResponse(
                    {'is_auth': True, 'message': 'success',
                     'user_info': {'type': 'student',
                                   'info': model_to_dict(UserStudent.objects.get(user=request.user)),
                                   'claim': claim}})
            except Claim.DoesNotExist:
                return JsonResponse(
                    {'is_auth': True, 'message': 'success',
                     'user_info': {'type': 'student',
                                   'info': model_to_dict(UserStudent.objects.get(user=request.user))}})
    else:
        return JsonResponse({'is_auth': False})


def log_out(request):
    logout(request)
    return JsonResponse({})


@ensure_csrf_cookie
def register(request):
    if request.method == "GET":
        return render(request, 'frontend/index.html')
    else:
        try:
            user = User.objects.get(username=request.POST['login'])
            return JsonResponse({'message': 'Пользователь уже зарегистрирован'})
        except User.DoesNotExist:
            user = User.objects.create_user(request.POST['login'], request.POST['email'], request.POST['password'])
            user.save()
            student = UserStudent(user=user, name=request.POST['name'], email=request.POST['email'],
                                  surname=request.POST['surname'], birthday=request.POST['birthday'],
                                  phone=request.POST['phone'])
            student.save()
            login(request, user)
            return JsonResponse(
                {'is_auth': True, 'message': 'success',
                 'user_info': {'type': 'student', 'info': model_to_dict(student)}})
