from ...models import DeptManager


def get_department_manager_info_for_hr():
    return DeptManager.objects.select_related('emp_no').filter(
        to_date='9999-01-01').all().values('dept_no', 'emp_no', 'emp_no__first_name', 'emp_no__last_name').order_by('dept_no')
