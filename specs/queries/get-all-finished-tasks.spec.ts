import { getAllTasks } from "@/graphql/resolvers/queries/getAllTask-query";

describe("GetAll Query", () => {
  it("Should Get All query", () => {
    expect(getAllTasks()).toBeDefined();
  });
});
