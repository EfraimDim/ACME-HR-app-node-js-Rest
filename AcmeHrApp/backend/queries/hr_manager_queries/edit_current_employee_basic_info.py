from ...models import Employee


def edit_current_employee_basic_info(first_name, last_name, gender, birth_date, employee_id, hire_date):
    Employee.objects.filter(emp_no=employee_id).update(
        first_name=first_name, last_name=last_name, gender=gender, birth_date=birth_date, hire_date=hire_date)
