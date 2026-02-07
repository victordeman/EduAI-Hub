import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const prisma = new PrismaClient();

async function fetchAdminData() {
  const users = await prisma.user.findMany();
  const stats = [
    { name: 'Projects', value: await prisma.project.count() },
    { name: 'Tutorials', value: await prisma.tutorial.count() },
    { name: 'Users', value: users.length },
  ];
  return { users, stats };
}

export default async function AdminPage() {
  const session = await auth();

  if (!session || session.user.role !== 'Admin') {
    redirect('/');
  }

  const { users, stats } = await fetchAdminData();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Usage Stats</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t border-slate-700/50">
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
