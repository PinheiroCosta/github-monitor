from rest_framework import serializers

from .models import Commit, Repository


class RepositoryRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        return value.name

    def to_internal_value(self, data):
        try:
            return Repository.objects.get(name=data)
        except Repository.DoesNotExist:
            raise serializers.ValidationError("Invalid repository")


class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ('name', 'id')

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Repository name can't be empty")
        return value


class CommitSerializer(serializers.ModelSerializer):
    repository = RepositoryRelatedField(queryset=Repository.objects.all())

    class Meta:
        model = Commit
        fields = (
            'message',
            'sha',
            'author',
            'url',
            'avatar',
            'date',
            'repository',
        )

    def create(self, validated_data):
        repository = validated_data.pop('repository')
        validated_data['repository'] = repository
        commit = Commit.objects.create(**validated_data)
        return commit
