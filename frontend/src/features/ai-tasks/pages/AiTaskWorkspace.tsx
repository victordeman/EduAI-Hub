'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../../../components/ui/Button';
import { Loader } from '../../../components/ui/Loader';
import { Modal } from '../../../components/ui/Modal';

export function AiTaskWorkspace() {
  const [files, setFiles] = useState<File[]>([]);
  const [model, setModel] = useState('gpt-4o');
  const [query, setQuery] = useState('');
  const [citations, setCitations] = useState([]);
  const [knowledgeBaseName, setKnowledgeBaseName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);

  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));
      const response = await fetch('/api/rag/upload', { method: 'POST', body: formData });
      return response.json(); // Assume returns vectorized data
    },
    onSuccess: (data) => {
      // Update citations or knowledge base
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const handleRAGQuery = async () => {
    const response = await fetch('/api/rag/query', {
      method: 'POST',
      body: JSON.stringify({ query, model, files: files.map(f => f.name) }),
    });
    const data = await response.json();
    setCitations(data.citations || []);
  };

  const handleSaveKnowledgeBase = () => {
    // API call to save
    setShowSaveModal(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AI Agent Task Workspace</h1>
      <input type="file" accept=".pdf" multiple onChange={handleFileChange} className="mb-4 block" />
      <select value={model} onChange={(e) => setModel(e.target.value)} className="mb-4 block w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white">
        <optgroup label="Proprietary/Enterprise">
          <option value="gpt-4o">GPT-4o ($0.02/1k · 120 tps)</option>
          <option value="gpt-4o-mini">GPT-4o-mini ($0.01/1k · 150 tps)</option>
          <option value="claude-3.5-sonnet">Claude 3.5 Sonnet ($0.03/1k · 100 tps)</option>
          <option value="claude-3-opus">Claude 3 Opus ($0.04/1k · 90 tps)</option>
          <option value="gemini-1.5-pro">Gemini 1.5 Pro ($0.025/1k · 110 tps)</option>
        </optgroup>
        <optgroup label="Open-source/Local">
          <option value="llama-3.1-70b">Llama-3.1-70B ($0.01/1k · 80 tps)</option>
          <option value="llama-3.1-405b">Llama-3.1-405B ($0.015/1k · 60 tps)</option>
          <option value="mixtral-8x22b">Mixtral-8x22B ($0.012/1k · 70 tps)</option>
          <option value="qwen-2-110b">Qwen-2-110B ($0.01/1k · 85 tps)</option>
          <option value="deepseek-v2">DeepSeek-V2 ($0.009/1k · 90 tps)</option>
          <option value="command-r+">Command-R+ ($0.011/1k · 75 tps)</option>
          <option value="nemotron-4-340b">Nemotron-4-340B ($0.014/1k · 65 tps)</option>
        </optgroup>
      </select>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="RAG Query" className="mb-4 block w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white" />
      <div className="flex gap-4 mb-4">
        <Button onClick={handleRAGQuery} loading={uploadMutation.isPending}>Execute Task</Button>
        <Button variant="secondary" onClick={() => setShowSaveModal(true)}>Save Knowledge Base</Button>
      </div>
      {uploadMutation.isPending && <Loader text="Processing PDFs..." />}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Citations</h3>
        {citations.map((cit, idx) => (
          <div key={idx} className="p-4 bg-slate-800/30 rounded-lg mb-2">
            <p>Page {cit.page}: {cit.excerpt}</p>
          </div>
        ))}
      </div>
      <Modal open={showSaveModal} title="Save Knowledge Base" onClose={() => setShowSaveModal(false)}>
        <input type="text" value={knowledgeBaseName} onChange={(e) => setKnowledgeBaseName(e.target.value)} placeholder="Name your base" className="mb-4 block w-full" />
        <Button onClick={handleSaveKnowledgeBase}>Save</Button>
      </Modal>
    </div>
  );
}
