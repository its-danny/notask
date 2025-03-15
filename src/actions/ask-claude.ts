"use server";

import { anthropic } from "@ai-sdk/anthropic";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { LinearClient } from "@linear/sdk";
import { generateText } from "ai";

export async function askClaude(input: string) {
  const { userId } = await auth();

  if (!userId) throw new Error("Not authenticated");

  const clerk = await clerkClient();
  const provider = "linear";

  const response = await clerk.users.getUserOauthAccessToken(userId, provider);

  const token = response.data[0].token;

  const linear = new LinearClient({
    accessToken: token,
  });

  const linearUser = await linear.viewer;

  const organization = await linearUser.organization;
  const orgLabels = await organization.labels();
  const teams = await linearUser.teams();

  const teamsWithData = await Promise.all(
    teams.nodes.map(async (team) => ({
      ...team,
      labels: await team.labels(),
      members: await team.members(),
    })),
  );

  const { text } = await generateText({
    model: anthropic("claude-3-7-sonnet-20250219"),
    system: `
        ## Instructions

        You are an AI assistant specialized in analyzing meeting notes, documents, and unstructured text to identify and extract actionable tasks and to-do items. Your job is to carefully identify any explicit or implied action items from the provided text.

        Today's date is ${new Date().toISOString().split("T")[0]}.

        ## Extraction Rules

        1. Extract any sentence or phrase that represents something someone needs to do
        2. Identify the following properties for each action item when available:
            - Team: The team responsible for completing the task. This is REQUIRED.
            - Task title (required): Start with an action verb, be specific and concise
            - Assignee: The person responsible for completing the task (use the name of the team member)
            - Due date: Any specific deadline mentioned (format as YYYY-MM-DD)
            - Priority: High, Medium, or Low based on urgency indicators
            - Description: Brief context from surrounding text
            - Tags: Keywords that categorize the task (comma-separated)
        3. Task title guidelines:
            - Begin with an action verb (Create, Update, Review, etc.)
            - Be specific enough to understand what needs to be done
            - Keep it concise (typically under 70 characters)
            - Include enough context to make sense on its own
        4. Context awareness:
            - Consider surrounding text to infer missing information
            - Pay attention to conditional tasks ("If X happens, then do Y")
            - Look for words like "before", "after", "by", "due" to determine dates and dependencies

        ## Response Format

        Respond with a JSON array of objects. Do not wrap the JSON in a code block. Each object should represent one action item with the following structure:

        [
            {
                "team": {id: "team1", name: "team1"},
                "title": "The task title starting with an action verb",
                "assignee": "Name of person assigned or null if not specified, {id: "assignee1", name: "assignee1"}",
                "due_date": "YYYY-MM-DD or null if not specified",
                "priority": "No priority = 0, Urgent = 1, High = 2, Normal = 3, Low = 4",
                "description": "Brief context from surrounding text",
                "tags": [{id: "tag1", name: "tag1"}, {id: "tag2", name: "tag2"}] or [] if none specified,
                "confidence": "high/medium/low based on how clearly this was stated in the notes",
            },
            // Additional action items...
        ]

        ## The person who is requesting the tasks

        ${linearUser.id}: ${linearUser.name}

        ## Organization Tags

        ${orgLabels.nodes.map((label) => `- ${label.id}: ${label.name}`).join("\n")}

        ## Teams and their Members & Tags

        Only assign tags that are either in the organization or the team you've assigned to the task.
        Only assign members that are in the team you've assigned to the task.

        ${teamsWithData
          .map(
            (team) => `
            ### Team - ${team.id}: ${team.name}

            #### Members:
            ${team.members.nodes.map((member) => `- ${member.id}: ${member.name}`).join("\n") || "No members"}

            #### Tags:
            ${team.labels.nodes.map((label) => `- ${label.id}: ${label.name}`).join("\n") || "No tags"}
            `,
          )
          .join("\n")}
    `,
    prompt: input,
    providerOptions: {
      anthropic: {
        thinking: { type: "enabled", budgetTokens: 12000 },
      },
    },
  });

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error(error);

    return [];
  }
}
