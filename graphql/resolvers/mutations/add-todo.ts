import { TodoModel } from "@/graphql/momgodb/todoModel";

type todo_input = {
    title:string,
    status:string
}

export const AddTodo = async (_: unknown, { todo }: { todo: todo_input }) => {
    try{
        const response = await TodoModel.create({
            title:todo.title,
            status:todo.status
        });
        return response
    }catch(error){
        console.error(error)
    }
};