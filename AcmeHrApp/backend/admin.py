from django.contrib import admin

from .models import Employee, DeptEmp, DeptManager, Department, Title, Salary

admin.site.register(Employee)
admin.site.register(DeptEmp)
admin.site.register(DeptManager)
admin.site.register(Department)
admin.site.register(Title)
admin.site.register(Salary)
