from django.db import models


# Create your models here.


class ExcelTable(models.Model):
    name = models.CharField(max_length=45, unique=True)
    presentation = models.CharField(max_length=300)
