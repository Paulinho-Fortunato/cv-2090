import { describe, it, expect, beforeEach } from 'vitest';
import { useResumeStore } from '../lib/store';
import { defaultResumeData } from '../types/resume';

describe('ResumeStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useResumeStore.setState({ resumeData: defaultResumeData });
  });

  it('initializes with default data', () => {
    const state = useResumeStore.getState();
    expect(state.resumeData).toEqual(defaultResumeData);
  });

  it('updates basics correctly', () => {
    const { updateBasics } = useResumeStore.getState();
    updateBasics({ fullName: 'João Silva' });
    
    const state = useResumeStore.getState();
    expect(state.resumeData.basics.fullName).toBe('João Silva');
  });

  it('adds experience correctly', () => {
    const { addExperience } = useResumeStore.getState();
    addExperience();
    
    const state = useResumeStore.getState();
    expect(state.resumeData.experiences.length).toBe(1);
  });

  it('adds skill correctly', () => {
    const { addSkill } = useResumeStore.getState();
    addSkill('JavaScript');
    
    const state = useResumeStore.getState();
    expect(state.resumeData.skills).toContain('JavaScript');
  });

  it('removes skill correctly', () => {
    const { addSkill, removeSkill } = useResumeStore.getState();
    addSkill('JavaScript');
    addSkill('TypeScript');
    
    removeSkill(0);
    
    const state = useResumeStore.getState();
    expect(state.resumeData.skills).not.toContain('JavaScript');
    expect(state.resumeData.skills).toContain('TypeScript');
  });

  it('resets all data correctly', () => {
    const { updateBasics, addSkill, resetAll } = useResumeStore.getState();
    
    updateBasics({ fullName: 'João Silva' });
    addSkill('JavaScript');
    
    resetAll();
    
    const state = useResumeStore.getState();
    expect(state.resumeData).toEqual(defaultResumeData);
  });

  it('changes theme correctly', () => {
    const { setTheme } = useResumeStore.getState();
    
    setTheme('dark');
    expect(useResumeStore.getState().theme).toBe('dark');
    
    setTheme('light');
    expect(useResumeStore.getState().theme).toBe('light');
  });

  it('changes language correctly', () => {
    const { setLanguage } = useResumeStore.getState();
    
    setLanguage('en');
    expect(useResumeStore.getState().language).toBe('en');
    
    setLanguage('pt');
    expect(useResumeStore.getState().language).toBe('pt');
  });

  it('changes template correctly', () => {
    const { setTemplate } = useResumeStore.getState();
    
    setTemplate('executive');
    expect(useResumeStore.getState().template).toBe('executive');
    
    setTemplate('modern');
    expect(useResumeStore.getState().template).toBe('modern');
  });
});
