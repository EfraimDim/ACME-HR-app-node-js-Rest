from ...models import Title
from ...serializers import TitleSerializer

def get_employee_title_info(employee_id):
    title_info = Title.objects.filter(emp_no = employee_id).order_by('-to_date').all()
    serialized_title_info = TitleSerializer(title_info, many=True)
    return serialized_title_info.data
