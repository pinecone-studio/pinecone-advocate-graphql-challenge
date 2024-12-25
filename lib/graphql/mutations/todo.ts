export const todoAddMutation = /*graphQL*/ `
mutation todoAdd($input:InputTodo!){
todoAdd(todo:$input){
taskName
description
isDone
priority
tags
createdAt
updatedAt
_id 
}
}
`;

export const todoUpdateMutation = /*graphQL*/ `
mutation todoUpdate($input:InputTodoUpdate!,$id:ID!)
{
todoUpdate(todo:$input,id:$id){
taskName
description
isDone
priority
tags
createdAt
updatedAt
_id 
}
}
`;
