import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  LayoutDashboard, Users, Mail, Bug, Lightbulb, Settings2,
  ChevronLeft, ChevronRight, ArrowLeft,
  Clock, CheckCircle2, AlertCircle, Inbox,
  TrendingUp, Shield, Trash2, Tag, Package, Layers,
} from 'lucide-react';

// ─── Status helpers ────────────────────────────────────────────────────────────
const LEAD_STAGES      = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];
const CONTACT_STATUSES = ['new', 'in_progress', 'resolved', 'archived'];
const FEEDBACK_STATUSES = ['new', 'reviewing', 'in_progress', 'done', 'wont_fix'];

const stageBadgeVariant = (stage) => ({
  new:         'bg-cyan-50 text-cyan-700 border-cyan-200',
  contacted:   'bg-amber-50 text-amber-700 border-amber-200',
  qualified:   'bg-purple-50 text-purple-700 border-purple-200',
  proposal:    'bg-blue-50 text-blue-700 border-blue-200',
  won:         'bg-green-50 text-green-700 border-green-200',
  lost:        'bg-red-50 text-red-700 border-red-200',
  in_progress: 'bg-amber-50 text-amber-700 border-amber-200',
  resolved:    'bg-green-50 text-green-700 border-green-200',
  archived:    'bg-slate-50 text-slate-500 border-slate-200',
  reviewing:   'bg-purple-50 text-purple-700 border-purple-200',
  done:        'bg-green-50 text-green-700 border-green-200',
  wont_fix:    'bg-red-50 text-red-700 border-red-200',
  completed:   'bg-green-50 text-green-700 border-green-200',
}[stage] || 'bg-slate-50 text-slate-500 border-slate-200');

const StagePill = ({ label }) => (
  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${stageBadgeVariant(label?.toLowerCase().replace(/ /g, '_'))}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${
      stageBadgeVariant(label?.toLowerCase().replace(/ /g, '_')).includes('green') ? 'bg-green-500' :
      stageBadgeVariant(label?.toLowerCase().replace(/ /g, '_')).includes('amber') ? 'bg-amber-500' :
      stageBadgeVariant(label?.toLowerCase().replace(/ /g, '_')).includes('red') ? 'bg-red-500' :
      stageBadgeVariant(label?.toLowerCase().replace(/ /g, '_')).includes('cyan') ? 'bg-cyan-500' :
      stageBadgeVariant(label?.toLowerCase().replace(/ /g, '_')).includes('purple') ? 'bg-purple-500' : 'bg-blue-500'
    }`} />
    {label}
  </span>
);

// ─── Detail Drawer ─────────────────────────────────────────────────────────────
const DetailDrawer = ({ item, type, onClose, onUpdate, onDelete }) => {
  const [note, setNote] = useState('');
  const [stage, setStage] = useState(item?.stage || item?.status || 'new');
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  if (!item) return null;

  const stageOptions = type === 'lead' ? LEAD_STAGES
    : type === 'contact' ? CONTACT_STATUSES
    : FEEDBACK_STATUSES;

  const handleSave = async () => {
    setSaving(true);
    const table = type === 'lead' ? 'leads' : type === 'contact' ? 'contact_submissions' : 'fl_feedback';
    const field = type === 'lead' ? 'stage' : 'status';
    const updates = { [field]: stage, updated_at: new Date().toISOString() };
    if (type === 'contact' && note) {
      const existing = Array.isArray(item.admin_notes) ? item.admin_notes : [];
      updates.admin_notes = [...existing, { text: note, ts: new Date().toISOString() }];
    }
    if (type === 'lead' && note) {
      updates.notes = (item.notes ? item.notes + '\n' : '') + `[${new Date().toLocaleDateString('en-GB')}] ${note}`;
    }
    if (table === 'fl_feedback') {
      await supabase.rpc('update_feedback_status', { feedback_id: item.id, new_status: stage });
    } else {
      await supabase.from(table).update(updates).eq('id', item.id);
    }
    setSaving(false); setNote(''); onUpdate(item.id, updates);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(item.id);
    setDeleting(false);
    onClose();
  };

  const fmt = (d) => d ? new Date(d).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : '—';

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="flex-1 bg-black/30 backdrop-blur-[2px]" onClick={onClose} />
      <div className="w-[480px] bg-white shadow-2xl flex flex-col overflow-hidden border-l border-gray-200">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-start bg-gradient-to-r from-slate-50 to-blue-50">
          <div>
            <p className="text-lg font-bold text-slate-800">{item.name || item.user_email || 'Unknown'}</p>
            <p className="text-sm text-slate-500 mt-0.5">{fmt(item.created_at)}</p>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            {!deleteConfirm ? (
              <button onClick={() => setDeleteConfirm(true)} title="Delete this entry"
                className="text-slate-300 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5">
                <span className="text-xs font-semibold text-red-600">Delete?</span>
                <button onClick={handleDelete} disabled={deleting}
                  className="text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-2 py-0.5 rounded transition-colors disabled:opacity-50">
                  {deleting ? '…' : 'Yes'}
                </button>
                <button onClick={() => setDeleteConfirm(false)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-700 px-1">No</button>
              </div>
            )}
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl leading-none p-1 mt-0.5">✕</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
            {[
              ['Email', item.email], ['Company', item.company],
              ['Phone', item.phone], ['Source', item.source],
              ['Interest', Array.isArray(item.interest) ? item.interest.join(', ') : item.interest],
              ['Deal Value', item.deal_value ? `£${Number(item.deal_value).toLocaleString()}` : null],
              ['Page', item.page_url], ['Browser', item.browser],
            ].filter(([, v]) => v).map(([label, value]) => (
              <div key={label}>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
                <p className="text-sm text-slate-700 break-all">{value}</p>
              </div>
            ))}
          </div>
          {item.message && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Message</p>
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl px-4 py-3 text-sm text-slate-700 leading-relaxed">{item.message}</div>
            </div>
          )}
          {(item.notes || (Array.isArray(item.admin_notes) && item.admin_notes.length > 0)) && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Notes</p>
              <div className="space-y-2">
                {type === 'lead' && item.notes?.split('\n').filter(Boolean).map((n, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600">{n}</div>
                ))}
                {type === 'contact' && (item.admin_notes || []).map((n, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm">
                    <span className="text-slate-400 text-xs mr-2">{new Date(n.ts).toLocaleDateString('en-GB')}</span>
                    <span className="text-slate-600">{n.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Update Status</p>
            <select value={stage} onChange={e => setStage(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              {stageOptions.map(s => (
                <option key={s} value={s}>{s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
              ))}
            </select>
            {type !== 'feedback' && (
              <textarea value={note} onChange={e => setNote(e.target.value)}
                placeholder="Add a note…" rows={3}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
            )}
            <Button onClick={handleSave} disabled={saving} size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              {saving ? 'Saving…' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Shared UI ─────────────────────────────────────────────────────────────────
const StatRow = ({ stats }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    {stats.map(({ label, value, icon: Icon, color, bgColor }) => (
      <Card key={label} className="border border-gray-200 shadow-sm">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
              <p className="text-3xl font-extrabold text-slate-800" style={{ letterSpacing: '-0.03em' }}>{value}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgColor}`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const DataTable = ({ columns, rows, onRowClick }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-slate-50 border-b border-gray-200">
          {columns.map(col => (
            <th key={col.key} className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-slate-400">No records found</td></tr>
        ) : rows.map((row, i) => (
          <tr key={row.id || i} onClick={() => onRowClick?.(row)}
            className={`border-b border-gray-100 transition-colors ${onRowClick ? 'cursor-pointer hover:bg-blue-50/50' : ''}`}>
            {columns.map(col => (
              <td key={col.key} className="px-4 py-3 text-slate-600 align-middle">
                {col.render ? col.render(row[col.key], row) : (row[col.key] || '—')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FilterBar = ({ search, onSearch, filters, activeFilter, onFilter, placeholder }) => (
  <div className="px-4 py-3 border-b border-gray-100 bg-slate-50/70 flex flex-wrap gap-3 items-center">
    <div className="relative flex-1 min-w-[180px]">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
      <Input value={search} onChange={e => onSearch(e.target.value)}
        placeholder={placeholder || 'Search…'} className="pl-7 h-8 text-sm bg-white border-slate-200" />
    </div>
    <div className="flex gap-1 flex-wrap">
      {filters.map(f => (
        <button key={f.value} onClick={() => onFilter(f.value)}
          className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
            activeFilter === f.value ? 'bg-blue-600 text-white border-blue-600' : 'text-slate-500 border-transparent hover:border-slate-300 hover:text-slate-700'
          }`}>{f.label}</button>
      ))}
    </div>
  </div>
);

const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

// ─── Leads view ────────────────────────────────────────────────────────────────
const LeadsView = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    setLeads(data || []); setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const filtered = leads.filter(l =>
    (stageFilter === 'all' || l.stage === stageFilter) &&
    (!search || [l.name, l.email, l.company].some(v => v?.toLowerCase().includes(search.toLowerCase())))
  );
  const handleUpdate = (id, updates) => {
    setLeads(p => p.map(l => l.id === id ? { ...l, ...updates } : l));
    setSelected(p => p?.id === id ? { ...p, ...updates } : p);
  };
  const handleDelete = async (id) => {
    await supabase.from('leads').delete().eq('id', id);
    setLeads(p => p.filter(l => l.id !== id));
    setSelected(null);
  };

  const stageCounts = LEAD_STAGES.reduce((acc, s) => { acc[s] = leads.filter(l => l.stage === s).length; return acc; }, {});
  const stats = [
    { label: 'Total Leads', value: leads.length, icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'New', value: stageCounts.new || 0, icon: Clock, color: 'text-cyan-600', bgColor: 'bg-cyan-50' },
    { label: 'In Progress', value: (stageCounts.contacted || 0) + (stageCounts.qualified || 0) + (stageCounts.proposal || 0), icon: AlertCircle, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { label: 'Won', value: stageCounts.won || 0, icon: CheckCircle2, color: 'text-green-600', bgColor: 'bg-green-50' },
  ];
  const cols = [
    { key: 'name', label: 'Name', render: (v, r) => <div><p className="font-semibold text-slate-800">{v}</p><p className="text-xs text-slate-400">{r.email}</p></div> },
    { key: 'company', label: 'Company', render: v => <span className="text-slate-700">{v || '—'}</span> },
    { key: 'stage', label: 'Stage', render: v => <StagePill label={v || 'new'} /> },
    { key: 'deal_value', label: 'Value', render: v => v ? <span className="font-bold text-slate-700">£{Number(v).toLocaleString()}</span> : '—' },
    { key: 'created_at', label: 'Received', render: fmt },
  ];
  const filterOptions = [
    { value: 'all', label: `All (${leads.length})` },
    ...LEAD_STAGES.map(s => ({ value: s, label: `${s.charAt(0).toUpperCase() + s.slice(1)} (${stageCounts[s] || 0})` })),
  ];

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" /></div>;
  return (
    <div>
      <StatRow stats={stats} />
      <Card className="border border-gray-200 shadow-sm overflow-hidden">
        <FilterBar search={search} onSearch={setSearch} filters={filterOptions} activeFilter={stageFilter} onFilter={setStageFilter} placeholder="Search leads…" />
        <DataTable columns={cols} rows={filtered} onRowClick={setSelected} />
      </Card>
      {selected && <DetailDrawer item={selected} type="lead" onClose={() => setSelected(null)} onUpdate={handleUpdate} onDelete={handleDelete} />}
    </div>
  );
};

// ─── Contacts view ─────────────────────────────────────────────────────────────
const ContactsView = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
      setItems(data || []); setLoading(false);
    })();
  }, []);

  const filtered = items.filter(l =>
    (statusFilter === 'all' || l.status === statusFilter) &&
    (!search || [l.name, l.email, l.company].some(v => v?.toLowerCase().includes(search.toLowerCase())))
  );
  const handleUpdate = (id, updates) => {
    setItems(p => p.map(l => l.id === id ? { ...l, ...updates } : l));
    setSelected(p => p?.id === id ? { ...p, ...updates } : p);
  };
  const handleDelete = async (id) => {
    await supabase.from('contact_submissions').delete().eq('id', id);
    setItems(p => p.filter(l => l.id !== id));
    setSelected(null);
  };

  const counts = CONTACT_STATUSES.reduce((acc, s) => { acc[s] = items.filter(l => l.status === s).length; return acc; }, {});
  const stats = [
    { label: 'Total', value: items.length, icon: Mail, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'New', value: counts.new || 0, icon: Clock, color: 'text-cyan-600', bgColor: 'bg-cyan-50' },
    { label: 'In Progress', value: counts.in_progress || 0, icon: AlertCircle, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { label: 'Resolved', value: counts.resolved || 0, icon: CheckCircle2, color: 'text-green-600', bgColor: 'bg-green-50' },
  ];
  const cols = [
    { key: 'name', label: 'Name', render: (v, r) => <div><p className="font-semibold text-slate-800">{v}</p><p className="text-xs text-slate-400">{r.email}</p></div> },
    { key: 'company', label: 'Company', render: v => <span className="text-slate-700">{v || '—'}</span> },
    { key: 'message', label: 'Message', render: v => v ? v.slice(0, 60) + (v.length > 60 ? '…' : '') : '—' },
    { key: 'status', label: 'Status', render: v => <StagePill label={v || 'new'} /> },
    { key: 'created_at', label: 'Received', render: fmt },
  ];
  const filterOptions = [
    { value: 'all', label: 'All' },
    ...CONTACT_STATUSES.map(s => ({ value: s, label: s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) })),
  ];

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" /></div>;
  return (
    <div>
      <StatRow stats={stats} />
      <Card className="border border-gray-200 shadow-sm overflow-hidden">
        <FilterBar search={search} onSearch={setSearch} filters={filterOptions} activeFilter={statusFilter} onFilter={setStatusFilter} placeholder="Search contacts…" />
        <DataTable columns={cols} rows={filtered} onRowClick={setSelected} />
      </Card>
      {selected && <DetailDrawer item={selected} type="contact" onClose={() => setSelected(null)} onUpdate={handleUpdate} onDelete={handleDelete} />}
    </div>
  );
};

// ─── Feedback view ─────────────────────────────────────────────────────────────
const FeedbackView = ({ feedbackType }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase.from('fl_feedback').select('*').eq('type', feedbackType).order('created_at', { ascending: false });
      setItems(data || []); setLoading(false);
    })();
  }, [feedbackType]);

  const filtered = items.filter(l =>
    (statusFilter === 'all' || l.status === statusFilter) &&
    (!search || [l.user_email, l.message, l.page_url].some(v => v?.toLowerCase().includes(search.toLowerCase())))
  );
  const handleUpdate = (id, updates) => {
    setItems(p => p.map(l => l.id === id ? { ...l, ...updates } : l));
    setSelected(p => p?.id === id ? { ...p, ...updates } : p);
  };
  const handleDelete = async (id) => {
    await supabase.from('fl_feedback').delete().eq('id', id);
    setItems(p => p.filter(l => l.id !== id));
    setSelected(null);
  };

  const counts = FEEDBACK_STATUSES.reduce((acc, s) => { acc[s] = items.filter(i => i.status === s).length; return acc; }, {});
  const isFault = feedbackType === 'fault';
  const stats = [
    { label: isFault ? 'Total Issues' : 'Total Features', value: items.length, icon: isFault ? Bug : Lightbulb, color: isFault ? 'text-red-600' : 'text-purple-600', bgColor: isFault ? 'bg-red-50' : 'bg-purple-50' },
    { label: 'New', value: counts.new || 0, icon: Clock, color: 'text-cyan-600', bgColor: 'bg-cyan-50' },
    { label: 'In Progress', value: counts.in_progress || 0, icon: AlertCircle, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { label: 'Done', value: counts.done || 0, icon: CheckCircle2, color: 'text-green-600', bgColor: 'bg-green-50' },
  ];
  const cols = [
    { key: 'user_email', label: 'User', render: v => <span className="font-medium text-slate-800">{v || 'Anonymous'}</span> },
    { key: 'message', label: 'Message', render: v => <span className="text-slate-600">{v ? v.slice(0, 80) + (v.length > 80 ? '…' : '') : '—'}</span> },
    { key: 'page_url', label: 'Page', render: v => v ? <span className="font-mono text-[11px] text-slate-400">{v.replace(/^https?:\/\/[^/]+/, '').slice(0, 40)}</span> : '—' },
    { key: 'status', label: 'Status', render: v => <StagePill label={(v || 'new').replace(/_/g, ' ')} /> },
    { key: 'created_at', label: 'Submitted', render: fmt },
  ];
  const filterOptions = [
    { value: 'all', label: `All (${items.length})` },
    ...FEEDBACK_STATUSES.map(s => ({ value: s, label: `${s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} (${counts[s] || 0})` })),
  ];

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" /></div>;
  return (
    <div>
      <StatRow stats={stats} />
      <Card className="border border-gray-200 shadow-sm overflow-hidden">
        <FilterBar search={search} onSearch={setSearch} filters={filterOptions} activeFilter={statusFilter} onFilter={setStatusFilter} placeholder={`Search ${isFault ? 'issues' : 'features'}…`} />
        <DataTable columns={cols} rows={filtered} onRowClick={setSelected} />
      </Card>
      {selected && <DetailDrawer item={selected} type="feedback" onClose={() => setSelected(null)} onUpdate={handleUpdate} onDelete={handleDelete} />}
    </div>
  );
};

// ─── Dashboard ─────────────────────────────────────────────────────────────────
const DashboardView = ({ setView }) => {
  const [stats, setStats] = useState({ leads: 0, contacts: 0, issues: 0, features: 0, newLeads: 0, openIssues: 0, recentActivity: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [leads, contacts, issues, features] = await Promise.all([
        supabase.from('leads').select('id, name, email, stage, created_at').order('created_at', { ascending: false }),
        supabase.from('contact_submissions').select('id, name, email, status, created_at').order('created_at', { ascending: false }),
        supabase.from('fl_feedback').select('id, user_email, message, status, created_at').eq('type', 'fault').order('created_at', { ascending: false }),
        supabase.from('fl_feedback').select('id, user_email, message, status, created_at').eq('type', 'feature').order('created_at', { ascending: false }),
      ]);
      const allActivity = [
        ...(leads.data || []).slice(0, 5).map(r => ({ ...r, _type: 'lead' })),
        ...(contacts.data || []).slice(0, 3).map(r => ({ ...r, _type: 'contact' })),
        ...(issues.data || []).slice(0, 3).map(r => ({ ...r, _type: 'issue' })),
        ...(features.data || []).slice(0, 3).map(r => ({ ...r, _type: 'feature' })),
      ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10);
      setStats({
        leads: leads.data?.length || 0, contacts: contacts.data?.length || 0,
        issues: issues.data?.length || 0, features: features.data?.length || 0,
        newLeads: (leads.data || []).filter(l => l.stage === 'new').length,
        openIssues: (issues.data || []).filter(i => ['new', 'in_progress'].includes(i.status)).length,
        recentActivity: allActivity,
      });
      setLoading(false);
    })();
  }, []);

  const fmtAgo = (d) => {
    const diff = Date.now() - new Date(d).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" /></div>;

  const topStats = [
    { label: 'Total Leads', value: stats.leads, icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Contact Forms', value: stats.contacts, icon: Mail, color: 'text-cyan-600', bgColor: 'bg-cyan-50' },
    { label: 'Open Issues', value: stats.openIssues, icon: Bug, color: 'text-red-600', bgColor: 'bg-red-50' },
    { label: 'Feature Requests', value: stats.features, icon: Lightbulb, color: 'text-purple-600', bgColor: 'bg-purple-50' },
  ];
  const quickLinks = [
    { label: 'CRM Leads', sub: `${stats.newLeads} new`, view: 'leads', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { label: 'Contact Forms', sub: `${stats.contacts} total`, view: 'contacts', icon: Mail, color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100' },
    { label: 'Bug Reports', sub: `${stats.openIssues} open`, view: 'issues', icon: Bug, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
    { label: 'Feature Requests', sub: `${stats.features} total`, view: 'features', icon: Lightbulb, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
  ];
  const typeConfig = {
    lead: { label: 'CRM Lead', color: 'text-blue-600', bg: 'bg-blue-50', icon: '👤' },
    contact: { label: 'Contact Form', color: 'text-cyan-600', bg: 'bg-cyan-50', icon: '✉️' },
    issue: { label: 'Issue', color: 'text-red-600', bg: 'bg-red-50', icon: '🐛' },
    feature: { label: 'Feature Request', color: 'text-purple-600', bg: 'bg-purple-50', icon: '💡' },
  };

  return (
    <div className="space-y-6">
      <StatRow stats={topStats} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map(lnk => (
          <button key={lnk.view} onClick={() => setView(lnk.view)}
            className={`${lnk.bg} border ${lnk.border} rounded-xl p-4 text-left hover:-translate-y-0.5 hover:shadow-md transition-all`}>
            <lnk.icon className={`w-6 h-6 ${lnk.color} mb-2`} />
            <p className="font-bold text-slate-800 text-sm">{lnk.label}</p>
            <p className={`text-xs font-semibold mt-0.5 ${lnk.color}`}>{lnk.sub}</p>
          </button>
        ))}
      </div>
      <Card className="border border-gray-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-gray-100 py-3 px-5">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold text-slate-700">Recent Activity</CardTitle>
            <span className="text-xs text-slate-400">Last 10 entries</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {stats.recentActivity.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Inbox className="w-12 h-12 mb-3 opacity-30" /><p>No recent activity</p>
            </div>
          ) : stats.recentActivity.map((item, i) => {
            const tc = typeConfig[item._type];
            return (
              <div key={i} className="flex items-center gap-3 px-5 py-3 border-b border-gray-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                <div className={`w-9 h-9 rounded-lg ${tc.bg} flex items-center justify-center text-base flex-shrink-0`}>{tc.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-800">{item.name || item.user_email || 'Anonymous'}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tc.bg} ${tc.color} uppercase tracking-wider`}>{tc.label}</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{item.email || item.message?.slice(0, 80)}</p>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0">{fmtAgo(item.created_at)}</span>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

// ─── Pricing view ──────────────────────────────────────────────────────────────
const PricingView = () => {
  const PriceTag = ({ price, suffix = '' }) => (
    <div className="mt-3 mb-1">
      <span className="text-3xl font-extrabold text-slate-800" style={{ letterSpacing: '-0.03em' }}>{price}</span>
      {suffix && <span className="text-sm text-slate-500 ml-1">{suffix}</span>}
    </div>
  );

  const Feature = ({ children, highlight }) => (
    <li className={`flex items-start gap-2 text-sm ${highlight ? 'font-semibold text-blue-700' : 'text-slate-600'}`}>
      <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${highlight ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>✓</span>
      {children}
    </li>
  );

  const StripeId = ({ id }) => (
    <div className="mt-3 pt-3 border-t border-slate-100">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Stripe Price ID</p>
      <code className="text-[11px] text-slate-500 font-mono break-all">{id}</code>
    </div>
  );

  return (
    <div className="space-y-8">

      {/* FortifyLearn PBQ ── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-800">FortifyLearn — PBQ Packs</h2>
            <p className="text-xs text-slate-500">One-time purchase · 12-month access · Sold exclusively via cy-sec.co.uk/store</p>
          </div>
        </div>

        {/* Bundle highlight */}
        <div className="mb-4 rounded-2xl border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 p-5 relative overflow-hidden">
          <div className="absolute top-3 right-4 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Best Value</div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-extrabold text-slate-800 text-lg">All Access Bundle</p>
              <p className="text-sm text-slate-600 mt-0.5">Network+ · Security+ · CySA+ — all three packs</p>
              <PriceTag price="£39.99" suffix="one-time" />
              <p className="text-xs text-blue-700 font-semibold">Save £19.98 vs buying separately</p>
              <StripeId id="price_1TKO4SPp3j8eGdIt0XlJIfYV" />
            </div>
          </div>
        </div>

        {/* Individual packs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              cert: 'Network+', code: 'N10-009', emoji: '🌐',
              color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200',
              stripeId: 'price_1TKO3wPp3j8eGdItvwIpvTCL',
              features: ['Full PBQ question bank', 'Drag-and-drop scenarios', 'Network topology labs', 'Unlimited attempts'],
            },
            {
              cert: 'Security+', code: 'SY0-701', emoji: '🔐',
              color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200',
              stripeId: 'price_1TKO41Pp3j8eGdItOKEhy5xl',
              features: ['Full PBQ question bank', 'Firewall config labs', 'Incident response sims', 'Unlimited attempts'],
            },
            {
              cert: 'CySA+', code: 'CS0-003', emoji: '🛡️',
              color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200',
              stripeId: 'price_1TKO4IPp3j8eGdItmitBvdAY',
              features: ['Full PBQ question bank', 'Threat analysis labs', 'SIEM & log review sims', 'Unlimited attempts'],
            },
          ].map(pack => (
            <div key={pack.cert} className={`rounded-xl border ${pack.border} ${pack.bg} p-4`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{pack.emoji}</span>
                <div>
                  <p className={`font-extrabold text-sm ${pack.color}`}>{pack.cert}</p>
                  <p className="text-[11px] text-slate-500 font-mono">{pack.code}</p>
                </div>
              </div>
              <PriceTag price="£19.99" suffix="one-time" />
              <ul className="space-y-1.5 mt-3 mb-3">
                {pack.features.map(f => <Feature key={f}>{f}</Feature>)}
              </ul>
              <StripeId id={pack.stripeId} />
            </div>
          ))}
        </div>

        {/* Free tasters */}
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">🎁</span>
            <p className="font-bold text-slate-700 text-sm">Free Taster Labs</p>
            <span className="ml-auto text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">FREE</span>
          </div>
          <p className="text-xs text-slate-500">One free Easy-difficulty PBQ available per certification without login. Designed to drive conversions to paid packs.</p>
        </div>
      </div>

      {/* Consulting & Platform ── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
            <Tag className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-800">Consulting & Platform Services</h2>
            <p className="text-xs text-slate-500">Recurring and project-based engagements</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: 'FortifyOne GRC Platform', emoji: '🏛️',
              price: 'From £149', suffix: '/month',
              color: 'text-cyan-700', bg: 'bg-cyan-50', border: 'border-cyan-200',
              features: [
                'Risk & compliance management',
                'Policy & control library',
                'Vendor risk assessments',
                'DPIA & FRIA tooling',
                'UK SME focused',
              ],
              note: 'Hosted on fortifyone.co.uk → Hostinger',
            },
            {
              name: 'vCISO Retainer', emoji: '🎯',
              price: 'From £995', suffix: '/month',
              color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200',
              features: [
                'FortifyOne platform included',
                'Strategic security leadership',
                'Board & exec reporting',
                'Incident response support',
                'Delivered by Gary Cocklin CISSP-ISSAP',
              ],
              note: null,
            },
            {
              name: 'DORA Compliance Sprint', emoji: '⚡',
              price: 'From £4,000', suffix: 'fixed price',
              color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200',
              features: [
                'Gap analysis against DORA requirements',
                'ICT risk register setup',
                'Incident reporting framework',
                'Third-party risk assessment',
                'Enforcement mandatory Jan 2025',
              ],
              note: 'Targeted at financial sector firms in scope for DORA',
            },
            {
              name: 'NIS2 Compliance Review', emoji: '🔍',
              price: 'From £2,500', suffix: 'fixed price',
              color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200',
              features: [
                'Scoping & applicability assessment',
                'Current-state gap analysis',
                'Risk management recommendations',
                'Incident handling review',
                'Written report & action plan',
              ],
              note: null,
            },
            {
              name: 'Tabletop Exercises (TTX)', emoji: '🎲',
              price: 'POA', suffix: '',
              color: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200',
              features: [
                'Custom scenario design',
                'Ransomware / supply chain / insider threat',
                'Executive & technical variants',
                'Post-exercise report & lessons learned',
              ],
              note: 'Price on application — scope-dependent',
            },
            {
              name: 'Certification Training', emoji: '🎓',
              price: 'POA', suffix: '',
              color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200',
              features: [
                'CISM · CRISC · AAISM · CGEIT · CCSP',
                'BCS CISMP · CertNexus',
                'Delivered via Firebrand partnership',
                'Blended and instructor-led options',
              ],
              note: 'Cy-Sec is a CompTIA Authorised Partner',
            },
          ].map(svc => (
            <div key={svc.name} className={`rounded-xl border ${svc.border} ${svc.bg} p-4`}>
              <div className="flex items-start gap-2 mb-1">
                <span className="text-xl mt-0.5">{svc.emoji}</span>
                <p className={`font-extrabold text-sm ${svc.color} leading-tight`}>{svc.name}</p>
              </div>
              <PriceTag price={svc.price} suffix={svc.suffix} />
              <ul className="space-y-1.5 mt-3">
                {svc.features.map(f => <Feature key={f}>{f}</Feature>)}
              </ul>
              {svc.note && (
                <p className="text-[11px] text-slate-400 mt-3 italic">{svc.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Apple / Store note ── */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex gap-3">
        <span className="text-xl flex-shrink-0">🍎</span>
        <div>
          <p className="font-bold text-amber-800 text-sm">iOS Compliance Note</p>
          <p className="text-xs text-amber-700 mt-0.5">FortifyLearn iOS app must never show prices or purchase buttons. cy-sec.co.uk/store is the only compliant purchase route for PBQ packs. This is an Apple App Store requirement.</p>
        </div>
      </div>

    </div>
  );
};

// ─── Config view ───────────────────────────────────────────────────────────────
const ConfigView = () => {
  const sections = [
    {
      title: 'Platform & Hosting', icon: Shield, color: 'text-cyan-600', bg: 'bg-cyan-50',
      items: [
        { label: 'Main Site', value: 'cy-sec.co.uk → Vercel (auto-deploy from GitHub main branch on push)' },
        { label: 'GitHub', value: 'github.com/GazCocklin/cy-sec-website (main branch)' },
        { label: 'Stack', value: 'React + Vite + Tailwind CSS + shadcn/ui' },
        { label: 'FortifyLearn', value: 'fortifylearn.co.uk → Vercel static' },
        { label: 'FortifyOne', value: 'fortifyone.co.uk → Hostinger' },
        { label: 'Supabase', value: 'kmnbtnfgeadvvkwsdyml.supabase.co (shared across cy-sec + FortifyLearn — single auth)' },
        { label: 'Admin Login', value: 'cy-sec.co.uk/admin/login — allowed: gazc@cy-sec.co.uk, aimeec@cy-sec.co.uk' },
        { label: 'Store URL', value: 'cy-sec.co.uk/store — only place PBQ packs can be purchased (Apple compliance)' },
      ],
    },
    {
      title: 'Supabase — Key Patterns', icon: Settings2, color: 'text-blue-600', bg: 'bg-blue-50',
      items: [
        { label: 'fl_feedback UPDATE', value: 'Must use RPC: supabase.rpc("update_feedback_status", { feedback_id, new_status }). Direct .update() silently fails due to RLS.' },
        { label: 'fl_feedback trigger', value: 'No trigger — Notion sync removed Apr 2026. Feedback is self-contained in admin panel only.' },
        { label: 'Checkout', value: 'FL Supabase edge function create-checkout-session — requires user JWT. Cancel: cy-sec.co.uk/store · Success: fortifylearn.co.uk/?payment=success' },
        { label: 'Anon key', value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9… (in customSupabaseClient.js and StorePage.jsx)' },
      ],
    },
    {
      title: 'Outstanding Items', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50',
      items: [
        { label: 'Privacy Policy', value: '3 placeholders still need real values: (1) Company registration number — Companies House, (2) Registered office address, (3) ICO registration number' },
      ],
    },
    {
      title: 'Content & Brand Rules', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50',
      items: [
        { label: 'Wordmark', value: "Always 'Cy-Sec' — never CY-SEC or cy-sec" },
        { label: 'Tone', value: "Direct, practitioner-led. No jargon for jargon's sake." },
        { label: 'CompTIA', value: 'Always "Authorised" (UK spelling). Cy-Sec is a CompTIA Authorised Partner.' },
        { label: 'eSentire', value: 'Managed security partner — not a Cy-Sec product. Do not present as owned.' },
        { label: 'PBQ store', value: 'Always show 12-month access. Never mention iOS or Apple on store page.' },
        { label: 'Primary colour', value: '#1A56DB (Cy-Sec blue) · Navy: #0A1E3F' },
        { label: 'Typography', value: 'Bricolage Grotesque (headings) · system-ui (body)' },
        { label: 'CompTIA logos', value: '/public/logos/comptia-network-plus.svg · comptia-security-plus.svg · comptia-cysa-plus.svg' },
      ],
    },
    {
      title: 'Business & Owner', icon: Users, color: 'text-slate-600', bg: 'bg-slate-100',
      items: [
        { label: 'Company', value: 'Cy-Sec Awareness and Consultancy Ltd' },
        { label: 'Owner', value: 'Gary Cocklin (Gaz) — Senior Executive Security Consultant & vCISO' },
        { label: 'Certifications', value: 'CISSP-ISSAP · CISM · CRISC · CGEIT · CCSP · AAISM · CITP MBCS' },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {sections.map(section => (
        <Card key={section.title} className="border border-gray-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-gray-100 py-3 px-5">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className={`w-7 h-7 rounded-lg ${section.bg} flex items-center justify-center`}>
                <section.icon className={`w-4 h-4 ${section.color}`} />
              </div>
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {section.items.map((item, i) => (
              <div key={i} className={`grid grid-cols-[200px_1fr] gap-4 px-5 py-3 ${i < section.items.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${section.color} font-mono pt-0.5`}>{item.label}</span>
                <span className="text-sm text-slate-600 leading-relaxed">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// ─── Nav ───────────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'dashboard', label: 'Dashboard',        icon: LayoutDashboard },
  { id: 'leads',     label: 'CRM Leads',         icon: Users },
  { id: 'contacts',  label: 'Contact Forms',      icon: Mail },
  { id: 'issues',    label: 'Issues',             icon: Bug },
  { id: 'features',  label: 'Feature Requests',   icon: Lightbulb },
  { id: 'pricing',   label: 'Pricing',            icon: Tag },
  { id: 'config',    label: 'Platform Config',    icon: Settings2 },
];

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  leads:     'CRM Leads',
  contacts:  'Contact Forms',
  issues:    'Bug Reports & Issues',
  features:  'Feature Requests',
  pricing:   'Pricing Overview',
  config:    'Platform Configuration',
};

// ─── Root ──────────────────────────────────────────────────────────────────────
export default function AdminHomePage() {
  const [view, setView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderView = () => {
    switch (view) {
      case 'dashboard': return <DashboardView setView={setView} />;
      case 'leads':     return <LeadsView />;
      case 'contacts':  return <ContactsView />;
      case 'issues':    return <FeedbackView feedbackType="fault" />;
      case 'features':  return <FeedbackView feedbackType="feature" />;
      case 'pricing':   return <PricingView />;
      case 'config':    return <ConfigView />;
      default:          return <DashboardView setView={setView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
      <div className={`${sidebarOpen ? 'w-56' : 'w-16'} flex-shrink-0 bg-white border-r border-gray-200 flex flex-col transition-all duration-200 shadow-sm`}>
        <div className={`border-b border-gray-100 flex items-center gap-3 px-4 py-5 ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
          {sidebarOpen && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[15px] font-extrabold text-slate-800 leading-tight" style={{ letterSpacing: '-0.03em' }}>Cy-Sec</p>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-tight">Admin</p>
              </div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(p => !p)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0">
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {NAV.map(item => {
            const active = view === item.id;
            return (
              <button key={item.id} onClick={() => setView(item.id)}
                title={!sidebarOpen ? item.label : undefined}
                className={`w-full flex items-center gap-2.5 rounded-lg transition-all px-2.5 py-2
                  ${sidebarOpen ? '' : 'justify-center'}
                  ${active
                    ? 'bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 border-l-2 border-transparent'
                  }`}>
                <item.icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-blue-600' : ''}`} />
                {sidebarOpen && <span className="text-sm whitespace-nowrap">{item.label}</span>}
              </button>
            );
          })}
        </nav>
        {sidebarOpen && (
          <div className="border-t border-gray-100 px-4 py-3">
            <p className="text-xs font-semibold text-slate-600">Gary Cocklin</p>
            <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">CISSP-ISSAP · CISM · CRISC</p>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-200 shadow-sm px-7 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-slate-800" style={{ letterSpacing: '-0.03em' }}>{PAGE_TITLES[view]}</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <a href="/" className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 border border-gray-200 hover:border-blue-300 px-3 py-1.5 rounded-lg bg-white transition-all">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to site
          </a>
        </div>
        <div className="flex-1 overflow-y-auto p-7">
          {renderView()}
        </div>
      </div>
    </div>
  );
}
