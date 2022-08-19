Another POC app that takes a poll of your favorite character from 'The Office,' and which will (eventually) feature
1. nested comments
2. push notifications

Stack: 
- **NextJS** (React frontend)
- **FastAPI** (non-Typescript, Python backend to justify GraphQL use. Would have used tRPC instead for TS backend)
- **urql** for clientside GraphQL (b/c it feels lighter than ApolloClient)
- **starlette-graphene** for serverside GQL (couldn't figure out how to get graphene to work by itself)
- **SQLAlchemy** (Python ORM)
- maybe **Alembic** for DB migrations, but doubtful cuz I'm not trying to be a Python dev
- **Docker**
- will try to deploy using **ECS** on AWS, or **Amplify** if containerizing is too hard
