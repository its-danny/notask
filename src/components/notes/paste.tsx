"use client";

import { notesAtom } from "@/atoms/notes";
import { useAtom } from "jotai";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export default function Paste() {
  const [notes, setNotes] = useAtom(notesAtom);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Paste your meeting notes here...",
      }),
    ],
    content: notes,
    onUpdate: ({ editor }) => {
      setNotes(editor.getText());
    },
  });

  return <EditorContent editor={editor} />;
}
