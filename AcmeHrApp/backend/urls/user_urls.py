from django.urls import path
from ..views.users_views import user_login, get_my_information, get_next_group_of_colleagues

urlpatterns = [
    path('login', user_login, name="login"),
    path('getMyInformation', get_my_information, name="get_my_information"),
    path('getNextGroupColleagues', get_next_group_of_colleagues, name="get_next_group_of_colleagues"),
]
