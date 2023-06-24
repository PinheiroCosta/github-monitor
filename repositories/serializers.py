from rest_framework import serializers

from .models import Commit, Repository


class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ('name', 'id')


class CommitSerializer(serializers.ModelSerializer):
    repository_name = serializers.CharField(write_only=True)

    class Meta:
        model = Commit
        fields = (
            'message',
            'sha',
            'author',
            'url',
            'avatar',
            'date',
            'repository_name',
        )

    def create(self, validated_data):
        repository_name = validated_data.pop('repository_name')
        repository = Repository.objects.get(name=repository_name)
        validated_data['repository'] = repository
        commit = Commit.objects.create(**validated_data)
        return commit
