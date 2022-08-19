from fastapi.middleware.cors import CORSMiddleware
import graphene as g
from starlette.applications import Starlette
from starlette_graphene3 import GraphQLApp, make_graphiql_handler

class Query(g.ObjectType):
    # this defines a Field `hello` in our Schema with a single Argument `name`
    hello = g.String(name=g.String(default_value="stranger"))
    goodbye = g.String()

    # our Resolver method takes the GraphQL context (root, info) as well as
    # Argument (name) for the Field and returns data for the query Response
    def resolve_hello(root, info, name):
        print(info)
        return f'Hello {name}!'

    def resolve_goodbye(root, info):
        return 'See ya!'

schema = g.Schema(query=Query)

app = Starlette()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount('/graphql', GraphQLApp(schema, on_get=make_graphiql_handler()))


