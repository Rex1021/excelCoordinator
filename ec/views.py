from django.shortcuts import render
from django.shortcuts import HttpResponse

from ec import models

# Create your views here.


def index(request):
    # request.POST
    # request.GET
    # return HttpResponse("Hello word")

    print(request.path)
    tables = models.ExcelTable.objects.all()
    return render(request, "index.html", {"tables": tables})

# def createTable(request):
#

