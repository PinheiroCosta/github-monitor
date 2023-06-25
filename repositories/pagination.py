from rest_framework.pagination import PageNumberPagination


class CommitPagination(PageNumberPagination):
    page_size = 10


class RepositoryPagination(PageNumberPagination):
    page_size = 20
