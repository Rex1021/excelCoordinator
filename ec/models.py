from django.db import models

# Create your models here.


class ExcelTable(models.Model):
    name = models.CharField(max_length=45)
    presentation = models.CharField(max_length=300)