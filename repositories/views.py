from .models import Commit, Repository
from .serializers import CommitSerializer, RepositorySerializer
from .pagination import CommitPagination, RepositoryPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.response import Response
from django_filters import FilterSet, CharFilter
from django_filters.rest_framework import DjangoFilterBackend


class CommitFilter(FilterSet):
    repository = CharFilter(
        field_name='repository__name',
        lookup_expr='icontains'
    )

    author = CharFilter(
        field_name='author__username',
        lookup_expr='icontains'
    )

    class Meta:
        model = Commit
        fields = ['repository', 'author']


class CommitCreate(generics.CreateAPIView):
    """
    Create a new Commit
    """
    permission_classes = [IsAuthenticated]
    serializer_class = CommitSerializer

    def post(self, request, format=None):
        serializer = CommitSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class CommitList(generics.ListAPIView):
    """
    List all Commits
    """
    permission_classes = [IsAuthenticated]
    serializer_class = CommitSerializer
    pagination_class = CommitPagination
    filterset_class = CommitFilter
    filter_backends = [DjangoFilterBackend]
    queryset = Commit.objects.all()

    def get_queryset(self):
        name = self.request.GET.get("name")
        if name:
            return Repository.objects.filter(name__icontains=name)
        else:
            return Commit.objects.all()


class RepositoryCreate(generics.CreateAPIView):
    """
    Create a new Repository
    """
    permission_classes = [IsAuthenticated]
    serializer_class = RepositorySerializer


class RepositoryList(generics.ListAPIView):
    """
    List all Repositories
    """
    permission_classes = [IsAuthenticated]
    serializer_class = RepositorySerializer
    pagination_class = RepositoryPagination

    def get_queryset(self):
        name = self.request.GET.get("name")
        if name:
            return Repository.objects.filter(name__icontains=name)
        else:
            return Repository.objects.all()
