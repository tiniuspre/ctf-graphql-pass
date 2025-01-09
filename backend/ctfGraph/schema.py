import graphene
from graphql_auth.schema import UserNode
from graphql_auth.settings import graphql_auth_settings as app_settings
from graphql_auth import mutations
from django.contrib.auth import get_user_model

from graphene_django.filter.fields import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType


class User2Node(UserNode):
    class Meta:
        model = get_user_model()
        filter_fields = app_settings.USER_NODE_FILTER_FIELDS
        exclude = ("is_superuser", "secret_note")
        interfaces = (graphene.relay.Node,)
        skip_registry = True


class UserQuery(graphene.ObjectType):
    user = graphene.relay.Node.Field(User2Node)
    users = DjangoFilterConnectionField(User2Node)


class MeQuery(graphene.ObjectType):
    me = graphene.Field(UserNode)

    def resolve_me(self, info):
        user = info.context.user
        if user.is_authenticated:
            return user
        return None


class Query(UserQuery, MeQuery, graphene.ObjectType):
    pass


class AuthMutation(graphene.ObjectType):
   register = mutations.Register.Field()
   verify_account = mutations.VerifyAccount.Field()
   token_auth = mutations.ObtainJSONWebToken.Field()
   update_account = mutations.UpdateAccount.Field()


class Mutation(AuthMutation, graphene.ObjectType):
   pass


schema = graphene.Schema(query=Query, mutation=Mutation)
