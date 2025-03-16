"use server";

import { Task } from "@/atoms/tasks";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { LinearClient } from "@linear/sdk";

export async function exportToLinear(tasks: Task[]) {
  const { userId } = await auth();

  if (!userId) throw new Error("Not authenticated");

  const clerk = await clerkClient();
  const provider = "linear";

  const response = await clerk.users.getUserOauthAccessToken(userId, provider);

  const token = response.data[0].token;

  const linear = new LinearClient({
    accessToken: token,
  });

  const batchResponse = await linear.createIssueBatch({
    issues: tasks.map((task) => ({
      teamId: task.team.id,
      title: task.title,
      description: task.description,
      assigneeId: task.assignee?.id,
      dueDate: task.due_date,
      priority: task.priority,
      labelIds: task.tags.map((tag) => tag.id),
    })),
  });

  return tasks.map((task, index) => ({
    ...task,
    url: batchResponse.issues[index]?.url,
  }));
}
