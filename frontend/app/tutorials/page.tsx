import { Suspense } from 'react';
import { mockData } from '@/lib/script';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Loader } from '@/components/ui/Loader';

async function fetchTutorials() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockData.tutorials;
}

export default async function TutorialsPage() {
  const tutorials = await fetchTutorials();

  return (
    <Suspense fallback={<Loader text="Loading Tutorials..." />}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Tutorials</h1>
          <Button variant="primary"><Link href="/tutorials/new">Create New Tutorial</Link></Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map(tutorial => (
            <Card key={tutorial.id} hover>
              <h3 className="text-xl font-semibold text-white mb-2">{tutorial.title}</h3>
              <p className="text-slate-400 mb-4">{tutorial.excerpt}</p>
              <div className="space-y-2 text-sm text-slate-500">
                <div>Author: {tutorial.author}</div>
                <div>Read Time: {tutorial.readTime}</div>
                <div>Category: {tutorial.category}</div>
              </div>
              <Button variant="ghost" className="w-full mt-4">Read More</Button>
            </Card>
          ))}
        </div>
      </div>
    </Suspense>
  );
}
