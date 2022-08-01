from ...models import Department


def add_new_department(dept_no, dept_name):
    Department.objects.create(dept_no=dept_no, dept_name=dept_name)
