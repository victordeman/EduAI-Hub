'use client';

import { useState } from 'react';
import { Editor } from '@lexical/react/LexicalEditor';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { Button } from '@/components/ui/Button';

const editorConfig = {
  namespace: 'TutorialEditor',
  theme: {
    // Theme styles
  },
  onError(error) {
    console.error(error);
  },
};

export default function CreateTutorialPage() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  const handlePublish = () => {
    // Get editor state, API call to save
  };

  const handleAiAssist = () => {
    // Call RAG or LLM for suggestions
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Create Tutorial</h1>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white mb-4" />
      <LexicalComposer initialConfig={editorConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="min-h-[400px] bg-slate-800/50 border border-slate-600 rounded-lg p-4 text-white" />}
          placeholder={<div className="text-slate-500">Enter content...</div>}
        />
        <HistoryPlugin />
      </LexicalComposer>
      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma separated)" className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white mb-4" />
      <div className="flex gap-4">
        <Button variant="secondary" onClick={handleAiAssist}>AI Assist</Button>
        <Button onClick={handlePublish}>Publish</Button>
      </div>
    </div>
  );
}
