from ...models import Title

def get_titles_list():
    return Title.objects.order_by().values('title').distinct()