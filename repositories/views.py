from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Commit, Repository
from .serializers import CommitSerializer, RepositorySerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def commit_create_view(request):
    commits = request.data
    serializer = CommitSerializer(data=commits, many=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def commit_list_view(request):
    commits = Commit.objects.all()
    serializer = CommitSerializer(commits, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def repository_create_view(request):
    serializer = RepositorySerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def repository_list_view(request):
    name = request.GET.get("name")

    if name:
        repositories = Repository.objects.filter(name__icontains=name)
    else:
        repositories = Repository.objects.all()

    serializer = RepositorySerializer(repositories, many=True)
    return Response(serializer.data)
