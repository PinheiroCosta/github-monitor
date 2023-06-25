from django.urls import path
from .views import (
    CommitCreate,
    CommitList,
    RepositoryCreate,
    RepositoryList,
    GithubToken,
)

app_name = 'repositories'

urlpatterns = [
    path('api/commits/create/',
         CommitCreate.as_view(),
         name='commits-create'
         ),
    path('api/commits/',
         CommitList.as_view(),
         name='commits-list'
         ),
    path('api/repositories/create/',
         RepositoryCreate.as_view(),
         name='repositories-create'
         ),
    path('api/repositories/',
         RepositoryList.as_view(),
         name='repositories-list'
         ),
    path('github-token/',
         GithubToken.as_view(),
         name='github_token'
         ),
]
