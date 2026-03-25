// Authentication Service — Mock Auth using localStorage
import { FarmerUser } from '@/types';

const USERS_KEY = 'crop_advisory_users';
const SESSION_KEY = 'crop_advisory_session';

export interface Session {
  userId: string;
  email: string;
  name: string;
}

// ─── Demo Credentials ─────────────────────────────────────────────────────────
export const DEMO_USERS: FarmerUser[] = [
  {
    id: 'demo-001',
    name: 'Ravi Kumar',
    email: 'ravi@farmer.com',
    password: '123456',
    age: 42,
    location: 'Thanjavur',
    crop: 'Rice',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 'demo-002',
    name: 'Meena Devi',
    email: 'meena@farmer.com',
    password: '123456',
    age: 35,
    location: 'Coimbatore',
    crop: 'Sugarcane',
    registeredAt: new Date().toISOString(),
  },
];

function getUsers(): FarmerUser[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return DEMO_USERS;
  const stored: FarmerUser[] = JSON.parse(raw);
  const allUsers = [...DEMO_USERS];
  for (const u of stored) {
    if (!allUsers.find(x => x.id === u.id)) allUsers.push(u);
  }
  return allUsers;
}

function saveUsers(users: FarmerUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerFarmer(data: Omit<FarmerUser, 'id' | 'registeredAt'>): FarmerUser {
  const users = getUsers();
  if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
    throw new Error('An account with this email already exists.');
  }
  const newUser: FarmerUser = {
    ...data,
    id: `user-${Date.now()}`,
    registeredAt: new Date().toISOString(),
  };
  const nonDemo = users.filter(u => !DEMO_USERS.find(d => d.id === u.id));
  saveUsers([...nonDemo, newUser]);
  return newUser;
}

export function loginFarmer(email: string, password: string): FarmerUser {
  const users = getUsers();
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) throw new Error('Invalid email or password. Please try again.');
  localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id, email: user.email, name: user.name }));
  return user;
}

export function logoutFarmer(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): Session | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  return JSON.parse(raw);
}

export function getCurrentUser(): FarmerUser | null {
  const session = getSession();
  if (!session) return null;
  const users = getUsers();
  return users.find(u => u.id === session.userId) || null;
}
