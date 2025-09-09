import { create } from 'zustand';
import { Thread, TweetContent } from '../types';
import { threadsApi } from '../lib/api';
import toast from 'react-hot-toast';

interface ThreadState {
  threads: Thread[];
  currentThread: Thread | null;
  isLoading: boolean;
  fetchThreads: () => Promise<void>;
  createThread: (threadData: Partial<Thread>) => Promise<Thread | null>;
  updateThread: (id: number, threadData: Partial<Thread>) => Promise<void>;
  publishThread: (id: number) => Promise<void>;
  setCurrentThread: (thread: Thread | null) => void;
  updateCurrentThreadContent: (content: TweetContent[]) => void;
}

export const useThreadStore = create<ThreadState>((set, get) => ({
  threads: [],
  currentThread: null,
  isLoading: false,

  fetchThreads: async () => {
    set({ isLoading: true });
    try {
      const response = await threadsApi.getThreads();
      set({ threads: response.data, isLoading: false });
    } catch (error) {
      toast.error('Failed to fetch threads');
      set({ isLoading: false });
    }
  },

  createThread: async (threadData: Partial<Thread>) => {
    try {
      const response = await threadsApi.createThread(threadData);
      const newThread = response.data;
      
      set(state => ({
        threads: [newThread, ...state.threads]
      }));
      
      toast.success('Thread created successfully!');
      return newThread;
    } catch (error) {
      toast.error('Failed to create thread');
      return null;
    }
  },

  updateThread: async (id: number, threadData: Partial<Thread>) => {
    try {
      const response = await threadsApi.updateThread(id, threadData);
      const updatedThread = response.data;
      
      set(state => ({
        threads: state.threads.map(thread => 
          thread.id === id ? updatedThread : thread
        ),
        currentThread: state.currentThread?.id === id ? updatedThread : state.currentThread
      }));
      
      toast.success('Thread updated successfully!');
    } catch (error) {
      toast.error('Failed to update thread');
    }
  },

  publishThread: async (id: number) => {
    try {
      await threadsApi.publishThread(id);
      
      set(state => ({
        threads: state.threads.map(thread => 
          thread.id === id ? { ...thread, status: 'publishing' as const } : thread
        )
      }));
      
      toast.success('Thread is being published!');
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Failed to publish thread';
      toast.error(message);
    }
  },

  setCurrentThread: (thread: Thread | null) => {
    set({ currentThread: thread });
  },

  updateCurrentThreadContent: (content: TweetContent[]) => {
    set(state => ({
      currentThread: state.currentThread 
        ? { ...state.currentThread, content }
        : null
    }));
  },
}));