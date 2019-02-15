namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * graphql-mock-server helpers for Cypress
     *
     * `setGQLMock*` APIs set mock
     *
     * @see https://github.com/sandiiarov/graphql-mock-server
     *
     */
    setGQLMock<T>(mocks: T): Cypress.Chainable<Response>;
    /**
     * graphql-mock-server helpers for Cypress
     *
     * `resetGQLMock*` APIs reset previous mock
     *
     * @see https://github.com/sandiiarov/graphql-mock-server
     *
     */
    resetGQLMock(): Cypress.Chainable<Response>;
  }
}

const serialize = <T>(body: T) =>
  Object.entries(body).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value.toString() }),
    {}
  );

Cypress.Commands.add('setGQLMock', <T>(mocks: T) => {
  const body = serialize(mocks);
  cy.request('POST', `${Cypress.env('GRAPHL_MOCK_SERVER')}/mock`, body);
});

Cypress.Commands.add('resetGQLMock', () => {
  cy.request('POST', `${Cypress.env('GRAPHL_MOCK_SERVER')}/reset`);
});
