import { Suspense } from 'react';
import { PrismaClient } from '@prisma/client';
import { LucideUser, LucideCalendar, LucideTag } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useState } from 'react';
import { Loader } from '@/components/ui/Loader';

const prisma = new PrismaClient();

async function fetchProjects() {
  return await prisma.project.findMany();
}

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <Suspense fallback={<Loader text="Loading Projects..." />}>
      <ProjectsList projects={projects} />
    </Suspense>
  );
}

'use client';

function ProjectsList({ projects }: { projects: await fetchProjects() }) {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const allTags = [...new Set(projects.flatMap(p => p.tags))];
  const difficulties = [...new Set(projects.map(p => p.difficulty))];

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) &&
    (selectedTags.length === 0 || selectedTags.some(tag => p.tags.includes(tag))) &&
    (!selectedDifficulty || p.difficulty === selectedDifficulty)
  );

  const handleApply = (project) => {
    setSelectedProject(project);
    setShowApplyModal(true);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Projects Marketplace</h1>
      <div className="flex gap-4">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects" className="flex-1 bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white" />
        <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)} className="bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white">
          <option value="">All Difficulties</option>
          {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => (
          <button key={tag} onClick={() => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])} className={`px-3 py-1 rounded-full text-sm ${selectedTags.includes(tag) ? 'bg-primary-600 text-white' : 'bg-slate-800/50 text-slate-300'}`}>
            {tag}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <Card key={project.id} hover>
            <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
            <p className="text-slate-400 mb-4">{project.description}</p>
            <div className="space-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <LucideUser size={16} />
                {project.authorId}  // Replace with user name fetch if needed
              </div>
              <div className="flex items-center gap-2">
                <LucideCalendar size={16} />
                Deadline: {project.deadline.toISOString().split('T')[0]}
              </div>
              <div className="flex items-center gap-2">
                <LucideTag size={16} />
                {project.tags.join(', ')}
              </div>
              <div>Difficulty: {project.difficulty}</div>
              <div>Applicants: {project.applicants}</div>
            </div>
            <Button variant="primary" className="w-full mt-4" onClick={() => handleApply(project)}>Apply</Button>
          </Card>
        ))}
      </div>
      {showApplyModal && (
        <Modal open={showApplyModal} title={`Apply to ${selectedProject.title}`} onClose={() => setShowApplyModal(false)}>
          <input type="file" accept=".pdf,.docx" placeholder="Upload Resume" className="mb-4 block w-full" />
          <textarea placeholder="Cover Letter" className="mb-4 block w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white" rows={5}></textarea>
          <Button onClick={() => { /* API call to apply */ setShowApplyModal(false); }}>Submit Application</Button>
        </Modal>
      )}
    </div>
  );
}
