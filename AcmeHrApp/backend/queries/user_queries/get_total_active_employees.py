from ...models import DeptEmp


def get_total_active_employees():
    total_employees = DeptEmp.objects.filter(
        to_date='9999-01-01').count()
    return total_employees
