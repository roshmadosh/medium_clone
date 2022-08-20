*Another POC app that takes a poll of your favorite character from 'The Office,' and which will (eventually) feature
1. nested comments
2. push notifications* -- not doing this anymore

**EDIT**: Making it a blog post app instead as it's a more trivial use-case for GraphQL. Users can comment on posts and reply to comments. May add push notifications feature.

Stack: 
- **NextJS**
- **urql** (client-side GQL)
- **graphql-yoga** (serverside GQL)
- **prisma** (ORM)
- **Docker**
- will try to deploy using AWS's **ECS**, or **Amplify** if containerizing is too hard
