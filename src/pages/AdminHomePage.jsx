import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

// ─── Light theme tokens ────────────────────────────────────────────────────────
const c = {
  bg: '#f1f5f9',
  bgCard: '#ffffff',
  bgHover: '#f8fafc',
  bgSubtle: '#f8fafc',
  border: '#e2e8f0',
  borderAccent: '#1a6fc4',
  blue: '#1a6fc4',
  blueLight: '#eff6ff',
  cyan: '#0ea5e9',
  cyanLight: '#f0f9ff',
  textPrimary: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
  success: '#10B981',
  successLight: '#f0fdf4',
  warning: '#F59E0B',
  warningLight: '#fffbeb',
  error: '#EF4444',
  errorLight: '#fef2f2',
  purple: '#8B5CF6',
  purpleLight: '#f5f3ff',
};

const LEAD_STAGES     = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];
const CONTACT_STATUSES = ['new', 'in_progress', 'resolved', 'archived'];
const FEEDBACK_STATUSES = ['new', 'reviewing', 'in_progress', 'done', 'wont_fix'];

const stageStyle = (stage) => ({
  new:         { bg: c.cyanLight,    border: c.cyan,    text: '#0284c7' },
  contacted:   { bg: c.warningLight, border: c.warning, text: '#b45309' },
  qualified:   { bg: c.purpleLight,  border: c.purple,  text: '#6d28d9' },
  proposal:    { bg: c.blueLight,    border: c.blue,    text: '#1d4ed8' },
  won:         { bg: c.successLight, border: c.success, text: '#047857' },
  lost:        { bg: c.errorLight,   border: c.error,   text: '#b91c1c' },
  in_progress: { bg: c.warningLight, border: c.warning, text: '#b45309' },
  resolved:    { bg: c.successLight, border: c.success, text: '#047857' },
  archived:    { bg: '#f1f5f9',      border: '#cbd5e1', text: '#64748b' },
  reviewing:   { bg: c.purpleLight,  border: c.purple,  text: '#6d28d9' },
  done:        { bg: c.successLight, border: c.success, text: '#047857' },
  wont_fix:    { bg: c.errorLight,   border: c.error,   text: '#b91c1c' },
}[stage] || { bg: '#f1f5f9', border: '#cbd5e1', text: '#64748b' });

// ─── Small components ──────────────────────────────────────────────────────────
const Badge = ({ label, stage }) => {
  const s = stageStyle(stage || label?.toLowerCase());
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 10px', borderRadius: 99,
      background: s.bg, border: `1px solid ${s.border}`,
      color: s.text, fontSize: 11, fontWeight: 700,
      letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.border }} />
      {label}
    </span>
  );
};

const StatCard = ({ icon, label, value, sub, accent }) => (
  <div style={{
    background: c.bgCard, border: `1px solid ${c.border}`,
    borderRadius: 12, padding: '20px 24px',
    borderTop: `3px solid ${accent || c.blue}`,
    display: 'flex', flexDirection: 'column', gap: 4,
    boxShadow: '0 1px 4px rgba(15,23,42,0.05)',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</span>
      <div style={{ width: 34, height: 34, borderRadius: 8, background: `${accent || c.blue}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{icon}</div>
    </div>
    <div style={{ fontSize: 32, fontWeight: 800, color: c.textPrimary, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{value}</div>
    {sub && <div style={{ fontSize: 12, color: c.textMuted, marginTop: 2 }}>{sub}</div>}
  </div>
);

const Pill = ({ children, active, onClick }) => (
  <button onClick={onClick} style={{
    padding: '5px 14px', borderRadius: 99, cursor: 'pointer', fontFamily: 'inherit',
    fontSize: 12, fontWeight: 600, transition: 'all 0.15s',
    background: active ? c.blue : 'transparent',
    color: active ? '#fff' : c.textSecondary,
    border: active ? `1px solid ${c.blue}` : '1px solid transparent',
  }}>{children}</button>
);

const Input = ({ value, onChange, placeholder, style }) => (
  <input
    value={value} onChange={onChange} placeholder={placeholder}
    style={{
      background: c.bgSubtle, border: `1.5px solid ${c.border}`,
      borderRadius: 8, color: c.textPrimary, fontFamily: 'inherit',
      fontSize: 13, padding: '8px 12px', outline: 'none',
      transition: 'border-color 0.2s', ...style,
    }}
    onFocus={e => e.target.style.borderColor = c.blue}
    onBlur={e => e.target.style.borderColor = c.border}
  />
);

const Select = ({ value, onChange, options, style }) => (
  <select value={value} onChange={onChange} style={{
    background: c.bgSubtle, border: `1.5px solid ${c.border}`,
    borderRadius: 8, color: c.textPrimary, fontFamily: 'inherit',
    fontSize: 13, padding: '8px 12px', outline: 'none', cursor: 'pointer', ...style,
  }}>
    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

// ─── Detail Drawer ─────────────────────────────────────────────────────────────
const DetailDrawer = ({ item, type, onClose, onUpdate }) => {
  const [note, setNote] = useState('');
  const [stage, setStage] = useState(item?.stage || item?.status || 'new');
  const [saving, setSaving] = useState(false);

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
    await supabase.from(table).update(updates).eq('id', item.id);
    setSaving(false); setNote(''); onUpdate(item.id, updates);
  };

  const formatDate = (d) => d ? new Date(d).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : '—';
  const Field = ({ label, value }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
      <span style={{ fontSize: 13, color: c.textPrimary }}>{value || '—'}</span>
    </div>
  );

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ flex: 1, background: 'rgba(15,23,42,0.35)' }} />
      <div style={{
        width: 480, background: c.bgCard, borderLeft: `1px solid ${c.border}`,
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        boxShadow: '-8px 0 40px rgba(15,23,42,0.12)',
      }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: c.textPrimary }}>{item.name || item.user_email || 'Unknown'}</div>
            <div style={{ fontSize: 12, color: c.textMuted, marginTop: 2 }}>{formatDate(item.created_at)}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: c.textMuted, cursor: 'pointer', fontSize: 18, padding: 4 }}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: 16, background: c.bgSubtle, borderRadius: 8, border: `1px solid ${c.border}` }}>
            {item.email && <Field label="Email" value={item.email} />}
            {item.company && <Field label="Company" value={item.company} />}
            {item.phone && <Field label="Phone" value={item.phone} />}
            {item.source && <Field label="Source" value={item.source} />}
            {item.interest && <Field label="Interest" value={Array.isArray(item.interest) ? item.interest.join(', ') : item.interest} />}
            {item.deal_value && <Field label="Deal Value" value={`£${Number(item.deal_value).toLocaleString()}`} />}
            {item.page_url && <Field label="Page" value={item.page_url} />}
            {item.browser && <Field label="Browser" value={item.browser} />}
          </div>
          {item.message && (
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Message</div>
              <div style={{ fontSize: 13, color: c.textSecondary, lineHeight: 1.6, padding: '12px 16px', background: c.bgSubtle, borderRadius: 8, borderLeft: `3px solid ${c.borderAccent}` }}>
                {item.message}
              </div>
            </div>
          )}
          {(item.notes || (Array.isArray(item.admin_notes) && item.admin_notes.length > 0)) && (
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Notes</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {type === 'lead' && item.notes && item.notes.split('\n').filter(Boolean).map((n, i) => (
                  <div key={i} style={{ fontSize: 12, color: c.textSecondary, padding: '8px 12px', background: c.bgSubtle, borderRadius: 6, border: `1px solid ${c.border}` }}>{n}</div>
                ))}
                {type === 'contact' && (item.admin_notes || []).map((n, i) => (
                  <div key={i} style={{ fontSize: 12, padding: '8px 12px', background: c.bgSubtle, borderRadius: 6, border: `1px solid ${c.border}` }}>
                    <span style={{ color: c.textMuted, marginRight: 8 }}>{new Date(n.ts).toLocaleDateString('en-GB')}</span>
                    <span style={{ color: c.textSecondary }}>{n.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ padding: 16, background: c.bgSubtle, borderRadius: 8, border: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Update Status</div>
            <Select
              value={stage}
              onChange={e => setStage(e.target.value)}
              options={stageOptions.map(s => ({ value: s, label: s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }))}
              style={{ width: '100%' }}
            />
            {type !== 'feedback' && (
              <textarea
                value={note} onChange={e => setNote(e.target.value)}
                placeholder="Add a note…" rows={3}
                style={{
                  background: c.bgCard, border: `1.5px solid ${c.border}`,
                  borderRadius: 8, color: c.textPrimary, fontFamily: 'inherit',
                  fontSize: 13, padding: '8px 12px', outline: 'none',
                  resize: 'vertical', width: '100%', boxSizing: 'border-box',
                }}
              />
            )}
            <button onClick={handleSave} disabled={saving} style={{
              background: 'linear-gradient(135deg, #1a6fc4, #0ea5e9)',
              border: 'none', borderRadius: 8, color: '#fff',
              cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
              fontWeight: 700, padding: '10px 20px',
              opacity: saving ? 0.6 : 1, boxShadow: '0 2px 8px rgba(26,111,196,0.25)',
            }}>{saving ? 'Saving…' : 'Save Changes'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Table ─────────────────────────────────────────────────────────────────────
const Table = ({ columns, rows, onRowClick }) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr style={{ background: c.bgSubtle, borderBottom: `1px solid ${c.border}` }}>
          {columns.map(col => (
            <th key={col.key} style={{
              padding: '10px 16px', textAlign: 'left',
              color: c.textMuted, fontWeight: 700,
              fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap',
            }}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr><td colSpan={columns.length} style={{ padding: '40px 16px', textAlign: 'center', color: c.textMuted }}>No records found</td></tr>
        ) : rows.map((row, i) => (
          <tr key={row.id || i}
            onClick={() => onRowClick && onRowClick(row)}
            style={{ borderBottom: `1px solid ${c.border}`, cursor: onRowClick ? 'pointer' : 'default', transition: 'background 0.1s' }}
            onMouseEnter={e => e.currentTarget.style.background = c.bgHover}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {columns.map(col => (
              <td key={col.key} style={{ padding: '12px 16px', color: c.textSecondary, verticalAlign: 'middle' }}>
                {col.render ? col.render(row[col.key], row) : (row[col.key] || '—')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── CRM Leads ─────────────────────────────────────────────────────────────────
const LeadsView = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    setLeads(data || []);
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const filtered = leads.filter(l => {
    const q = search.toLowerCase();
    return (!q || l.name?.toLowerCase().includes(q) || l.email?.toLowerCase().includes(q) || l.company?.toLowerCase().includes(q))
      && (stageFilter === 'all' || l.stage === stageFilter);
  });

  const handleUpdate = (id, updates) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
    setSelected(prev => prev?.id === id ? { ...prev, ...updates } : prev);
  };

  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
  const stageCounts = LEAD_STAGES.reduce((acc, s) => { acc[s] = leads.filter(l => l.stage === s).length; return acc; }, {});

  const cols = [
    { key: 'name', label: 'Name', render: (v, r) => (
      <div><div style={{ color: c.textPrimary, fontWeight: 600 }}>{v}</div><div style={{ fontSize: 11, color: c.textMuted }}>{r.email}</div></div>
    )},
    { key: 'company', label: 'Company', render: v => <span style={{ color: c.textPrimary }}>{v || '—'}</span> },
    { key: 'source', label: 'Source', render: v => <Badge label={v || 'website'} stage="qualified" /> },
    { key: 'interest', label: 'Interest', render: v => Array.isArray(v) ? v.slice(0,2).join(', ') : (v || '—') },
    { key: 'stage', label: 'Stage', render: v => <Badge label={v || 'new'} stage={v || 'new'} /> },
    { key: 'deal_value', label: 'Value', render: v => v ? <span style={{ fontWeight: 700, color: c.textPrimary }}>£{Number(v).toLocaleString()}</span> : '—' },
    { key: 'created_at', label: 'Received', render: fmt },
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard icon="📥" label="Total Leads" value={leads.length} sub="All time" accent={c.cyan} />
        <StatCard icon="🆕" label="New" value={stageCounts.new || 0} sub="Awaiting contact" accent={c.blue} />
        <StatCard icon="🏆" label="Won" value={stageCounts.won || 0} sub="Closed deals" accent={c.success} />
      </div>
      <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(15,23,42,0.05)' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${c.border}`, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', background: c.bgSubtle }}>
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email, company…" style={{ flex: 1, minWidth: 200 }} />
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Pill active={stageFilter === 'all'} onClick={() => setStageFilter('all')}>All ({leads.length})</Pill>
            {LEAD_STAGES.map(s => (
              <Pill key={s} active={stageFilter === s} onClick={() => setStageFilter(s)}>
                {s.charAt(0).toUpperCase() + s.slice(1)} ({stageCounts[s] || 0})
              </Pill>
            ))}
          </div>
        </div>
        {loading ? <div style={{ padding: 40, textAlign: 'center', color: c.textMuted }}>Loading…</div> : <Table columns={cols} rows={filtered} onRowClick={setSelected} />}
      </div>
      {selected && <DetailDrawer item={selected} type="lead" onClose={() => setSelected(null)} onUpdate={handleUpdate} />}
    </div>
  );
};

// ─── Contact Submissions ───────────────────────────────────────────────────────
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

  const filtered = items.filter(l => {
    const q = search.toLowerCase();
    return (!q || l.name?.toLowerCase().includes(q) || l.email?.toLowerCase().includes(q) || l.company?.toLowerCase().includes(q))
      && (statusFilter === 'all' || l.status === statusFilter);
  });

  const handleUpdate = (id, updates) => {
    setItems(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
    setSelected(prev => prev?.id === id ? { ...prev, ...updates } : prev);
  };

  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
  const counts = CONTACT_STATUSES.reduce((acc, s) => { acc[s] = items.filter(l => l.status === s).length; return acc; }, {});

  const cols = [
    { key: 'name', label: 'Name', render: (v, r) => (
      <div><div style={{ color: c.textPrimary, fontWeight: 600 }}>{v}</div><div style={{ fontSize: 11, color: c.textMuted }}>{r.email}</div></div>
    )},
    { key: 'company', label: 'Company', render: v => <span style={{ color: c.textPrimary }}>{v || '—'}</span> },
    { key: 'interest', label: 'Interest' },
    { key: 'message', label: 'Message', render: v => v ? v.slice(0, 60) + (v.length > 60 ? '…' : '') : '—' },
    { key: 'status', label: 'Status', render: v => <Badge label={v || 'new'} stage={v || 'new'} /> },
    { key: 'created_at', label: 'Received', render: fmt },
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard icon="📨" label="Total" value={items.length} accent={c.cyan} />
        <StatCard icon="🆕" label="New" value={counts.new || 0} accent={c.blue} />
        <StatCard icon="⚙️" label="In Progress" value={counts.in_progress || 0} accent={c.warning} />
        <StatCard icon="✅" label="Resolved" value={counts.resolved || 0} accent={c.success} />
      </div>
      <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(15,23,42,0.05)' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${c.border}`, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', background: c.bgSubtle }}>
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email, company…" style={{ flex: 1, minWidth: 200 }} />
          <div style={{ display: 'flex', gap: 4 }}>
            <Pill active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>All</Pill>
            {CONTACT_STATUSES.map(s => (
              <Pill key={s} active={statusFilter === s} onClick={() => setStatusFilter(s)}>
                {s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Pill>
            ))}
          </div>
        </div>
        {loading ? <div style={{ padding: 40, textAlign: 'center', color: c.textMuted }}>Loading…</div> : <Table columns={cols} rows={filtered} onRowClick={setSelected} />}
      </div>
      {selected && <DetailDrawer item={selected} type="contact" onClose={() => setSelected(null)} onUpdate={handleUpdate} />}
    </div>
  );
};

// ─── Feedback ──────────────────────────────────────────────────────────────────
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

  const filtered = items.filter(l => {
    const q = search.toLowerCase();
    return (!q || l.user_email?.toLowerCase().includes(q) || l.message?.toLowerCase().includes(q) || l.page_url?.toLowerCase().includes(q))
      && (statusFilter === 'all' || l.status === statusFilter);
  });

  const handleUpdate = (id, updates) => {
    setItems(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
    setSelected(prev => prev?.id === id ? { ...prev, ...updates } : prev);
  };

  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
  const counts = FEEDBACK_STATUSES.reduce((acc, s) => { acc[s] = items.filter(i => i.status === s).length; return acc; }, {});
  const isFault = feedbackType === 'fault';

  const cols = [
    { key: 'user_email', label: 'User', render: v => <span style={{ color: c.textPrimary, fontWeight: 500 }}>{v || 'Anonymous'}</span> },
    { key: 'message', label: 'Message', render: v => <span style={{ color: c.textSecondary }}>{v ? v.slice(0, 80) + (v.length > 80 ? '…' : '') : '—'}</span> },
    { key: 'page_url', label: 'Page', render: v => v ? <span style={{ fontSize: 11, color: c.textMuted, fontFamily: 'monospace' }}>{v.replace(/^https?:\/\/[^/]+/, '').slice(0, 40)}</span> : '—' },
    { key: 'status', label: 'Status', render: v => <Badge label={(v || 'new').replace(/_/g, ' ')} stage={v || 'new'} /> },
    { key: 'created_at', label: 'Submitted', render: fmt },
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard icon={isFault ? '🐛' : '💡'} label={`Total ${isFault ? 'Issues' : 'Features'}`} value={items.length} accent={isFault ? c.error : c.purple} />
        <StatCard icon="🆕" label="New" value={counts.new || 0} accent={c.blue} />
        <StatCard icon="🔧" label="In Progress" value={counts.in_progress || 0} accent={c.warning} />
        <StatCard icon="✅" label="Done" value={counts.done || 0} accent={c.success} />
      </div>
      <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(15,23,42,0.05)' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${c.border}`, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', background: c.bgSubtle }}>
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${isFault ? 'issues' : 'features'}…`} style={{ flex: 1, minWidth: 200 }} />
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Pill active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>All ({items.length})</Pill>
            {FEEDBACK_STATUSES.map(s => (
              <Pill key={s} active={statusFilter === s} onClick={() => setStatusFilter(s)}>
                {s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} ({counts[s] || 0})
              </Pill>
            ))}
          </div>
        </div>
        {loading ? <div style={{ padding: 40, textAlign: 'center', color: c.textMuted }}>Loading…</div> : <Table columns={cols} rows={filtered} onRowClick={setSelected} />}
      </div>
      {selected && <DetailDrawer item={selected} type="feedback" onClose={() => setSelected(null)} onUpdate={handleUpdate} />}
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
        supabase.from('leads').select('id, name, email, company, stage, created_at').order('created_at', { ascending: false }),
        supabase.from('contact_submissions').select('id, name, email, status, created_at').order('created_at', { ascending: false }),
        supabase.from('fl_feedback').select('id, user_email, message, status, created_at').eq('type', 'fault').order('created_at', { ascending: false }),
        supabase.from('fl_feedback').select('id, user_email, message, status, created_at').eq('type', 'feature').order('created_at', { ascending: false }),
      ]);
      const allActivity = [
        ...(leads.data || []).slice(0, 5).map(r => ({ ...r, _type: 'lead', _label: 'CRM Lead', _color: c.cyan, _bg: c.cyanLight })),
        ...(contacts.data || []).slice(0, 3).map(r => ({ ...r, _type: 'contact', _label: 'Contact Form', _color: c.blue, _bg: c.blueLight })),
        ...(issues.data || []).slice(0, 3).map(r => ({ ...r, _type: 'issue', _label: 'Issue', _color: c.error, _bg: c.errorLight })),
        ...(features.data || []).slice(0, 3).map(r => ({ ...r, _type: 'feature', _label: 'Feature Request', _color: c.purple, _bg: c.purpleLight })),
      ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10);

      setStats({
        leads: leads.data?.length || 0,
        contacts: contacts.data?.length || 0,
        issues: issues.data?.length || 0,
        features: features.data?.length || 0,
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

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: c.textMuted }}>Loading…</div>;

  const quickLinks = [
    { label: 'CRM Leads', sub: `${stats.newLeads} new`, icon: '👥', view: 'leads', accent: c.cyan, bg: c.cyanLight },
    { label: 'Contact Forms', sub: `${stats.contacts} total`, icon: '📨', view: 'contacts', accent: c.blue, bg: c.blueLight },
    { label: 'Bug Reports', sub: `${stats.openIssues} open`, icon: '🐛', view: 'issues', accent: c.error, bg: c.errorLight },
    { label: 'Feature Requests', sub: `${stats.features} total`, icon: '💡', view: 'features', accent: c.purple, bg: c.purpleLight },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        <StatCard icon="👥" label="Total Leads" value={stats.leads} sub={`${stats.newLeads} awaiting contact`} accent={c.cyan} />
        <StatCard icon="📨" label="Contact Forms" value={stats.contacts} sub="From cy-sec.co.uk" accent={c.blue} />
        <StatCard icon="🐛" label="Open Issues" value={stats.openIssues} sub={`${stats.issues} total reported`} accent={c.error} />
        <StatCard icon="💡" label="Feature Requests" value={stats.features} sub="From FortifyOne/Learn" accent={c.purple} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {quickLinks.map(lnk => (
          <button key={lnk.view} onClick={() => setView(lnk.view)} style={{
            background: lnk.bg, border: `1px solid ${lnk.accent}30`,
            borderRadius: 10, padding: '14px 16px',
            cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
            transition: 'transform 0.15s, box-shadow 0.15s',
            boxShadow: '0 1px 3px rgba(15,23,42,0.06)',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(15,23,42,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(15,23,42,0.06)'; }}
          >
            <div style={{ fontSize: 20, marginBottom: 6 }}>{lnk.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary }}>{lnk.label}</div>
            <div style={{ fontSize: 11, color: lnk.accent, fontWeight: 600, marginTop: 2 }}>{lnk.sub}</div>
          </button>
        ))}
      </div>

      <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(15,23,42,0.05)' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${c.border}`, background: c.bgSubtle, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Recent Activity</span>
          <span style={{ fontSize: 11, color: c.textMuted }}>Last 10 entries</span>
        </div>
        <div>
          {stats.recentActivity.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: c.textMuted }}>No recent activity</div>
          ) : stats.recentActivity.map((item, i) => (
            <div key={i} style={{
              padding: '12px 20px',
              borderBottom: i < stats.recentActivity.length - 1 ? `1px solid ${c.border}` : 'none',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: item._bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                {item._type === 'lead' ? '👤' : item._type === 'contact' ? '✉️' : item._type === 'issue' ? '🐛' : '💡'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{item.name || item.user_email || 'Anonymous'}</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, background: item._bg, color: item._color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${item._color}30` }}>
                    {item._label}
                  </span>
                </div>
                {(item.email || item.message) && (
                  <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.email || item.message?.slice(0, 80)}
                  </div>
                )}
              </div>
              <div style={{ fontSize: 11, color: c.textMuted, flexShrink: 0 }}>{fmtAgo(item.created_at)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Platform Config ───────────────────────────────────────────────────────────
const ConfigView = () => {
  const sections = [
    {
      title: 'Platform & Hosting', icon: '🏗️', color: c.cyan,
      items: [
        { label: 'Main Site', value: 'cy-sec.co.uk → Vercel (auto-deploy from GitHub main)' },
        { label: 'GitHub', value: 'github.com/GazCocklin/cy-sec-website' },
        { label: 'Stack', value: 'React + Vite + Tailwind + shadcn/ui (319 files)' },
        { label: 'FortifyLearn', value: 'fortifylearn.co.uk → Vercel' },
        { label: 'FortifyOne', value: 'fortifyone.co.uk → Vercel' },
        { label: 'Supabase', value: 'kmnbtnfgeadvvkwsdyml.supabase.co' },
        { label: 'DNS', value: 'Hostinger (A record → Vercel IP)' },
      ],
    },
    {
      title: 'Database Tables', icon: '🗄️', color: c.blue,
      items: [
        { label: 'leads', value: 'CRM — website contact forms & direct leads' },
        { label: 'contact_submissions', value: 'Raw contact form submissions from cy-sec.co.uk' },
        { label: 'fl_feedback', value: 'Fault reports & feature requests (type: fault | feature)' },
        { label: 'organisations', value: 'FortifyOne GRC client organisations' },
        { label: 'profiles', value: 'User profiles (all platforms)' },
        { label: 'pbq_banks / pbq_questions', value: 'FortifyLearn PBQ question banks' },
        { label: 'pbq_packs', value: 'FortifyLearn paid practice packs' },
        { label: 'user_entitlements', value: 'FortifyLearn purchase records (Stripe-linked)' },
      ],
    },
    {
      title: 'Products & Pricing', icon: '💼', color: c.purple,
      items: [
        { label: 'FortifyLearn', value: 'CompTIA PBQ simulator — N10-009 & SY0-701. Free Easy labs, paid packs £12.99–£19.99' },
        { label: 'FortifyOne', value: 'GRC platform for UK SMEs — from £149/month' },
        { label: 'vCISO', value: 'From £995/month (FortifyOne included)' },
        { label: 'DORA Sprint', value: 'Fixed price from £4,000' },
        { label: 'NIS2 Review', value: 'From £2,500' },
        { label: 'Tabletop Exercises', value: 'DDoS, BEC, ransomware scenarios' },
        { label: 'AI Security Assessment', value: 'AI Security Readiness Assessment' },
        { label: 'Cert Training', value: 'CISM, CRISC, AAISM, BCS CISMP via Firebrand' },
      ],
    },
    {
      title: 'Outstanding Items', icon: '⚠️', color: c.warning,
      items: [
        { label: 'Privacy Policy', value: '3 placeholders: (1) Company registration number, (2) Registered office address, (3) ICO registration number' },
      ],
    },
    {
      title: 'Content & Brand Rules', icon: '✏️', color: c.success,
      items: [
        { label: 'Wordmark', value: "Always 'Cy-Sec' — not CY-SEC and not lowercase" },
        { label: 'Tone', value: "Direct, practitioner-led, no jargon for jargon's sake" },
        { label: 'CompTIA', value: 'Use "Authorised" (UK spelling)' },
        { label: 'eSentire', value: 'Managed security partner — not a Cy-Sec product' },
        { label: 'DORA', value: 'Enforcement since January 2025 — mandatory' },
        { label: 'Primary Colour', value: '#1a6fc4 (Cy-Sec blue), #0ea5e9 (cyan accent)' },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {sections.map(section => (
        <div key={section.title} style={{
          background: c.bgCard, border: `1px solid ${c.border}`,
          borderRadius: 12, overflow: 'hidden',
          borderLeft: `4px solid ${section.color}`,
          boxShadow: '0 1px 4px rgba(15,23,42,0.05)',
        }}>
          <div style={{ padding: '14px 20px', borderBottom: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', gap: 10, background: c.bgSubtle }}>
            <span style={{ fontSize: 16 }}>{section.icon}</span>
            <span style={{ fontWeight: 800, fontSize: 14, color: c.textPrimary }}>{section.title}</span>
          </div>
          <div>
            {section.items.map((item, i) => (
              <div key={i} style={{
                padding: '10px 20px',
                borderBottom: i < section.items.length - 1 ? `1px solid ${c.border}` : 'none',
                display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16, alignItems: 'start',
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: section.color, textTransform: 'uppercase', letterSpacing: '0.06em', paddingTop: 1, fontFamily: 'monospace' }}>{item.label}</span>
                <span style={{ fontSize: 13, color: c.textSecondary, lineHeight: 1.5 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Nav ───────────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'dashboard', label: 'Dashboard',        icon: '📊' },
  { id: 'leads',     label: 'CRM Leads',         icon: '👥' },
  { id: 'contacts',  label: 'Contact Forms',      icon: '📨' },
  { id: 'issues',    label: 'Issues',             icon: '🐛' },
  { id: 'features',  label: 'Feature Requests',   icon: '💡' },
  { id: 'config',    label: 'Platform Config',    icon: '⚙️' },
];

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  leads: 'CRM Leads',
  contacts: 'Contact Forms',
  issues: 'Bug Reports & Issues',
  features: 'Feature Requests',
  config: 'Platform Configuration',
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
      case 'config':    return <ConfigView />;
      default:          return <DashboardView setView={setView} />;
    }
  };

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: c.bg,
      fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
      color: c.textPrimary,
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 230 : 64, flexShrink: 0,
        background: c.bgCard, borderRight: `1px solid ${c.border}`,
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.2s ease', overflow: 'hidden',
        boxShadow: '1px 0 0 rgba(15,23,42,0.04)',
      }}>
        <div style={{
          padding: '20px 16px', borderBottom: `1px solid ${c.border}`,
          display: 'flex', alignItems: 'center', gap: 10,
          justifyContent: sidebarOpen ? 'space-between' : 'center',
        }}>
          {sidebarOpen && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 7,
                background: 'linear-gradient(135deg, #1a6fc4, #0ea5e9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, flexShrink: 0,
              }}>🛡️</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 900, color: c.textPrimary, letterSpacing: '-0.03em' }}>Cy-Sec</div>
                <div style={{ fontSize: 10, color: c.blue, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: -2 }}>Admin</div>
              </div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(p => !p)}
            style={{ background: 'none', border: 'none', color: c.textMuted, cursor: 'pointer', fontSize: 14, padding: 4, lineHeight: 1, flexShrink: 0 }}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav style={{ padding: '12px 8px', flex: 1 }}>
          {NAV.map(item => {
            const active = view === item.id;
            return (
              <button key={item.id} onClick={() => setView(item.id)} title={!sidebarOpen ? item.label : undefined}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: sidebarOpen ? '9px 12px' : '9px 0',
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  fontSize: 13, fontWeight: active ? 700 : 500, marginBottom: 2,
                  background: active ? c.blueLight : 'transparent',
                  color: active ? c.blue : c.textSecondary,
                  transition: 'all 0.15s',
                  borderLeft: active ? `2px solid ${c.blue}` : '2px solid transparent',
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = c.bgHover; e.currentTarget.style.color = c.textPrimary; }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = c.textSecondary; }}}
              >
                <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {sidebarOpen && (
          <div style={{ padding: '12px 16px', borderTop: `1px solid ${c.border}` }}>
            <div style={{ fontSize: 11, color: c.textMuted, lineHeight: 1.7 }}>
              <div style={{ fontWeight: 700, color: c.textSecondary }}>Gary Cocklin</div>
              <div>CISSP-ISSAP · CISM · CRISC</div>
            </div>
          </div>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{
          padding: '16px 28px', borderBottom: `1px solid ${c.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: c.bgCard, boxShadow: '0 1px 0 rgba(15,23,42,0.06)',
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 900, letterSpacing: '-0.03em', color: c.textPrimary }}>
              {PAGE_TITLES[view]}
            </h1>
            <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2 }}>
              {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
          <a href="/" style={{
            fontSize: 12, color: c.textSecondary, textDecoration: 'none',
            padding: '7px 14px', borderRadius: 7, border: `1.5px solid ${c.border}`,
            fontWeight: 600, background: c.bgSubtle, transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = c.blue; e.currentTarget.style.color = c.blue; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textSecondary; }}
          >← Back to site</a>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
          {renderView()}
        </div>
      </div>
    </div>
  );
}
