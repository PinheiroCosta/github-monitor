from django.test import TestCase
from rest_framework.serializers import ValidationError
from django.utils.timezone import make_aware, utc
from datetime import datetime
from .models import Repository, Commit
from .serializers import RepositorySerializer


class RepositoryModelTestCase(TestCase):
    def setUp(self):
        self.repo_name = "Meu Repositório"
        self.repo = Repository.objects.create(name=self.repo_name)

    def test_create_repository(self):
        """
        Testes de Criação de repositório
        """
        new_repo_name = "Novo Repositório"
        self.assertIsInstance(self.repo, Repository)

        # Criação bem-sucedida
        repo = Repository.objects.create(name=new_repo_name)
        self.assertEqual(repo.name, new_repo_name)

        # Criação com campos obrigatórios ausentes
        with self.assertRaises(ValidationError):
            RepositorySerializer(
                data={'name': ''}).is_valid(raise_exception=True)

        # Salvamento no banco de dados
        saved_repo = Repository.objects.get(name=self.repo_name)
        self.assertEqual(saved_repo.name, self.repo_name)

    def test_query_repository(self):
        """
        Testes de consulta ao repositório
        """

        # Consulta bem-sucedida
        repo = Repository.objects.get(name=self.repo_name)
        self.assertEqual(repo.name, self.repo_name)

        # Consulta com objeto inexistente
        with self.assertRaises(Repository.DoesNotExist):
            Repository.objects.get(name="Repositório Inexistente")

    def test_update_repository(self):
        """
        Testes de atualização dos campos do repositório
        """
        new_name = "Repositório Atualizado"

        # Atualização bem-sucedida
        self.repo.name = new_name
        self.repo.save()
        updated_repo = Repository.objects.get(id=self.repo.id)
        self.assertEqual(updated_repo.name, new_name)

        # Atualização com campos obrigatórios ausentes
        with self.assertRaises(ValueError):
            self.repo.name = ""
            self.repo.save()

        # Salvamento das alterações no banco de dados
        saved_repo = Repository.objects.get(id=self.repo.id)
        self.assertEqual(saved_repo.name, new_name)

    def test_delete_repository(self):
        """
        Testes de exclusão do repositório
        """

        inexistent = "Repositório Inexistente"
        # Exclusão bem-sucedida
        self.repo.delete()
        with self.assertRaises(Repository.DoesNotExist):
            Repository.objects.get(name=self.repo_name)

        # Exclusão de objeto inexistente
        with self.assertRaises(Repository.DoesNotExist):
            Repository.objects.filter(name=inexistent).delete()

    def test_repository_str_representation(self):
        """
        Testes de representação correta do objeto
        """
        expected_str = self.repo_name
        self.assertEqual(str(self.repo), expected_str)


class CommitModelTestCase(TestCase):
    def setUp(self):
        self.repo_name = "Meu Repositório"
        self.repo = Repository.objects.create(name=self.repo_name)
        self.commit_data = {
            "message": "Meu commit",
            "sha": "123456",
            "author": "Autor do Commit",
            "url": "https://example.com/commit",
            "date": make_aware(datetime.now(), timezone=utc),
            "avatar": "https://example.com/avatar",
            "repository": self.repo
        }
        self.commit = Commit.objects.create(**self.commit_data)

    def test_create_commit(self):
        """
        Testes de criação de Commit
        """

        # Criação bem-sucedida de um Commit
        commit = Commit.objects.create(**self.commit_data)
        self.assertIsInstance(commit, Commit)

        # Gravação bem-sucedida na base
        saved_commit = Commit.objects.get(id=commit.id)
        self.assertEqual(saved_commit, commit)

        # Criação de um Commit com campos obrigatórios ausentes
        with self.assertRaises(Exception):
            commit = Commit.objects.create(
                message="Meu commit",
                sha="123456",
                author="Autor do Commit",
                url="https://example.com/commit",
                date=None,  # Campo obrigatório ausente
                avatar="https://example.com/avatar",
                repository=self.repo
            )

    def test_query_commit(self):
        """
        Testes de consulta ao objeto Commit
        """

        # Consulta bem-sucedida
        commit = Commit.objects.get(id=self.commit.id)

        # Verifica se o Commit existe e tem os campos corretos
        self.assertEqual(commit.id, self.commit.id)
        self.assertEqual(commit.message, self.commit_data["message"])
        self.assertEqual(commit.sha, self.commit_data["sha"])
        self.assertEqual(commit.author, self.commit_data["author"])
        self.assertEqual(commit.url, self.commit_data["url"])
        self.assertEqual(commit.date, self.commit_data["date"])
        self.assertEqual(commit.avatar, self.commit_data["avatar"])
        self.assertEqual(commit.repository, self.repo)

        # Consulta com objeto inexistente
        with self.assertRaises(Commit.DoesNotExist):
            Commit.objects.get(id=9999)  # ID inválido

    def test_update_commit(self):
        """
        Testes de atualização dos campos do objeto Commit
        """
        new_message = "Meu commit atualizado"
        new_sha = "654321"
        new_author = "Autor Atualizado"
        new_url = "https://example.com/commit/atualizado"
        new_date = make_aware(datetime.now(), timezone=utc)
        new_avatar = "https://example.com/avatar/atualizado"

        # Atualização bem-sucedida
        self.commit.message = new_message
        self.commit.sha = new_sha
        self.commit.author = new_author
        self.commit.url = new_url
        self.commit.date = new_date
        self.commit.avatar = new_avatar
        self.commit.save()

        updated_commit = Commit.objects.get(id=self.commit.id)
        self.assertEqual(updated_commit.message, new_message)
        self.assertEqual(updated_commit.sha, new_sha)
        self.assertEqual(updated_commit.author, new_author)
        self.assertEqual(updated_commit.url, new_url)
        self.assertEqual(updated_commit.date, new_date)
        self.assertEqual(updated_commit.avatar, new_avatar)

        # Atualização com campos obrigatórios ausentes
        with self.assertRaises(ValueError):
            self.commit.message = ""
            self.commit.save()

        # Verificação de salvamento das alterações no banco de dados
        saved_commit = Commit.objects.get(id=self.commit.id)
        self.assertEqual(saved_commit.message, new_message)
        self.assertEqual(saved_commit.sha, new_sha)
        self.assertEqual(saved_commit.author, new_author)
        self.assertEqual(saved_commit.url, new_url)
        self.assertEqual(saved_commit.date, new_date)
        self.assertEqual(saved_commit.avatar, new_avatar)

    def test_delete_commit(self):
        """
        Testes de exclusão de um objeto Commit
        """

        commit = Commit.objects.create(**self.commit_data)

        # Exclusão bem-sucedida
        commit_id = commit.id
        self.commit.delete()

        with self.assertRaises(Commit.DoesNotExist):
            Commit.objects.get(id=commit_id)

        # Verificação de exclusão persistente na base
        commit_exists = Commit.objects.filter(id=commit_id).exists()
        self.assertFalse(commit_exists)

        # Exclusão de objeto Commit inexistente
        with self.assertRaises(Commit.DoesNotExist):
            self.commit.delete()
