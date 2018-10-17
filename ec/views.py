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
    # if "/index/" == request.path:
    #     return find_all_tables(request)
    # if "/index/createTable" == request.path:
    #     return create_table(request)
    # return HttpResponse("something wrong")
    tables = models.ExcelTable.objects.all()
    return render(request, "index.html", {"tables": tables})


def edit_table(request):
    tid = request.POST.get("id")
    title = request.POST.get("title")
    presentation = request.POST.get("presentation")
    try:
        if "" == tid:
            table = models.ExcelTable.objects.create(name=title, presentation=presentation)
        else:
            table = models.ExcelTable.objects.get(id=tid)
            table.name = title
            table.presentation = presentation
        table.save()
        return HttpResponse("ok")
    except IntegrityError as msg:
        return HttpResponse(msg)


def delete_table(request, tabid):
    try:
        table = models.ExcelTable.objects.get(id=tabid)
        table.delete()
        return HttpResponse("ok")
    except Exception as msg:
        return HttpResponse(msg)


def view_table(request):
    return render(request, "table.html")
