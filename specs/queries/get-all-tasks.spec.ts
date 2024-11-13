import { getAllTasks } from "@/graphql/resolvers/queries/get-all-tasks"
import { TaskModel } from "@/mongoose/type"

jest.mock("mongoose/type", () => ({
    TaskModel: {
        find: jest.fn()
        .mockResolvedValueOnce([{taskName: "test 1", proirity: 777, isDone: false}])
        .mockRejectedValueOnce(new Error("Database Error"))
    }
}))

describe("get all tasks", () => {
    it("should get all tasks" , async () =>{
        const response = await getAllTasks()
        expect(response).toEqual([{taskName: "test 1", proirity: 777, isDone: false}])
    })

    it("should throw an error when there is a database error", async () => {
        await expect(getAllTasks()).rejects.toThrow("failed to get tasks")
    })
})