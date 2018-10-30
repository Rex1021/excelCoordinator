from django.db import models


# Create your models here.


class ExcelTable(models.Model):
    name = models.CharField(max_length=45, unique=True, null=False, blank=False)
    presentation = models.CharField(max_length=300)
    lastUpdate = models.DateTimeField(auto_now=True)


class TableData(models.Model):
    excelTable = models.ForeignKey(ExcelTable, on_delete=models.CASCADE)
    data = models.TextField()
    lastUpdate = models.DateTimeField(auto_now=True)
