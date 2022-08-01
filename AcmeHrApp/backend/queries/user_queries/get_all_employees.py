from ...models import Employee
from ...serializers import EmployeesAndTitles


def get_all_employees(limit, offset):
    real_offset = offset + limit
    # print(real_offset)
    colleagues = Employee.objects.select_related('title').filter(
        title__to_date='9999-01-01').order_by('-hire_date').all()[offset:real_offset]
    return EmployeesAndTitles(colleagues, many=True).data
