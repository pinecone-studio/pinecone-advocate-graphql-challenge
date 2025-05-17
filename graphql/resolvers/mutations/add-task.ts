import Task from "@/mongoose/models/task";
const addTask = async (
  _: unknown,
  { title, description }: { title: string; description?: string }
) => {
  try {
    if (!title) {
      throw new Error("Title is required");
    }

    const newTask = new Task({
      title,
      description: description || "",
      isCompleted: false,
    });

    const savedTask = await newTask.save();
    return savedTask;
  } catch (error: any) {
    throw new Error(`Failed to create task: ${error.message}`);
  }
};

export default addTask;
