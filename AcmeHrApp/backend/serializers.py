from rest_framework import serializers
from .models import Employee, DeptEmp, DeptManager, Department, Title, Salary

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class DeptEmpSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeptEmp
        fields = '__all__'

class DeptManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeptManager
        fields = '__all__'

class SalariesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salary
        fields = '__all__'

class TitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Title
        fields = '__all__'

class EmployeesAndTitles(serializers.ModelSerializer):
    title = TitleSerializer()

    class Meta:
        model = Employee
        fields = ('emp_no', 'birth_date', 'first_name', 'last_name', 'gender', 'hire_date', 'title')
        related_object = 'title'
        