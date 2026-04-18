import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  LayoutDashboard, Users, Mail, Bug, Lightbulb, Settings2, ShoppingBag,
  ChevronLeft, ChevronRight, ArrowLeft, Activity,
  Clock, CheckCircle2, AlertCircle, Inbox,
  TrendingUp, Shield, Trash2, Tag, Package, Layers, BookOpen,
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
            {type === 'contact' && (
              <div className="mt-2">
                <CountdownBadge createdAt={item.created_at} status={item.status} verbose={true} />
              </div>
            )}
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
            className={`border-b border-gray-100 transition-colors ${onRowClick ? 'cursor-pointer hover:bg-slate-50' : ''}`}>
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

// ─── Business day countdown ────────────────────────────────────────────────────
function calcBusinessDeadline(createdAt) {
  const d = new Date(createdAt);
  d.setDate(d.getDate() + 1);
  if (d.getDay() === 6) d.setDate(d.getDate() + 2); // Sat → Mon
  if (d.getDay() === 0) d.setDate(d.getDate() + 1); // Sun → Mon
  return d;
}

const CountdownBadge = ({ createdAt, status, verbose = false }) => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    if (['resolved', 'archived'].includes(status)) return;
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, [status]);

  if (['resolved', 'archived'].includes(status))
    return <span className="text-xs text-slate-300">—</span>;

  const deadline = calcBusinessDeadline(createdAt);
  const respondBy = deadline.toLocaleString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short',
    hour: '2-digit', minute: '2-digit',
  });
  const diff = deadline - now;

  if (diff <= 0) return (
    <div className="flex flex-col gap-0.5">
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700 border border-red-200 whitespace-nowrap w-fit">
        <AlertCircle className="w-3 h-3" /> Overdue
      </span>
      <span className="text-[10px] text-slate-400 whitespace-nowrap">Was due {respondBy}</span>
    </div>
  );

  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const colour = h >= 8 ? 'bg-green-50 text-green-700 border-green-200'
               : h >= 2 ? 'bg-amber-50 text-amber-700 border-amber-200'
               :           'bg-red-50 text-red-700 border-red-200';

  if (verbose) return (
    <div className={`rounded-xl border p-3 ${colour}`}>
      <div className="flex items-center gap-1.5 mb-1">
        <Clock className="w-3.5 h-3.5" />
        <span className="text-sm font-bold">{h}h {m}m remaining</span>
      </div>
      <p className="text-[11px] opacity-80">Respond by {respondBy}</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-0.5">
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${colour} whitespace-nowrap w-fit`}>
        <Clock className="w-3 h-3" />
        {h}h {m}m
      </span>
      <span className="text-[10px] text-slate-400 whitespace-nowrap">by {respondBy}</span>
    </div>
  );
};

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
    await supabase.rpc('admin_delete_lead', { p_id: id });
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

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0891B2]" /></div>;
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
    await supabase.rpc('admin_delete_contact_submission', { p_id: id });
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
    { key: '_due', label: 'Response Due', render: (_, r) => <CountdownBadge createdAt={r.created_at} status={r.status} /> },
    { key: 'created_at', label: 'Received', render: fmt },
  ];
  const filterOptions = [
    { value: 'all', label: 'All' },
    ...CONTACT_STATUSES.map(s => ({ value: s, label: s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) })),
  ];

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0891B2]" /></div>;
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
    await supabase.rpc('admin_delete_feedback', { p_id: id });
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

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0891B2]" /></div>;
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
  const [drawerItem, setDrawerItem] = useState(null);
  const [drawerType, setDrawerType] = useState(null);
  const [allLeads, setAllLeads] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [allFeedback, setAllFeedback] = useState([]);

  const load = async () => {
    const [leads, contacts, issues, features] = await Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
      supabase.from('fl_feedback').select('*').eq('type', 'fault').order('created_at', { ascending: false }),
      supabase.from('fl_feedback').select('*').eq('type', 'feature').order('created_at', { ascending: false }),
    ]);
    const allFb = [...(issues.data || []), ...(features.data || [])];
    setAllLeads(leads.data || []);
    setAllContacts(contacts.data || []);
    setAllFeedback(allFb);
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
  };

  useEffect(() => { load(); }, []);

  const handleActivityClick = (item) => {
    let full, type;
    if (item._type === 'lead') { full = allLeads.find(l => l.id === item.id); type = 'lead'; }
    else if (item._type === 'contact') { full = allContacts.find(l => l.id === item.id); type = 'contact'; }
    else { full = allFeedback.find(l => l.id === item.id); type = 'feedback'; }
    if (full) { setDrawerItem(full); setDrawerType(type); }
  };

  const handleDrawerUpdate = (id, updates) => {
    setDrawerItem(p => p?.id === id ? { ...p, ...updates } : p);
  };

  const handleDrawerDelete = async (id) => {
    if (drawerType === 'lead') await supabase.rpc('admin_delete_lead', { p_id: id });
    else if (drawerType === 'contact') await supabase.rpc('admin_delete_contact_submission', { p_id: id });
    else await supabase.rpc('admin_delete_feedback', { p_id: id });
    setDrawerItem(null);
    setDrawerType(null);
    await load();
  };

  const fmtAgo = (d) => {
    const diff = Date.now() - new Date(d).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0891B2]" /></div>;

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
            <span className="text-xs text-slate-400">Click any row to open · Last 10 entries</span>
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
              <div key={i} onClick={() => handleActivityClick(item)}
                className="flex items-center gap-3 px-5 py-3 border-b border-gray-50 last:border-0 hover:bg-slate-50/60 cursor-pointer transition-colors group">
                <div className={`w-9 h-9 rounded-lg ${tc.bg} flex items-center justify-center text-base flex-shrink-0`}>{tc.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-800">{item.name || item.user_email || 'Anonymous'}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tc.bg} ${tc.color} uppercase tracking-wider`}>{tc.label}</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{item.email || item.message?.slice(0, 80)}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-slate-400">{fmtAgo(item.created_at)}</span>
                  <span className="text-slate-300 group-hover:text-blue-400 transition-colors text-sm">→</span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
      {drawerItem && (
        <DetailDrawer
          item={drawerItem}
          type={drawerType}
          onClose={() => { setDrawerItem(null); setDrawerType(null); }}
          onUpdate={handleDrawerUpdate}
          onDelete={handleDrawerDelete}
        />
      )}
    </div>
  );
};

// ─── Pricing / Pack Inspector view ────────────────────────────────────────────
const CERT_SERIES = [
  {
    cert: 'CompTIA Network+', code: 'N10-009',
    packs: [
      { key: 'netplus_pack',   label: 'Pack 1', num: 1 },
      { key: 'netplus_pack_2', label: 'Pack 2', num: 2 },
    ],
  },
  {
    cert: 'CompTIA Security+', code: 'SY0-701',
    packs: [
      { key: 'secplus_pack',   label: 'Pack 1', num: 1 },
      { key: 'secplus_pack_2', label: 'Pack 2', num: 2 },
    ],
  },
  {
    cert: 'CompTIA CySA+', code: 'CS0-003',
    packs: [
      { key: 'cysa_pack',   label: 'Pack 1', num: 1 },
      { key: 'cysa_pack_2', label: 'Pack 2', num: 2 },
    ],
  },
];

const CERT_THEME = {
  'CompTIA Network+':  { accent: '#10b981', bg: 'bg-emerald-50',  badge: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-200', bar: '#10b981' },
  'CompTIA Security+': { accent: '#0891B2', bg: 'bg-[#e0f2f9]',   badge: 'bg-[#b3e0f0] text-[#0E5F8A]',   border: 'border-[#b3e0f0]',  bar: '#0891B2' },
  'CompTIA CySA+':     { accent: '#0B1D3A', bg: 'bg-[#e8f4fb]',   badge: 'bg-[#b3cfe0] text-[#0B1D3A]',   border: 'border-[#b3cfe0]',  bar: '#0B1D3A' },
};

const DIFF_LABEL  = { taster:'Taster', beginner:'Easy', intermediate:'Inter.', advanced:'Hard', expert:'Expert' };
const DIFF_COLOUR = {
  taster:       'bg-slate-100 text-slate-500',
  beginner:     'bg-green-100 text-green-700',
  intermediate: 'bg-blue-100 text-blue-700',
  advanced:     'bg-amber-100 text-amber-700',
  expert:       'bg-[#0B1D3A]/10 text-[#0B1D3A]',
};

const PricingView = () => {
  const [packs, setPacks]             = useState([]);
  const [banks, setBanks]             = useState([]);
  const [attempts, setAttempts]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [showUnassigned, setShowUnassigned] = useState(false);

  useEffect(() => {
    (async () => {
      const [pr, br, ar] = await Promise.all([
        supabase.from('pbq_packs').select('*').order('exam_code'),
        supabase.from('pbq_banks').select('*').order('certification, difficulty, title'),
        supabase.from('pbq_attempts').select('bank_id, score_percentage, completed_at'),
      ]);
      setPacks(pr.data || []);
      setBanks(br.data || []);
      setAttempts(ar.data || []);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-10 w-10 border-b-2" style={{borderColor:'#0891B2'}} /></div>;

  const packsByKey   = Object.fromEntries(packs.filter(p => p.product_key).map(p => [p.product_key, p]));
  const bundle       = packs.find(p => p.certification === 'CompTIA');
  const allPackBankIds = new Set(packs.flatMap(p => p.bank_ids || []));
  const unassigned   = banks.filter(b => !allPackBankIds.has(b.id) && b.certification !== 'Platform Tutorial');

  // Per-bank attempt stats
  const attemptsByBank = {};
  for (const a of attempts) {
    if (!attemptsByBank[a.bank_id]) attemptsByBank[a.bank_id] = { count: 0, scores: [] };
    attemptsByBank[a.bank_id].count++;
    if (a.score_percentage != null) attemptsByBank[a.bank_id].scores.push(Number(a.score_percentage));
  }

  const totalPacks = CERT_SERIES.flatMap(s => s.packs).filter(p => packsByKey[p.key]).length;

  return (
    <div className="space-y-6">

      {/* ── Summary strip ── */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-3 flex items-center gap-4">
          <div className="w-9 h-9 rounded-lg bg-[#e0f2f9] flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-4 h-4" style={{color:'#0891B2'}} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-0.5">FortifyLearn</p>
            <p className="text-sm text-slate-700">
              {totalPacks} active pack{totalPacks !== 1 ? 's' : ''} across {CERT_SERIES.length} certifications
              {bundle ? ' + 1 bundle' : ''}
              {' \u00b7 '} {banks.filter(b => b.certification !== 'Platform Tutorial').length} labs total
              {' \u00b7 '} {attempts.length} attempts logged
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-lg font-extrabold text-slate-800" style={{letterSpacing:'-0.03em'}}>
              &pound;{packs.filter(p => p.certification !== 'CompTIA' && p.is_active).reduce((s, p) => s + (Number(p.price_gbp) || 0), 0).toFixed(0)}
            </p>
            <p className="text-[10px] text-slate-400">total pack value</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-3 flex items-center gap-4 opacity-60">
          <div className="w-9 h-9 rounded-lg bg-[#e8f4fb] flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4" style={{color:'#0E5F8A'}} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-0.5">FortifyOne</p>
            <p className="text-sm text-slate-400">No products configured yet</p>
          </div>
        </div>
      </div>

      {/* ── FortifyLearn header ── */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#e0f2f9] border border-[#b3e0f0] rounded-lg">
          <BookOpen className="w-3.5 h-3.5" style={{color:'#0891B2'}} />
          <span className="text-xs font-bold uppercase tracking-wider" style={{color:'#0891B2'}}>FortifyLearn \u2014 PBQ Packs</span>
        </div>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      {/* ── Per-certification sections ── */}
      {CERT_SERIES.map(series => {
        const theme = CERT_THEME[series.cert] || CERT_THEME['CompTIA Security+'];
        return (
          <div key={series.cert}>
            {/* Cert header */}
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${theme.badge}`}>{series.code}</span>
              <p className="text-sm font-bold text-slate-700">{series.cert}</p>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* Pack columns */}
            <div className="grid gap-4" style={{gridTemplateColumns: `repeat(${series.packs.length}, 1fr)`}}>
              {series.packs.map(packDef => {
                const pack = packsByKey[packDef.key];
                const exists = !!pack;
                const packBanks = exists
                  ? (pack.bank_ids || []).map(id => banks.find(b => b.id === id)).filter(Boolean)
                    .sort((a, b) => ['taster','beginner','intermediate','advanced','expert'].indexOf(a.difficulty) - ['taster','beginner','intermediate','advanced','expert'].indexOf(b.difficulty))
                  : [];

                return (
                  <div key={packDef.key}
                    className={`rounded-xl border-2 overflow-hidden shadow-sm ${!exists ? 'border-dashed border-slate-200 bg-slate-50/60 opacity-60' : `border-l-4 ${theme.border}`}`}
                    style={exists ? {borderLeftColor: theme.accent} : {}}
                  >
                    {/* Pack header */}
                    <div className={`px-4 py-3 ${exists ? theme.bg : 'bg-slate-50'}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${exists ? theme.badge : 'bg-slate-200 text-slate-500'}`}>
                            {packDef.label}
                          </span>
                          {!exists && (
                            <span className="ml-2 text-[10px] font-semibold text-slate-400 italic">coming soon</span>
                          )}
                          {exists && (
                            <p className="font-bold text-slate-800 text-sm mt-1 leading-tight truncate max-w-[160px]">{pack.title}</p>
                          )}
                        </div>
                        {exists && (
                          <div className="text-right flex-shrink-0">
                            <p className="text-xl font-extrabold text-slate-800" style={{letterSpacing:'-0.03em'}}>&pound;{pack.price_gbp}</p>
                            <p className="text-[10px] text-slate-500">{packBanks.length} labs</p>
                          </div>
                        )}
                        {!exists && (
                          <p className="text-sm font-bold text-slate-300">\u2014</p>
                        )}
                      </div>
                    </div>

                    {/* Lab rows */}
                    {exists && (
                      <div className="divide-y divide-slate-50">
                        {packBanks.map(bank => {
                          const stats = attemptsByBank[bank.id];
                          const avgScore = stats?.scores.length
                            ? Math.round(stats.scores.reduce((a,b) => a+b, 0) / stats.scores.length)
                            : null;
                          return (
                            <div key={bank.id} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 transition-colors">
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${DIFF_COLOUR[bank.difficulty] || 'bg-slate-100 text-slate-500'}`}>
                                {DIFF_LABEL[bank.difficulty] || bank.difficulty}
                              </span>
                              <p className="text-xs text-slate-700 truncate flex-1">{bank.title}</p>
                              {stats ? (
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                  <span className="text-[9px] text-slate-400">{stats.count}x</span>
                                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${avgScore >= 70 ? 'bg-green-100 text-green-700' : avgScore >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                                    {avgScore}%
                                  </span>
                                </div>
                              ) : (
                                <span className="text-[9px] text-slate-300 flex-shrink-0">{bank.time_limit_minutes}m</span>
                              )}
                              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${bank.is_published ? 'bg-green-400' : 'bg-slate-300'}`} />
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Placeholder rows for coming soon */}
                    {!exists && (
                      <div className="px-4 py-6 text-center">
                        <p className="text-xs text-slate-400 font-medium">Not yet created</p>
                        <p className="text-[10px] text-slate-300 mt-1">Labs will appear here once added to Supabase</p>
                      </div>
                    )}

                    {/* Footer */}
                    {exists && (
                      <div className="px-3 py-2 bg-slate-50 border-t border-slate-100">
                        <p className="text-[9px] text-slate-400 font-mono truncate">{pack.stripe_price_id || 'no stripe id'}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* ── Bundle + Unassigned ── */}
      <div className="grid grid-cols-2 gap-4">
        {bundle && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-200 text-amber-800">BUNDLE</span>
                <p className="text-sm font-bold text-slate-800 truncate">{bundle.title}</p>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 font-mono">{bundle.stripe_price_id}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xl font-extrabold text-slate-800" style={{letterSpacing:'-0.03em'}}>&pound;{bundle.price_gbp}</p>
              <p className="text-[10px] text-slate-500">{(bundle.bank_ids||[]).length} labs \u00b7 all certs</p>
            </div>
          </div>
        )}
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <button onClick={() => setShowUnassigned(p => !p)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${unassigned.length > 0 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                {unassigned.length} unassigned
              </span>
              <p className="text-sm font-semibold text-slate-700">Unassigned banks</p>
            </div>
            <span className="text-slate-400 text-xs">{showUnassigned ? '\u25b2' : '\u25bc'}</span>
          </button>
          {showUnassigned && unassigned.length > 0 && (
            <div className="border-t border-slate-100 divide-y divide-slate-50 max-h-40 overflow-y-auto">
              {unassigned.map(bank => (
                <div key={bank.id} className="flex items-center gap-2 px-4 py-2">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${DIFF_COLOUR[bank.difficulty] || 'bg-slate-100 text-slate-500'}`}>
                    {DIFF_LABEL[bank.difficulty] || bank.difficulty}
                  </span>
                  <p className="text-xs text-slate-600 truncate flex-1">{bank.title}</p>
                  <span className="text-[10px] text-slate-400 flex-shrink-0">{bank.certification?.replace('CompTIA ', '')}</span>
                </div>
              ))}
            </div>
          )}
          {showUnassigned && unassigned.length === 0 && (
            <div className="px-4 py-3 border-t border-slate-100 text-xs text-green-600 font-semibold">All banks assigned \u2713</div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 text-[10px] text-slate-400 flex-wrap">
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400" />Published</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-300" />Draft</span>
        {['Easy','Inter.','Hard','Expert'].map((d,i) => (
          <span key={d} className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${['bg-green-100 text-green-700','bg-blue-100 text-blue-700','bg-amber-100 text-amber-700','bg-[#0B1D3A]/10 text-[#0B1D3A]'][i]}`}>{d}</span>
        ))}
        <span className="ml-auto">xN = attempt count \u00b7 % = avg score</span>
      </div>

      {/* ── FortifyOne section ── */}
      <div className="flex items-center gap-3 pt-2">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#e8f4fb] border border-[#b0d8ef] rounded-lg">
          <Shield className="w-3.5 h-3.5" style={{color:'#0E5F8A'}} />
          <span className="text-xs font-bold uppercase tracking-wider" style={{color:'#0E5F8A'}}>FortifyOne \u2014 Subscriptions</span>
        </div>
        <div className="flex-1 h-px bg-slate-100" />
      </div>
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-8 text-center">
        <Shield className="w-8 h-8 text-slate-300 mx-auto mb-3" />
        <p className="text-sm font-semibold text-slate-400 mb-1">No FortifyOne products configured yet</p>
        <p className="text-xs text-slate-400">FortifyOne subscription tiers will appear here once added to the platform.</p>
      </div>

    </div>
  );
};


// ─── Lab Analytics view ────────────────────────────────────────────────────────
const LabAnalyticsView = () => {
  const [stats, setStats]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ data: attempts }, { data: banks }] = await Promise.all([
        supabase.from('pbq_attempts').select('bank_id, score_percentage, time_taken_seconds, completed_at, user_id'),
        supabase.from('pbq_banks').select('id, title, certification, difficulty, time_limit_minutes'),
      ]);
      const bankMap = Object.fromEntries((banks || []).map(b => [b.id, b]));
      const byBank = {};
      for (const a of (attempts || [])) {
        if (!byBank[a.bank_id]) byBank[a.bank_id] = { attempts: 0, users: new Set(), scores: [], times: [] };
        byBank[a.bank_id].attempts++;
        byBank[a.bank_id].users.add(a.user_id);
        if (a.score_percentage != null) byBank[a.bank_id].scores.push(Number(a.score_percentage));
        if (a.time_taken_seconds != null) byBank[a.bank_id].times.push(a.time_taken_seconds);
      }
      const rows = Object.entries(byBank).map(([bankId, d]) => {
        const bank = bankMap[bankId] || {};
        const avg = d.scores.length ? Math.round(d.scores.reduce((a,b)=>a+b,0)/d.scores.length) : null;
        const passes = d.scores.filter(s => s >= 70).length;
        const avgTime = d.times.length ? Math.round(d.times.reduce((a,b)=>a+b,0)/d.times.length / 60) : null;
        return { bankId, title: bank.title, cert: bank.certification, difficulty: bank.difficulty, attempts: d.attempts, users: d.users.size, avg, passes, passRate: d.scores.length ? Math.round(passes/d.scores.length*100) : null, avgTime };
      }).sort((a,b) => b.attempts - a.attempts);
      setStats(rows);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderColor:'#0891B2'}} /></div>;

  const totalAttempts = stats.reduce((s,r) => s+r.attempts, 0);
  const overallAvg = stats.flatMap(r => r.avg != null ? [r.avg] : []);
  const overallAvgScore = overallAvg.length ? Math.round(overallAvg.reduce((a,b)=>a+b,0)/overallAvg.length) : null;

  const DIFF_COLOUR = { taster:'bg-slate-100 text-slate-500', beginner:'bg-green-100 text-green-700', intermediate:'bg-blue-100 text-blue-700', advanced:'bg-amber-100 text-amber-700', expert:'bg-[#0B1D3A]/10 text-[#0B1D3A]' };
  const DIFF_LABEL  = { taster:'Taster', beginner:'Easy', intermediate:'Inter.', advanced:'Hard', expert:'Expert' };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total attempts', value: totalAttempts, icon: TrendingUp, color: 'text-[#0891B2]', bg: 'bg-[#e0f2f9]' },
          { label: 'Avg score', value: overallAvgScore != null ? `${overallAvgScore}%` : '—', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Labs attempted', value: stats.length, icon: Layers, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="border border-gray-200 shadow-sm">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-3xl font-extrabold text-slate-800" style={{letterSpacing:'-0.03em'}}>{value}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Per-lab table */}
      <Card className="border border-gray-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-gray-100 py-3 px-5">
          <CardTitle className="text-sm font-bold text-slate-700">Per-lab performance</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Lab','Cert','Difficulty','Attempts','Avg score','Pass rate','Avg time'].map(h => (
                  <th key={h} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3 text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.map((row, i) => (
                <tr key={row.bankId} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-2.5">
                    <p className="font-medium text-slate-800 text-xs leading-snug max-w-[240px] truncate">{row.title || row.bankId}</p>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-[10px] text-slate-500 whitespace-nowrap">{row.cert?.replace('CompTIA ', '') || '—'}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${DIFF_COLOUR[row.difficulty] || 'bg-slate-100 text-slate-500'}`}>
                      {DIFF_LABEL[row.difficulty] || row.difficulty || '—'}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-sm font-bold text-slate-700">{row.attempts}</span>
                    {row.users > 1 && <span className="text-[10px] text-slate-400 ml-1">({row.users} users)</span>}
                  </td>
                  <td className="px-4 py-2.5">
                    {row.avg != null ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden flex-shrink-0">
                          <div className="h-full rounded-full" style={{width:`${row.avg}%`, background: row.avg >= 70 ? '#10b981' : row.avg >= 50 ? '#f59e0b' : '#cbd5e1'}} />
                        </div>
                        <span className={`text-xs font-bold ${row.avg >= 70 ? 'text-green-600' : row.avg >= 50 ? 'text-amber-600' : 'text-slate-500'}`}>{row.avg}%</span>
                      </div>
                    ) : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="px-4 py-2.5">
                    {row.passRate != null ? (
                      <span className={`text-xs font-bold ${row.passRate >= 70 ? 'text-green-600' : row.passRate >= 30 ? 'text-amber-600' : 'text-slate-400'}`}>
                        {row.passRate}%
                      </span>
                    ) : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-xs text-slate-500">{row.avgTime != null ? `${row.avgTime}m` : '—'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <p className="text-[10px] text-slate-400">Pass threshold: 70%. Avg time calculated from attempts where time was recorded.</p>
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


// ─── FortifyLearn Learner Activity view ───────────────────────────────────────
const FL_ADMIN_SECRET   = 'fl-admin-3338c175a9b3ad2f45ac3326';
const FL_ADMIN_ENDPOINT = 'https://kmnbtnfgeadvvkwsdyml.supabase.co/functions/v1/admin-stats';

const REVIEW_CONFIG = {
  ask:  { label: '\u2605 Ask for review', classes: 'bg-green-100 text-green-700' },
  warm: { label: 'Warming up',          classes: 'bg-amber-100 text-amber-700' },
  cold: { label: 'Inactive',            classes: 'bg-slate-100 text-slate-500' },
};

const FortifyLearnActivityView = () => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [expanded, setExpanded] = useState({});

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res  = await fetch(FL_ADMIN_ENDPOINT, { headers: { 'x-admin-secret': FL_ADMIN_SECRET } });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || res.status);
      setData(json);
    } catch (e) { setError(e.message); }
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const toggle = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const fmtDate = (iso) => {
    if (!iso) return 'never';
    const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
    if (d === 0) return 'today'; if (d === 1) return 'yesterday';
    if (d < 7) return d + 'd ago'; if (d < 30) return Math.floor(d / 7) + 'w ago';
    return Math.floor(d / 30) + 'mo ago';
  };
  const fmtShort = (iso) => iso ? new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '';
  const fmtTime  = (s) => { if (!s) return '\u2014'; const m = Math.floor(s / 60); return m < 60 ? m + 'm' : Math.floor(m / 60) + 'h ' + (m % 60) + 'm'; };
  const initials = (n) => (n || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const avBg     = (e) => ['bg-cyan-100 text-cyan-700', 'bg-blue-100 text-blue-700', 'bg-emerald-100 text-emerald-700'][(e?.charCodeAt(0) || 0) % 3];

  const DIFF_PILL  = { taster: 'bg-slate-100 text-slate-500', beginner: 'bg-green-100 text-green-700', intermediate: 'bg-blue-100 text-blue-700', hard: 'bg-amber-100 text-amber-700', expert: 'bg-[#0B1D3A]/10 text-[#0B1D3A]' };
  const DIFF_LABEL = { taster: 'Taster', beginner: 'Easy', intermediate: 'Inter.', hard: 'Hard', expert: 'Expert' };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderColor:'#0891B2'}} /></div>;
  if (error)   return <div className="p-8 text-red-600 text-sm">Error loading data: {error}</div>;
  if (!data)   return null;

  const { summary, users } = data;
  const summaryStats = [
    { label: 'Learners',         value: summary.total_users,       icon: Users,        color: 'text-blue-600',   bgColor: 'bg-blue-50'   },
    { label: 'Lab completions',  value: summary.total_completions, icon: CheckCircle2, color: 'text-green-600',  bgColor: 'bg-green-50'  },
    { label: 'Active this week', value: summary.active_this_week,  icon: TrendingUp,   color: 'text-amber-600',  bgColor: 'bg-amber-50'  },
    { label: 'Ready to ask',     value: summary.ready_for_review,  icon: Lightbulb,    color: 'text-purple-600', bgColor: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400">
          Updated {data.generated_at ? new Date(data.generated_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '\u2014'}
        </p>
        <button onClick={load}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 border border-gray-200 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 transition-colors">
          Refresh
        </button>
      </div>

      <StatRow stats={summaryStats} />

      <div className="space-y-2">
        {users.map((u) => {
          const rc   = REVIEW_CONFIG[u.review_signal] || REVIEW_CONFIG.cold;
          const open = expanded[u.id];
          return (
            <Card key={u.id} className="border border-gray-200 shadow-sm overflow-hidden">
              <button onClick={() => toggle(u.id)}
                className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50/70 transition-colors text-left">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${avBg(u.email)}`}>
                  {initials(u.full_name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-slate-800 truncate">{u.full_name || u.email}</p>
                  <p className="text-xs text-slate-400 truncate">{u.email}</p>
                </div>
                <div className="flex items-center gap-5 flex-shrink-0">
                  <div className="text-center hidden sm:block">
                    <p className="text-base font-extrabold text-slate-800" style={{letterSpacing:'-0.02em'}}>{u.completions}</p>
                    <p className="text-[10px] text-slate-400">labs done</p>
                  </div>
                  <div className="text-center hidden sm:block">
                    <p className="text-base font-extrabold text-slate-800" style={{letterSpacing:'-0.02em'}}>
                      {u.avg_score_pct != null ? `${u.avg_score_pct}%` : '\u2014'}
                    </p>
                    <p className="text-[10px] text-slate-400">avg score</p>
                  </div>
                  <div className="text-center hidden md:block">
                    <p className="text-sm font-semibold text-slate-600">{fmtDate(u.last_activity)}</p>
                    <p className="text-[10px] text-slate-400">last active</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${rc.classes}`}>
                    {rc.label}
                  </span>
                  <span className={`text-slate-400 text-xs inline-block transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
                </div>
              </button>

              {open && (
                <div className="border-t border-gray-100 px-5 py-4">
                  {u.entitlements && u.entitlements.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {u.entitlements.map(e => (
                        <span key={e} className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                          style={{background:'rgba(8,145,178,0.1)', color:'#0891B2'}}>
                          {e.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 mb-4">No paid entitlements</p>
                  )}

                  {u.recent_labs && u.recent_labs.length > 0 ? (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                          {['Lab', 'Level', 'Score', 'Time', 'Date'].map(h => (
                            <th key={h} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2 text-left whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {u.recent_labs.map((lab, i) => {
                          const pct = Math.round(lab.score_pct || 0);
                          const bc  = pct >= 80 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#cbd5e1';
                          return (
                            <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                              <td className="px-3 py-2 text-xs text-slate-700 max-w-[240px] truncate">{lab.bank_title}</td>
                              <td className="px-3 py-2">
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${DIFF_PILL[lab.difficulty] || 'bg-slate-100 text-slate-500'}`}>
                                  {DIFF_LABEL[lab.difficulty] || lab.difficulty}
                                </span>
                              </td>
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden flex-shrink-0">
                                    <div className="h-full rounded-full" style={{width: pct + '%', background: bc}} />
                                  </div>
                                  <span className="text-xs font-bold" style={{color: bc}}>{pct}%</span>
                                </div>
                              </td>
                              <td className="px-3 py-2 text-xs text-slate-500">{fmtTime(lab.time_seconds)}</td>
                              <td className="px-3 py-2 text-xs text-slate-400">{fmtShort(lab.completed_at)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-xs text-slate-400">No completions yet.</p>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <p className="text-[10px] text-slate-400">
        \u2605 Ask for review = 3+ completions, active \u22647 days, avg \u226560%. Warming up = active \u226414 days.
      </p>
    </div>
  );
};

// ─── Nav ───────────────────────────────────────────────────────────────────────

const PACK_LABELS = {
  netplus_pack:     'Network+ PBQ Pack 1',
  netplus_pack_2:   'Network+ PBQ Pack 2',
  netplus_complete: 'Network+ Complete',
  secplus_pack:     'Security+ PBQ Pack 1',
  secplus_pack_2:   'Security+ PBQ Pack 2',
  secplus_complete: 'Security+ Complete',
  cysa_pack:        'CySA+ PBQ Pack 1',
  cysa_pack_2:      'CySA+ PBQ Pack 2',
  cysa_complete:    'CySA+ Complete',
  // Legacy — retained for backwards display of any pre-deprecation bundle purchases
  bundle:           'All Access Bundle (legacy)',
};

function formatPacks(keys) {
  if (!keys || !keys.length) return '—';
  if (keys.includes('bundle')) return 'All Access Bundle';
  return keys.filter(k => k !== 'bundle').map(k => PACK_LABELS[k] || k).join(', ');
}

const PurchasesView = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    supabase.rpc('get_purchase_history').then(({ data, error }) => {
      if (!error) setPurchases(data || []);
      setLoading(false);
    });
  }, []);

  const totalRevenue = purchases.reduce((s, p) => s + Number(p.amount_paid_gbp || 0), 0);

  if (loading) return <div className="p-8 text-slate-400 text-sm">Loading purchases…</div>;

  if (!purchases.length) return (
    <div className="p-16 text-center">
      <ShoppingBag className="w-12 h-12 text-slate-200 mx-auto mb-3" />
      <p className="text-slate-400 text-sm">No purchases yet</p>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 max-w-md">
        <Card>
          <CardContent className="pt-5 pb-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Revenue</p>
            <p className="text-3xl font-extrabold" style={{ color: '#0891B2' }}>£{totalRevenue.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Orders</p>
            <p className="text-3xl font-extrabold text-slate-800">{purchases.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Purchases table */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-sm font-bold text-slate-700">Purchase History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Date','Customer','Pack(s)','Amount'].map(h => (
                  <th key={h} className={`text-xs font-bold text-slate-400 uppercase tracking-wider px-5 py-3 ${h === 'Amount' ? 'text-right' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {purchases.map((p, i) => (
                <tr key={p.stripe_session_id || i} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3 text-slate-500 text-xs whitespace-nowrap">
                    {p.purchased_at ? new Date(p.purchased_at).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }) : '—'}
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-medium text-slate-800">{p.customer_email || '—'}</p>
                    {p.customer_name && <p className="text-xs text-slate-400 mt-0.5">{p.customer_name}</p>}
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(8,145,178,0.1)', color: '#0891B2' }}>
                      {formatPacks(p.product_keys)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-bold text-slate-800">
                    {p.amount_paid_gbp ? `£${Number(p.amount_paid_gbp).toFixed(2)}` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

// ─── MCQ Red Team Reports view ────────────────────────────────────────────────
const SUPABASE_FN_BASE = 'https://kmnbtnfgeadvvkwsdyml.supabase.co/functions/v1';
const STATUS_PILL = { pass: 'bg-green-100 text-green-700', warn: 'bg-amber-100 text-amber-700', fail: 'bg-red-100 text-red-700', error: 'bg-slate-100 text-slate-500', pending: 'bg-blue-100 text-blue-700' };
const OPT_LETTERS = ['A','B','C','D'];

const MCQRedTeamView = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [rerunning, setRerunning] = useState({});
  const [showArchived, setShowArchived] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    let q = supabase.from('mcq_red_team_reports').select('*').order('triggered_at', { ascending: false }).limit(100);
    if (!showArchived) q = q.eq('is_archived', false);
    const { data } = await q;
    setReports(data || []);
    setLoading(false);
  }, [showArchived]);
  useEffect(() => { load(); }, [load]);

  const toggle = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const rerun = async (r) => {
    if (!window.confirm(`Re-run Red Team audit for "${r.question_title || r.question_id}"?`)) return;
    setRerunning(p => ({ ...p, [r.id]: true }));
    try {
      await supabase.from('mcq_red_team_reports').update({ is_archived: true }).eq('question_id', r.question_id).eq('is_archived', false);
      await fetch(`${SUPABASE_FN_BASE}/mcq-red-team-agent`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: r.question_id, bank_id: r.bank_id })
      });
      setTimeout(load, 8000);
    } catch (e) { alert('Re-run failed: ' + e.message); }
    setRerunning(p => ({ ...p, [r.id]: false }));
  };

  const fmtTime = (iso) => iso ? new Date(iso).toLocaleString('en-GB', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' }) : '';

  const archiveReport = async (r) => {
    if (!window.confirm(`Archive this report?`)) return;
    await supabase.from('mcq_red_team_reports').update({ is_archived: true }).eq('id', r.id);
    load();
  };

  const unarchiveReport = async (r) => {
    await supabase.from('mcq_red_team_reports').update({ is_archived: false }).eq('id', r.id);
    load();
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderColor:'#0891B2'}} /></div>;

  const counts = { pass:0, warn:0, fail:0, error:0, pending:0 };
  reports.forEach(r => { counts[r.status] = (counts[r.status]||0)+1; });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 text-xs font-semibold">
          <span className="px-2 py-1 rounded bg-green-50 text-green-700">{counts.pass} Pass</span>
          <span className="px-2 py-1 rounded bg-amber-50 text-amber-700">{counts.warn} Warn</span>
          <span className="px-2 py-1 rounded bg-red-50 text-red-700">{counts.fail} Fail</span>
          <span className="px-2 py-1 rounded bg-slate-50 text-slate-500">{counts.error+counts.pending} Other</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowArchived(p => !p)} className={`flex items-center gap-1.5 text-xs font-semibold border px-3 py-1.5 rounded-lg transition-colors ${showArchived ? 'bg-slate-800 text-white border-slate-800 hover:bg-slate-700' : 'text-slate-500 border-gray-200 bg-white hover:bg-slate-50'}`}>{showArchived ? 'Hide Archived' : 'Show Archived'}</button>
          <button onClick={load} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 border border-gray-200 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50">Refresh</button>
        </div>
      </div>

      {reports.length === 0 && <p className="text-sm text-slate-400 text-center py-12">No MCQ Red Team reports yet.</p>}

      <div className="space-y-2">
        {reports.map(r => {
          const open = expanded[r.id];
          const opts = r.options_snapshot || {};
          const findings = Array.isArray(r.findings) ? r.findings : [];
          return (
            <Card key={r.id} className={`border border-gray-200 shadow-sm overflow-hidden ${r.is_archived ? 'opacity-50' : ''}`}>
              <div onClick={() => toggle(r.id)} className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50/70 transition-colors text-left cursor-pointer select-none">
                <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded ${STATUS_PILL[r.status]||STATUS_PILL.pending}`}>{r.status}</span>
                <span className="text-xs font-bold text-slate-600 tabular-nums w-8">{r.score ?? '—'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{r.question_title || r.question_id}</p>
                  <p className="text-[11px] text-slate-400">{r.certification} · {r.difficulty} · {fmtTime(r.triggered_at)}{r.is_archived ? ' · Archived' : ''}</p>
                </div>
              </div>

              {open && (
                <div className="px-5 pb-4 space-y-3 border-t border-gray-100 pt-3">
                  <div className="flex items-center justify-between">
                    {r.summary ? <p className="text-sm text-slate-700 font-medium flex-1">{r.summary}</p> : <div />}
                    <div className="flex gap-2 flex-shrink-0 ml-3">
                      {r.is_archived
                        ? <button onClick={() => unarchiveReport(r)} className="px-4 py-1.5 text-xs font-bold text-slate-600 rounded-lg border border-gray-200 bg-white hover:bg-slate-50 transition-colors">Unarchive</button>
                        : <button onClick={() => archiveReport(r)} className="px-4 py-1.5 text-xs font-bold text-slate-600 rounded-lg border border-gray-200 bg-white hover:bg-slate-50 transition-colors">Archive</button>
                      }
                      <button onClick={() => rerun(r)} disabled={rerunning[r.id]}
                        className="px-4 py-1.5 text-xs font-bold text-white rounded-lg bg-[#0891B2] hover:bg-[#0E7490] disabled:opacity-50 transition-colors">
                        {rerunning[r.id] ? 'Running...' : 'Re-run Audit'}
                      </button>
                    </div>
                  </div>

                  {r.question_text_snapshot && (
                    <div className="rounded-lg bg-slate-50 p-3 space-y-2">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Question</p>
                      <p className="text-sm text-slate-800">{r.question_text_snapshot}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-2">
                        {OPT_LETTERS.map(letter => (
                          <div key={letter} className={`text-xs px-2.5 py-1.5 rounded border ${r.correct_snapshot === letter ? 'bg-green-50 border-green-300 font-bold text-green-800' : 'bg-white border-gray-200 text-slate-600'}`}>
                            <span className="font-bold mr-1.5">{letter})</span>{opts[letter] || '—'}
                          </div>
                        ))}
                      </div>
                      {r.reasoning_snapshot && (
                        <div className="mt-2">
                          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Explanation</p>
                          <p className="text-xs text-slate-600 leading-relaxed">{r.reasoning_snapshot}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {r.agent_answer && (
                    <div className="rounded-lg bg-blue-50/60 p-3">
                      <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">Agent Answer: <span className="text-blue-800">{Array.isArray(r.agent_answer) ? r.agent_answer.join(', ') : r.agent_answer}</span> {r.correct_snapshot && r.agent_answer !== r.correct_snapshot && <span className="text-red-600 ml-1">(disagrees with key: {r.correct_snapshot})</span>}</p>
                      {r.agent_reasoning && <p className="text-xs text-blue-700 leading-relaxed">{r.agent_reasoning}</p>}
                    </div>
                  )}

                  {findings.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Findings ({findings.length})</p>
                      {findings.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <span className={`px-1.5 py-0.5 rounded font-bold uppercase text-[10px] flex-shrink-0 ${f.severity === 'critical' ? 'bg-red-100 text-red-700' : f.severity === 'major' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>{f.severity}</span>
                          <div><span className="font-semibold text-slate-700">[{f.category}]</span> {f.finding}{f.recommendation && <span className="text-slate-400"> — {f.recommendation}</span>}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {r.narrative && (
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Narrative</p>
                      <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">{r.narrative}</p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// ─── PBQ Red Team Reports view ────────────────────────────────────────────────
const PBQRedTeamView = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [rerunning, setRerunning] = useState({});
  const [showArchived, setShowArchived] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    let q = supabase.from('red_team_reports').select('*').order('triggered_at', { ascending: false }).limit(100);
    if (!showArchived) q = q.eq('is_archived', false);
    const { data } = await q;
    setReports(data || []);
    setLoading(false);
  }, [showArchived]);
  useEffect(() => { load(); }, [load]);

  const toggle = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const rerun = async (r) => {
    if (!window.confirm(`Re-run Red Team audit for "${r.question_title || r.question_id}"?`)) return;
    setRerunning(p => ({ ...p, [r.id]: true }));
    try {
      await supabase.from('red_team_reports').update({ is_archived: true }).eq('question_id', r.question_id).eq('is_archived', false);
      const { data: q } = await supabase.from('pbq_questions').select('*').eq('id', r.question_id).single();
      if (!q) { alert('Question not found'); setRerunning(p => ({ ...p, [r.id]: false })); return; }
      await fetch(`${SUPABASE_FN_BASE}/red-team-agent`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(q)
      });
      setTimeout(load, 8000);
    } catch (e) { alert('Re-run failed: ' + e.message); }
    setRerunning(p => ({ ...p, [r.id]: false }));
  };

  const fmtTime = (iso) => iso ? new Date(iso).toLocaleString('en-GB', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' }) : '';

  const archiveReport = async (r) => {
    if (!window.confirm(`Archive this report?`)) return;
    await supabase.from('red_team_reports').update({ is_archived: true }).eq('id', r.id);
    load();
  };

  const unarchiveReport = async (r) => {
    await supabase.from('red_team_reports').update({ is_archived: false }).eq('id', r.id);
    load();
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderColor:'#0891B2'}} /></div>;

  const counts = { pass:0, warn:0, fail:0, error:0, pending:0 };
  reports.forEach(r => { counts[r.status] = (counts[r.status]||0)+1; });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 text-xs font-semibold">
          <span className="px-2 py-1 rounded bg-green-50 text-green-700">{counts.pass} Pass</span>
          <span className="px-2 py-1 rounded bg-amber-50 text-amber-700">{counts.warn} Warn</span>
          <span className="px-2 py-1 rounded bg-red-50 text-red-700">{counts.fail} Fail</span>
          <span className="px-2 py-1 rounded bg-slate-50 text-slate-500">{counts.error+counts.pending} Other</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowArchived(p => !p)} className={`flex items-center gap-1.5 text-xs font-semibold border px-3 py-1.5 rounded-lg transition-colors ${showArchived ? 'bg-slate-800 text-white border-slate-800 hover:bg-slate-700' : 'text-slate-500 border-gray-200 bg-white hover:bg-slate-50'}`}>{showArchived ? 'Hide Archived' : 'Show Archived'}</button>
          <button onClick={load} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 border border-gray-200 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50">Refresh</button>
        </div>
      </div>

      {reports.length === 0 && <p className="text-sm text-slate-400 text-center py-12">No PBQ Red Team reports yet.</p>}

      <div className="space-y-2">
        {reports.map(r => {
          const open = expanded[r.id];
          const findings = Array.isArray(r.findings) ? r.findings : [];
          return (
            <Card key={r.id} className={`border border-gray-200 shadow-sm overflow-hidden ${r.is_archived ? 'opacity-50' : ''}`}>
              <div onClick={() => toggle(r.id)} className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50/70 transition-colors text-left cursor-pointer select-none">
                <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded ${STATUS_PILL[r.status]||STATUS_PILL.pending}`}>{r.status}</span>
                <span className="text-xs font-bold text-slate-600 tabular-nums w-8">{r.score ?? '—'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{r.question_title || r.question_id}</p>
                  <p className="text-[11px] text-slate-400">{r.certification} · {r.difficulty} · {fmtTime(r.triggered_at)}{r.is_archived ? ' · Archived' : ''}</p>
                </div>
              </div>

              {open && (
                <div className="px-5 pb-4 space-y-3 border-t border-gray-100 pt-3">
                  <div className="flex items-center justify-between">
                    {r.summary ? <p className="text-sm text-slate-700 font-medium flex-1">{r.summary}</p> : <div />}
                    <div className="flex gap-2 flex-shrink-0 ml-3">
                      {r.is_archived
                        ? <button onClick={() => unarchiveReport(r)} className="px-4 py-1.5 text-xs font-bold text-slate-600 rounded-lg border border-gray-200 bg-white hover:bg-slate-50 transition-colors">Unarchive</button>
                        : <button onClick={() => archiveReport(r)} className="px-4 py-1.5 text-xs font-bold text-slate-600 rounded-lg border border-gray-200 bg-white hover:bg-slate-50 transition-colors">Archive</button>
                      }
                      <button onClick={() => rerun(r)} disabled={rerunning[r.id]}
                        className="px-4 py-1.5 text-xs font-bold text-white rounded-lg bg-[#0891B2] hover:bg-[#0E7490] disabled:opacity-50 transition-colors">
                        {rerunning[r.id] ? 'Running...' : 'Re-run Audit'}
                      </button>
                    </div>
                  </div>

                  {findings.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Findings ({findings.length})</p>
                      {findings.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <span className={`px-1.5 py-0.5 rounded font-bold uppercase text-[10px] flex-shrink-0 ${f.severity === 'critical' ? 'bg-red-100 text-red-700' : f.severity === 'major' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>{f.severity}</span>
                          <div><span className="font-semibold text-slate-700">[{f.category}]</span> {f.finding}{f.recommendation && <span className="text-slate-400"> — {f.recommendation}</span>}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {r.narrative && (
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Narrative</p>
                      <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">{r.narrative}</p>
                    </div>
                  )}

                  {r.recommended_next && (
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Recommended Next</p>
                      <p className="text-xs text-slate-600">{r.recommended_next}</p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const NAV = [
  { id: 'dashboard', label: 'Dashboard',        icon: LayoutDashboard },
  { id: 'leads',     label: 'CRM Leads',         icon: Users },
  { id: 'contacts',  label: 'Contact Forms',      icon: Mail },
  { id: 'issues',    label: 'Issues',             icon: Bug },
  { id: 'features',  label: 'Feature Requests',   icon: Lightbulb },
  { id: 'pricing',   label: 'Pricing',            icon: Tag },
  { id: 'analytics', label: 'Lab Analytics',      icon: TrendingUp },
  { id: 'config',    label: 'Platform Config',    icon: Settings2 },
  { id: 'purchases',   label: 'Purchases',        icon: ShoppingBag },
  { id: 'fl_activity', label: 'FL Learners',       icon: BookOpen },
  { id: 'mcq_redteam', label: 'MCQ Red Team',     icon: Activity },
  { id: 'pbq_redteam', label: 'PBQ Red Team',     icon: Shield },
];

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  leads:     'CRM Leads',
  contacts:  'Contact Forms',
  issues:    'Bug Reports & Issues',
  features:  'Feature Requests',
  pricing:   'Pricing Overview',
  config:    'Platform Configuration',
  analytics: 'Lab Analytics',
  purchases:   'FortifyLearn Purchases',
  fl_activity: 'FortifyLearn Learner Activity',
  mcq_redteam: 'MCQ Red Team Reports',
  pbq_redteam: 'PBQ Red Team Reports',
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
      case 'analytics': return <LabAnalyticsView />;
      case 'purchases':   return <PurchasesView />;
      case 'fl_activity': return <FortifyLearnActivityView />;
      case 'mcq_redteam': return <MCQRedTeamView />;
      case 'pbq_redteam': return <PBQRedTeamView />;
      default:          return <DashboardView setView={setView} />;
    }
  };

  return (
    <div className="flex min-h-screen font-sans" style={{background:'#F4F7FA'}}>
      <div className={`${sidebarOpen ? 'w-56' : 'w-16'} flex-shrink-0 flex flex-col transition-all duration-200`} style={{background:'#0B1D3A',borderRight:'1px solid rgba(255,255,255,0.07)'}}>
        <div className={`flex items-center gap-3 px-4 py-5 ${sidebarOpen ? 'justify-between' : 'justify-center'}`} style={{borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
          {sidebarOpen && (
            <div className="flex items-center gap-2.5">
              <img src="/logos/cysec-favicon.svg" alt="Cy-Sec" style={{width:32,height:32,borderRadius:8,flexShrink:0}} />
              <div>
                <p className="text-[15px] font-extrabold text-slate-800 leading-tight" style={{ letterSpacing: '-0.03em' }}>Cy-Sec</p>
                <p className="text-[10px] font-bold uppercase tracking-widest leading-tight" style={{ color: '#0891B2' }}>Admin</p>
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
                    ? 'font-semibold border-l-2 border-[#0891B2] bg-white/10 text-white'
                    : 'text-white/55 hover:bg-white/[0.07] hover:text-white border-l-2 border-transparent'
                  }`}>
                <item.icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-[#7DD3E8]' : ''}`} />
                {sidebarOpen && <span className="text-sm whitespace-nowrap">{item.label}</span>}
              </button>
            );
          })}
        </nav>
        {sidebarOpen && (
          <div className="px-4 py-3" style={{borderTop:'1px solid rgba(255,255,255,0.07)'}}>
            <p className="text-xs font-semibold text-white">Gary Cocklin</p>
            <p className="text-[10px] leading-relaxed mt-0.5" style={{color:'rgba(255,255,255,0.35)'}}>CISSP-ISSAP · CISM · CRISC</p>
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
          <a href="/" className="flex items-center gap-1.5 text-sm font-medium text-slate-500 border border-gray-200 px-3 py-1.5 rounded-lg bg-white transition-all">
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
