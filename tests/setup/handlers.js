import { graphql } from 'msw';

export const handlers = [
  graphql.query()
]