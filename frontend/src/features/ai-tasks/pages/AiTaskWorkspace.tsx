import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../../../components/ui/Button';
import { Loader } from '../../../components/ui/Loader';

export function AiTaskWorkspace() {
  const [files, setFiles] = useState<File[]>([]);
  const [model, setModel] = useState('gpt-4o');
  const [query, setQuery] = useState('');

  const uploadMutation = useMutation({
    mutationFn: (files: File[]) => {
      // API call to backend for RAG processing
      return fetch('/api/rag/upload', { method: 'POST', body: new FormData().append('files', files[0]) });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const handleRAGQuery = () => {
    // Call backend with selected model, embedded files, query
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AI Agent Task Workspace</h1>
      <input type="file" accept=".pdf" multiple onChange={handleFileChange} className="mb-4" />
      <select value={model} onChange={(e) => setModel(e.target.value)} className="mb-4">
        <optgroup label="Proprietary">
          <option value="gpt-4o">GPT-4o ($0.02/1k · 120 tps)</option>
          {/* ... */}
        </optgroup>
        <optgroup label="Open-Source">
          <option value="llama-3.1-70b">Llama-3.1-70B ($0.01/1k · 80 tps)</option>
          {/* ... */}
        </optgroup>
      </select>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="RAG Query" className="mb-4" />
      <Button onClick={handleRAGQuery} loading={uploadMutation.isPending}>Execute Task</Button>
      {uploadMutation.isPending && <Loader text="Processing PDFs..." />}
      {/* Citation panel, knowledge base list */}
    </div>
  );
}
