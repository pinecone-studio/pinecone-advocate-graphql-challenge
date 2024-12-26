export const getDoneTasksQuery = /*GraphQL*/ `
{ getDoneTasks{
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

export const getAllTasksQuery = /*GraphQL*/ `
{ 
getAllTasks{
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
export const searchQuery = /*GraphQL*/ `

query Search( $input: String!)
{
search(term: $input){
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
