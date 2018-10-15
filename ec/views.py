from django.db import IntegrityError
from django.http import HttpResponseRedirect, HttpResponseServerError
from django.shortcuts import render
from django.shortcuts import HttpResponse

from ec import models


# Create your views here.


def index(request):
    # request.POST
    # request.GET
    # return HttpResponse("Hello word")
    if "/index/" == request.path:
        return find_all_tables(request)
    if "/index/createTable" == request.path:
        return create_table(request)
    return HttpResponse("something wrong")


def find_all_tables(request):
    tables = models.ExcelTable.objects.all()
    return render(request, "index.html", {"tables": tables})


def create_table(request):
    title = request.POST.get("title")
    presentation = request.POST.get("presentation")
    print(title, presentation)
    try:
        table = models.ExcelTable.objects.create(name=title, presentation=presentation)
        table.save()
        return HttpResponseRedirect("/index/")
    except IntegrityError as msg:
        print(msg)
        return HttpResponse("<javascript>alert('1111')<javascript>")



