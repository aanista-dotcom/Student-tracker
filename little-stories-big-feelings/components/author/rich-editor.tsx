"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import type { JSONContent } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Heading2, Italic, Link2, List, ListOrdered, Quote, Redo2, Strikethrough, Undo2 } from "lucide-react";
import type { StoryContent } from "@/lib/types";

export function RichEditor({ value, onChange }: { value: StoryContent; onChange: (content: StoryContent) => void }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Link.configure({ openOnClick: false, autolink: true, protocols: ["http", "https", "mailto"] }), Placeholder.configure({ placeholder: "Begin anywhere. A small detail, a half-remembered feeling…" })],
    content: value as JSONContent,
    editorProps: { attributes: { class: "tiptap-editor", "aria-label": "Story content editor" } },
    onUpdate: ({ editor: current }) => onChange(current.getJSON() as StoryContent),
  });

  useEffect(() => {
    if (editor && JSON.stringify(editor.getJSON()) !== JSON.stringify(value)) editor.commands.setContent(value as JSONContent, false);
  }, [editor, value]);

  if (!editor) return <div className="editor-placeholder">Opening the page…</div>;
  const tools = [
    { label: "Bold", icon: <Bold size={16} />, run: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold") },
    { label: "Italic", icon: <Italic size={16} />, run: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic") },
    { label: "Strike", icon: <Strikethrough size={16} />, run: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive("strike") },
    { label: "Heading", icon: <Heading2 size={16} />, run: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading") },
    { label: "Bulleted list", icon: <List size={16} />, run: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
    { label: "Numbered list", icon: <ListOrdered size={16} />, run: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList") },
    { label: "Quote", icon: <Quote size={16} />, run: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote") },
    { label: "Link", icon: <Link2 size={16} />, run: () => { const href = window.prompt("Paste a web address"); if (href && /^https?:\/\//i.test(href)) editor.chain().focus().setLink({ href }).run(); }, active: editor.isActive("link") },
  ];
  return <div className="editor-wrap"><div className="editor-toolbar" role="toolbar" aria-label="Story formatting">{tools.map((tool) => <button key={tool.label} className={tool.active ? "is-active" : ""} type="button" title={tool.label} aria-label={tool.label} onClick={tool.run}>{tool.icon}</button>)}<span className="toolbar-spacer" /><button type="button" title="Undo" aria-label="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo2 size={16} /></button><button type="button" title="Redo" aria-label="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo2 size={16} /></button></div><EditorContent editor={editor} /></div>;
}
