import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

// ─── Design tokens ────────────────────────────────────────────────────────────
const colors = {
  bg: '#060b18',
  bgCard: '#0a1020',
  bgHover: '#0e1628',
  border: '#1a2540',
  borderAccent: '#1a6fc4',
  blue: '#1a6fc4',
  cyan: '#0ea5e9',
  textPrimary: '#e8edf5',
  textSecondary: '#94A3B8',
  textMuted: '#4a6080',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  purple: '#8B5CF6',
};
