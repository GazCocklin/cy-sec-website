import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, AlertCircle, Star, Clock, CheckCircle, XCircle, Eye, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_OPTIONS = [
  { value: 'new',          label: 'New',           color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { value: 'reviewing',    label: 'Under Review',  color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'in_progress',  label: 'In Progress',   color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  { value: 'done',         label: 'Done',          color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'wont_fix',     label: "Won't Fix",     color: 'bg-slate-100 text-slate-600 border-slate-200' },
];

const TYPE_CONFIG = {
  fault:   { label: 'Fault Report',      icon: AlertCircle, color: 'bg-red-100 text-red-700 border-red-200' },
  feature: { label: 'Feature Request',   icon: Star,        color: 'bg-blue-100 text-blue-700 border-blue-200' },
};

function statusCfg(s) { return STATUS_OPTIONS.find(o => o.value === s) || STATUS_OPTIONS[0]; }
function timeAgo(ts) {
  const diff = Date.now() - new Date(ts).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, colorClass }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
      <div className={`p-2 rounded-lg ${colorClass}`}><Icon className="h-5 w-5" /></div>
      <div>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
        <div className="text-xs text-slate-500">{label}</div>
      </div>
    </div>
  );
}

// ── Row ───────────────────────────────────────────────────────────────────────
function FeedbackRow({ item, selected, onClick }) {
  const type = TYPE_CONFIG[item.type] || TYPE_CONFIG.fault;
  const TypeIcon = type.icon;
  const sc = statusCfg(item.status);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
        selected ? 'border-blue-400 bg-blue-50 shadow-md' : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${type.color}`}>
            <TypeIcon className="h-3 w-3" />
            {type.label}
          </span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${sc.color}`}>{sc.label}</span>
        </div>
        <span className="text-xs text-slate-400 whitespace-nowrap flex items-center gap-1">
          <Clock className="h-3 w-3" />{timeAgo(item.created_at)}
        </span>
      </div>
      <p className="text-sm text-slate-700 line-clamp-2">{item.message}</p>
      {item.user_email && (
        <p className="text-xs text-slate-400 mt-1 truncate">{item.user_email}</p>
      )}
    </motion.div>
  );
}

// ── Detail panel ──────────────────────────────────────────────────────────────
function FeedbackDetail({ item, onStatusChange, updating }) {
  const type = TYPE_CONFIG[item.type] || TYPE_CONFIG.fault;
  const TypeIcon = type.icon;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 h-full flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-medium text-sm ${type.color}`}>
          <TypeIcon className="h-4 w-4" />
          {type.label}
        </span>
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {new Date(item.created_at).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
        </span>
      </div>

      {/* Message */}
      <div>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Message</div>
        <div className="bg-slate-50 rounded-lg p-4 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
          {item.message}
        </div>
      </div>

      {/* Meta */}
      <div className="grid grid-cols-1 gap-3 text-sm">
        {item.user_email && (
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">User</span>
            <p className="text-slate-700 mt-0.5">{item.user_email}</p>
          </div>
        )}
        {item.page_url && (
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Page</span>
            <p className="text-slate-600 text-xs mt-0.5 break-all">{item.page_url}</p>
          </div>
        )}
        {item.browser && (
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Browser</span>
            <p className="text-slate-500 text-xs mt-0.5 break-all">{item.browser.substring(0, 120)}</p>
          </div>
        )}
      </div>

      {/* Status update */}
      <div className="border-t border-slate-100 pt-4 mt-auto">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Update Status</div>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              disabled={updating || item.status === opt.value}
              onClick={() => onStatusChange(item.id, opt.value)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                item.status === opt.value
                  ? opt.color + ' ring-2 ring-offset-1 ring-blue-400'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
              }`}
            >
              {updating && item.status !== opt.value ? <Loader2 className="h-3 w-3 inline animate-spin mr-1" /> : null}
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function FortifyLearnFeedback() {
  const { toast } = useToast();
  const [items, setItems]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [selected, setSelected]         = useState(null);
  const [typeFilter, setTypeFilter]     = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updating, setUpdating]         = useState(false);

  const load = useCallback(async (initial = false) => {
    try {
      if (initial) setLoading(true);
      const { data, error } = await supabase
        .from('fl_feedback')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setItems(data || []);
      // keep selection live
      if (selected) {
        const updated = (data || []).find(i => i.id === selected.id);
        setSelected(updated || data?.[0] || null);
      } else {
        setSelected(data?.[0] || null);
      }
    } catch (e) {
      toast({ title: 'Error', description: 'Failed to load feedback.', variant: 'destructive' });
    } finally {
      if (initial) setLoading(false);
    }
  }, [toast, selected]);

  useEffect(() => {
    load(true);
    const ch = supabase
      .channel('fl_feedback_admin')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'fl_feedback' }, () => load(false))
      .subscribe();
    return () => supabase.removeChannel(ch);
  }, []);

  const updateStatus = async (id, status) => {
    setUpdating(true);
    try {
      const { error } = await supabase.from('fl_feedback').update({ status }).eq('id', id);
      if (error) throw error;
      toast({ title: 'Updated', description: `Status set to ${statusCfg(status).label}.` });
      await load(false);
    } catch {
      toast({ title: 'Error', description: 'Failed to update status.', variant: 'destructive' });
    } finally {
      setUpdating(false);
    }
  };

  // ── Derived stats ────────────────────────────────────────────────────────
  const stats = {
    total:    items.length,
    faults:   items.filter(i => i.type === 'fault').length,
    features: items.filter(i => i.type === 'feature').length,
    newCount: items.filter(i => i.status === 'new').length,
    done:     items.filter(i => i.status === 'done').length,
  };

  // ── Filtered list ────────────────────────────────────────────────────────
  const filtered = items.filter(i =>
    (typeFilter === 'all' || i.type === typeFilter) &&
    (statusFilter === 'all' || i.status === statusFilter)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 text-slate-400">
        <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading feedback…
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatCard label="Total"    value={stats.total}    icon={Eye}          colorClass="bg-slate-100 text-slate-600" />
        <StatCard label="Faults"   value={stats.faults}   icon={AlertCircle}  colorClass="bg-red-100 text-red-600" />
        <StatCard label="Features" value={stats.features} icon={Star}         colorClass="bg-blue-100 text-blue-600" />
        <StatCard label="New"      value={stats.newCount} icon={Clock}        colorClass="bg-yellow-100 text-yellow-600" />
        <StatCard label="Done"     value={stats.done}     icon={CheckCircle}  colorClass="bg-green-100 text-green-600" />
      </div>

      {/* Filters + refresh */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Type */}
        {['all', 'fault', 'feature'].map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
              typeFilter === t
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
            }`}
          >
            {t === 'all' ? `All (${items.length})` : t === 'fault' ? `Faults (${stats.faults})` : `Features (${stats.features})`}
          </button>
        ))}
        <div className="w-px h-5 bg-slate-200 mx-1" />
        {/* Status */}
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 font-medium focus:outline-none"
        >
          <option value="all">All statuses</option>
          {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <button
          onClick={() => load(true)}
          className="ml-auto flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-slate-400 transition-all"
        >
          <RefreshCw className="h-3 w-3" /> Refresh
        </button>
      </div>

      {/* Main split layout */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <AlertCircle className="h-8 w-8 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No feedback matches your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {/* List */}
          <div className="space-y-2 max-h-[65vh] overflow-y-auto pr-1">
            <AnimatePresence>
              {filtered.map(item => (
                <FeedbackRow
                  key={item.id}
                  item={item}
                  selected={selected?.id === item.id}
                  onClick={() => setSelected(item)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Detail */}
          <div className="sticky top-4">
            {selected ? (
              <FeedbackDetail
                item={selected}
                onStatusChange={updateStatus}
                updating={updating}
              />
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400 text-sm">
                Select an item to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
