from ...models import Title
from datetime import datetime


def add_new_title(title_name):
    Title.objects.create(emp_no_id=35128, title=title_name,
                         from_date=datetime.strptime('2000-01-01', '%Y-%m-%d'), to_date=datetime.strptime('2000-01-02', '%Y-%m-%d'))
