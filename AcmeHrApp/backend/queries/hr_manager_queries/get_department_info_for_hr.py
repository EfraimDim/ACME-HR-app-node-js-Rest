from ...models import DeptEmp
from django.db.models import Count

def get_department_info_for_hr():
    dept_info = DeptEmp.objects.select_related('dept_no').filter(
        to_date='9999-01-01').all().values('dept_no', 'dept_no__dept_name').annotate(total=Count('emp_no')).order_by('dept_no')
    return dept_info