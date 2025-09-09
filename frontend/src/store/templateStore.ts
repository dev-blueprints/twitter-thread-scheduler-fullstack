import { create } from 'zustand';
import { Template, CustomTemplate } from '../types';
import { templatesApi } from '../lib/api';
import toast from 'react-hot-toast';

interface TemplateState {
  templates: Template[];
  customTemplates: CustomTemplate[];
  isLoading: boolean;
  fetchTemplates: (category?: string) => Promise<void>;
  fetchCustomTemplates: () => Promise<void>;
  createCustomTemplate: (templateData: Partial<CustomTemplate>) => Promise<void>;
}

export const useTemplateStore = create<TemplateState>((set) => ({
  templates: [],
  customTemplates: [],
  isLoading: false,

  fetchTemplates: async (category?: string) => {
    set({ isLoading: true });
    try {
      const response = await templatesApi.getTemplates(category);
      set({ templates: response.data, isLoading: false });
    } catch (error) {
      toast.error('Failed to fetch templates');
      set({ isLoading: false });
    }
  },

  fetchCustomTemplates: async () => {
    try {
      const response = await templatesApi.getCustomTemplates();
      set({ customTemplates: response.data });
    } catch (error) {
      toast.error('Failed to fetch custom templates');
    }
  },

  createCustomTemplate: async (templateData: Partial<CustomTemplate>) => {
    try {
      const response = await templatesApi.createCustomTemplate(templateData);
      set(state => ({
        customTemplates: [...state.customTemplates, response.data]
      }));
      toast.success('Custom template created!');
    } catch (error) {
      toast.error('Failed to create custom template');
    }
  },
}));