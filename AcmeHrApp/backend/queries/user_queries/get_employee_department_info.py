from ...models import DeptEmp
from ...serializers import DepartmentSerializer, DeptEmpSerializer

def get_employee_department_info(employee_id):
    dept_info = DeptEmp.objects.select_related('dept_no').filter(emp_no = employee_id).order_by('-to_date').all()
    serialized_dept_info = []
    for emp in dept_info:
        serialized_dept_name = DepartmentSerializer(emp.dept_no)
        serialized_dept_emp = DeptEmpSerializer(emp)
        serialized_data = {'departments' : serialized_dept_name.data, 'dept_emp' : serialized_dept_emp.data}
        serialized_dept_info.append(serialized_data)
    return serialized_dept_info
