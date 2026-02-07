'use client';

import { useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { Button } from '@/components/ui/Button';
import { useEditorState } from '@lexical/react/LexicalEditorState';

const editorConfig = {
  namespace: 'TutorialEditor',
  nodes: [], // Add nodes as needed
  onError(error) {
    console.error(error);
  },
  theme: {
    root: 'p-4 min-h-[400px] bg-slate-800/50 border border-slate-600 rounded-lg text-white',
    // ... custom theme
  },
};

export default function CreateTutorialPage() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [editorState, setEditorState] = useState(null);

  const onChange = (state) => {
    setEditorState(state);
  };

  const handlePublish = async () => {
    const content = JSON.stringify(editorState);
    // API call to /api/tutorials/create with title, content, tags
  };

  const handleAiAssist = async () => {
    // Get current content, call RAG/LLM for suggestions, insert into editor
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Create Tutorial</h1>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white mb-4" />
      <LexicalComposer initialConfig={editorConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<div className="text-slate-500">Enter content...</div>}
        />
        <HistoryPlugin />
        <LinkPlugin />
        <ListPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <useEditorState onChange={onChange} />
      </LexicalComposer>
      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma separated)" className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white mb-4" />
      <div className="flex gap-4">
        <Button variant="secondary" onClick={handleAiAssist}>AI Assist</Button>
        <Button onClick={handlePublish}>Publish</Button>
      </div>
    </div>
  );
}
