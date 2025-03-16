import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type Confidence = "high" | "medium" | "low";

export enum Priority {
  NoPriority = 0,
  Urgent = 1,
  High = 2,
  Normal = 3,
  Low = 4,
}

export interface Task {
  id: string;
  title: string;
  team: { id: string; name: string };
  assignee: { id: string; name: string } | null;
  due_date: string | null;
  priority: Priority;
  description: string;
  tags: { id: string; name: string }[];
  confidence: Confidence;
  url?: string;
}

export const tasksAtom = atomWithStorage<Task[]>("tasks", []);

export const addTaskAtom = atom(
  (get) => get(tasksAtom),
  (get, set, task: Omit<Task, "id">) => {
    const tasks = get(tasksAtom);

    const newTask: Task = {
      id: crypto.randomUUID(),
      ...task,
    };

    set(tasksAtom, [...tasks, newTask]);
  },
);

export const removeTaskAtom = atom(
  (get) => get(tasksAtom),
  (get, set, id: string) => {
    const tasks = get(tasksAtom);

    set(
      tasksAtom,
      tasks.filter((task) => task.id !== id),
    );
  },
);

export const selectedTasksAtom = atom<Task[]>([]);

export const toggleTaskSelectionAtom = atom(
  (get) => get(selectedTasksAtom),
  (get, set, task: Task) => {
    const selectedTasks = get(selectedTasksAtom);
    set(selectedTasksAtom, [...selectedTasks, task]);
  },
);

export interface TeamMetadata {
  id: string;
  name: string;
  members: { id: string; name: string }[];
  labels: { id: string; name: string }[];
}

export interface Metadata {
  teams: TeamMetadata[];
  organizationLabels: { id: string; name: string }[];
}

export const metadataAtom = atomWithStorage<Metadata>("metadata", {
  teams: [],
  organizationLabels: [],
});
