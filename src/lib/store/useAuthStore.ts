import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, Address } from '@/types';
import { auth, googleProvider, isFirebaseConfigured } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  loginAsAdmin: (pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (email, pass) => {
        set({ isLoading: true, error: null });
        try {
          if (isFirebaseConfigured() && auth) {
            const res = await signInWithEmailAndPassword(auth, email, pass);
            const isAdmin = email.toLowerCase().includes('admin');
            const profile: UserProfile = {
              uid: res.user.uid,
              email: res.user.email || email,
              displayName: res.user.displayName || email.split('@')[0],
              role: isAdmin ? 'admin' : 'customer',
              createdAt: new Date().toISOString(),
              savedAddresses: [],
            };
            set({ user: profile, isLoading: false });
            return { success: true };
          } else {
            // Local fallback when running in dev/demo mode
            const isAdmin = email.toLowerCase() === 'admin@scoopberry.com';
            const profile: UserProfile = {
              uid: 'user_' + Date.now(),
              email,
              displayName: isAdmin ? 'Admin Manager' : email.split('@')[0],
              role: isAdmin ? 'admin' : 'customer',
              createdAt: new Date().toISOString(),
              savedAddresses: [
                {
                  id: 'addr-demo-1',
                  name: isAdmin ? 'Admin Office' : 'Ananya Sharma',
                  phone: '+91 98765 43210',
                  email,
                  houseFlat: 'Apt 302, Lavender Court',
                  street: '100ft Road, Indiranagar',
                  area: 'Near Metro',
                  city: 'Bengaluru',
                  state: 'Karnataka',
                  pincode: '560038',
                  type: 'Home',
                  isDefault: true,
                },
              ],
            };
            set({ user: profile, isLoading: false });
            return { success: true };
          }
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Login failed';
          set({ error: message, isLoading: false });
          return { success: false, error: message };
        }
      },

      signup: async (name, email, pass) => {
        set({ isLoading: true, error: null });
        try {
          if (isFirebaseConfigured() && auth) {
            const res = await createUserWithEmailAndPassword(auth, email, pass);
            const profile: UserProfile = {
              uid: res.user.uid,
              email: res.user.email || email,
              displayName: name,
              role: 'customer',
              createdAt: new Date().toISOString(),
              savedAddresses: [],
            };
            set({ user: profile, isLoading: false });
            return { success: true };
          } else {
            const profile: UserProfile = {
              uid: 'user_' + Date.now(),
              email,
              displayName: name,
              role: 'customer',
              createdAt: new Date().toISOString(),
              savedAddresses: [],
            };
            set({ user: profile, isLoading: false });
            return { success: true };
          }
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Signup failed';
          set({ error: message, isLoading: false });
          return { success: false, error: message };
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });
        try {
          if (isFirebaseConfigured() && auth) {
            const res = await signInWithPopup(auth, googleProvider);
            const profile: UserProfile = {
              uid: res.user.uid,
              email: res.user.email || 'user@gmail.com',
              displayName: res.user.displayName || 'Google User',
              photoURL: res.user.photoURL || undefined,
              role: 'customer',
              createdAt: new Date().toISOString(),
              savedAddresses: [],
            };
            set({ user: profile, isLoading: false });
            return { success: true };
          } else {
            const profile: UserProfile = {
              uid: 'google_user_' + Date.now(),
              email: 'berry.fan@gmail.com',
              displayName: 'Berry Fan',
              role: 'customer',
              createdAt: new Date().toISOString(),
              savedAddresses: [],
            };
            set({ user: profile, isLoading: false });
            return { success: true };
          }
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Google sign-in cancelled or failed';
          set({ error: message, isLoading: false });
          return { success: false, error: message };
        }
      },

      loginAsAdmin: async (pass) => {
        set({ isLoading: true, error: null });
        // Demo admin credentials allow easy verification & testing
        if (pass === 'admin123' || pass === 'scoopberry2026') {
          const adminProfile: UserProfile = {
            uid: 'admin_master_1',
            email: 'admin@scoopberry.com',
            displayName: 'ScoopBerry Admin',
            role: 'admin',
            createdAt: new Date().toISOString(),
            savedAddresses: [],
          };
          set({ user: adminProfile, isLoading: false });
          return { success: true };
        } else {
          set({ error: 'Invalid admin secret key or password', isLoading: false });
          return { success: false, error: 'Invalid admin credentials' };
        }
      },

      logout: async () => {
        try {
          if (isFirebaseConfigured() && auth) {
            await signOut(auth);
          }
        } catch {
          // ignore
        }
        set({ user: null, error: null });
      },

      addAddress: (address) => {
        const { user } = get();
        if (!user) return;
        const newAddress: Address = {
          ...address,
          id: 'addr_' + Date.now(),
        };
        const updated = user.savedAddresses.map((a) =>
          newAddress.isDefault ? { ...a, isDefault: false } : a
        );
        set({
          user: {
            ...user,
            savedAddresses: [...updated, newAddress],
          },
        });
      },

      updateAddress: (id, updatedFields) => {
        const { user } = get();
        if (!user) return;
        set({
          user: {
            ...user,
            savedAddresses: user.savedAddresses.map((a) =>
              a.id === id ? { ...a, ...updatedFields } : a
            ),
          },
        });
      },

      deleteAddress: (id) => {
        const { user } = get();
        if (!user) return;
        set({
          user: {
            ...user,
            savedAddresses: user.savedAddresses.filter((a) => a.id !== id),
          },
        });
      },

      updateProfile: (profile) => {
        const { user } = get();
        if (!user) return;
        set({ user: { ...user, ...profile } });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'scoopberry-auth-storage',
    }
  )
);
