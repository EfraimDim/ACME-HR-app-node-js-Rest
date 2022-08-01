from ...models import Salary
from ...serializers import SalariesSerializer


def get_employee_salary_info(employee_id):
    salary_info = Salary.objects.filter(
        emp_no=employee_id).order_by('-to_date').all()
    serialized_salary_info = SalariesSerializer(salary_info, many=True)
    return serialized_salary_info.data
