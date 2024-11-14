import { sayHello } from "@/graphql/resolvers/mutations/addTask";

describe("Hello Mutation", () => {
  it("Should call say hello mutation with name input", () => {
    expect(sayHello({}, { name: "hello" })).toBeDefined();
  });
});
