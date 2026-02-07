import { AuthOptions } from 'auth';
import Credentials from 'auth/providers/credentials';
import bcrypt from 'bcryptjs';

const users = [
  {
    id: '1',
    name: 'User',
    email: 'user@example.com',
    password: await bcrypt.hash('password', 10),
    role: 'Student Researcher',
  },
  {
    id: '2',
    name: 'Admin',
    email: 'admin@example.com',
    password: await bcrypt.hash('adminpass', 10),
    role: 'Admin',
  },
];

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = users.find(u => u.email === credentials.email);
        if (!user) throw new Error('Invalid credentials');

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error('Invalid credentials');

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
