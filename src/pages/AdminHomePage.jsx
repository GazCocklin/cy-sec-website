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

// ─── Status config ─────────────────────────────────────────────────────────────
const LEAD_STAGES = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];
const CONTACT_STATUSES = ['new', 'in_progress', 'resolved', 'archived'];
const FEEDBACK_STATUSES = ['new', 'reviewing', 'in_progress', 'done', 'wont_fix'];

const stageColor = (stage) => ({
  new:       { bg: '#0ea5e920', border: '#0ea5e9', text: '#0ea5e9' },
  contacted: { bg: '#F59E0B20', border: '#F59E0B', text: '#F59E0B' },
  qualified: { bg: '#8B5CF620', border: '#8B5CF6', text: '#8B5CF6' },
  proposal:  { bg: '#1a6fc420', border: '#1a6fc4', text: '#1a6fc4' },
  won:       { bg: '#10B98120', border: '#10B981', text: '#10B981' },
  lost:      { bg: '#EF444420', border: '#EF4444', text: '#EF4444' },
  new_contact: { bg: '#0ea5e920', border: '#0ea5e9', text: '#0ea5e9' },
  in_progress: { bg: '#F59E0B20', border: '#F59E0B', text: '#F59E0B' },
  resolved:  { bg: '#10B98120', border: '#10B981', text: '#10B981' },
  archived:  { bg: '#4a608020', border: '#4a6080', text: '#4a6080' },
  reviewing: { bg: '#8B5CF620', border: '#8B5CF6', text: '#8B5CF6' },
  done:      { bg: '#10B98120', border: '#10B981', text: '#10B981' },
  wont_fix:  { bg: '#EF444420', border: '#EF4444', text: '#EF4444' },
}[stage] || { bg: '#1a254020', border: '#1a2540', text: '#94A3B8' });

// ─── Small components ──────────────────────────────────────────────────────────
const Badge = ({ label, stage }) => {
  const c = stageColor(stage || label?.toLowerCase());
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 10px', borderRadius: 99,
      background: c.bg, border: `1px solid ${c.border}`,
      color: c.text, fontSize: 11, fontWeight: 700,
      letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.border }} />
      {label}
    </span>
  );
};

const StatCard = ({ icon, label, value, sub, accent }) => (
  <div style={{
    background: colors.bgCard, border: `1px solid ${colors.border}`,
    borderRadius: 12, padding: '20px 24px',
    borderTop: `2px solid ${accent || colors.blue}`,
    display: 'flex', flexDirection: 'column', gap: 4,
    transition: 'border-color 0.2s',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: colors.textMuted, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</span>
      <span style={{ fontSize: 18 }}>{icon}</span>
    </div>
    <div style={{ fontSize: 32, fontWeight: 800, color: colors.textPrimary, letterSpacing: '-0.03em' }}>{value}</div>
    {sub && <div style={{ fontSize: 12, color: colors.textMuted }}>{sub}</div>}
  </div>
);

const Pill = ({ children, active, onClick }) => (
  <button onClick={onClick} style={{
    padding: '4px 14px', borderRadius: 99, border: 'none', cursor: 'pointer',
    fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
    background: active ? colors.blue : 'transparent',
    color: active ? '#fff' : colors.textSecondary,
    transition: 'all 0.15s',
  }}>
    {children}
  </button>
);

const Input = ({ value, onChange, placeholder, style }) => (
  <input
    value={value} onChange={onChange} placeholder={placeholder}
    style={{
      background: colors.bgCard, border: `1px solid ${colors.border}`,
      borderRadius: 8, color: colors.textPrimary, fontFamily: 'inherit',
      fontSize: 13, padding: '8px 12px', outline: 'none',
      ...style,
    }}
  />
);

const Select = ({ value, onChange, options, style }) => (
  <select
    value={value} onChange={onChange}
    style={{
      background: colors.bgCard, border: `1px solid ${colors.border}`,
      borderRadius: 8, color: colors.textPrimary, fontFamily: 'inherit',
      fontSize: 13, padding: '8px 12px', outline: 'none', cursor: 'pointer',
      ...style,
    }}
  >
    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

// ─── Modal drawer ──────────────────────────────────────────────────────────────
const DetailDrawer = ({ item, type, onClose, onUpdate }) => {
  const [note, setNote] = useState('');
  const [stage, setStage] = useState(item?.stage || item?.status || 'new');
  const [saving, setSaving] = useState(false);

  if (!item) return null;

  const stageOptions = type === 'lead'
    ? LEAD_STAGES
    : type === 'contact'
    ? CONTACT_STATUSES
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
    setSaving(false);
    setNote('');
    onUpdate(item.id, updates);
  };

  const formatDate = (d) => d ? new Date(d).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : '—';

  const Field = ({ label, value }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
      <span style={{ fontSize: 13, color: colors.textPrimary }}>{value || '—'}</span>
    </div>
  );

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      display: 'flex', justifyContent: 'flex-end',
    }}>
      <div onClick={onClose} style={{ flex: 1, background: 'rgba(6,11,24,0.7)' }} />
      <div style={{
        width: 480, background: colors.bgCard,
        borderLeft: `1px solid ${colors.border}`,
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px', borderBottom: `1px solid ${colors.border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: colors.textPrimary }}>{item.name || item.user_email || 'Unknown'}</div>
            <div style={{ fontSize: 12, color: colors.textMuted }}>{formatDate(item.created_at)}</div>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', color: colors.textMuted,
            cursor: 'pointer', fontSize: 20, lineHeight: 1, padding: 4,
          }}>✕</button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Core fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: 16, background: colors.bg, borderRadius: 8 }}>
            {item.email && <Field label="Email" value={item.email} />}
            {item.company && <Field label="Company" value={item.company} />}
            {item.phone && <Field label="Phone" value={item.phone} />}
            {item.source && <Field label="Source" value={item.source} />}
            {item.interest && <Field label="Interest" value={Array.isArray(item.interest) ? item.interest.join(', ') : item.interest} />}
            {item.deal_value && <Field label="Deal Value" value={`£${Number(item.deal_value).toLocaleString()}`} />}
            {item.page_url && <Field label="Page" value={item.page_url} />}
            {item.browser && <Field label="Browser" value={item.browser} />}
          </div>

          {/* Message */}
          {item.message && (
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Message</div>
              <div style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 1.6, padding: '12px 16px', background: colors.bg, borderRadius: 8, borderLeft: `3px solid ${colors.borderAccent}` }}>
                {item.message}
              </div>
            </div>
          )}

          {/* Notes log */}
          {(item.notes || (Array.isArray(item.admin_notes) && item.admin_notes.length > 0)) && (
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Notes</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {type === 'lead' && item.notes && item.notes.split('\n').filter(Boolean).map((n, i) => (
                  <div key={i} style={{ fontSize: 12, color: colors.textSecondary, padding: '8px 12px', background: colors.bg, borderRadius: 6 }}>{n}</div>
                ))}
                {type === 'contact' && (item.admin_notes || []).map((n, i) => (
                  <div key={i} style={{ fontSize: 12, padding: '8px 12px', background: colors.bg, borderRadius: 6 }}>
                    <span style={{ color: colors.textMuted, marginRight: 8 }}>{new Date(n.ts).toLocaleDateString('en-GB')}</span>
                    <span style={{ color: colors.textSecondary }}>{n.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status update */}
          <div style={{ padding: 16, background: colors.bg, borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Update</div>
            <Select
              value={stage}
              onChange={e => setStage(e.target.value)}
              options={stageOptions.map(s => ({ value: s, label: s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }))}
              style={{ width: '100%' }}
            />
            {type !== 'feedback' && (
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Add a note..."
                rows={3}
                style={{
                  background: colors.bgCard, border: `1px solid ${colors.border}`,
                  borderRadius: 8, color: colors.textPrimary, fontFamily: 'inherit',
                  fontSize: 13, padding: '8px 12px', outline: 'none', resize: 'vertical', width: '100%', boxSizing: 'border-box',
                }}
              />
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                background: colors.blue, border: 'none', borderRadius: 8,
                color: '#fff', cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 13, fontWeight: 700, padding: '10px 20px',
                opacity: saving ? 0.6 : 1,
              }}
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
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
        <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
          {columns.map(col => (
            <th key={col.key} style={{
              padding: '10px 16px', textAlign: 'left',
              color: colors.textMuted, fontWeight: 700,
              fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={columns.length} style={{ padding: '40px 16px', textAlign: 'center', color: colors.textMuted, fontSize: 13 }}>
              No records found
            </td>
          </tr>
        ) : rows.map((row, i) => (
          <tr
            key={row.id || i}
            onClick={() => onRowClick && onRowClick(row)}
            style={{
              borderBottom: `1px solid ${colors.border}20`,
              cursor: onRowClick ? 'pointer' : 'default',
              transition: 'background 0.12s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = colors.bgHover}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {columns.map(col => (
              <td key={col.key} style={{ padding: '12px 16px', color: colors.textSecondary, verticalAlign: 'middle' }}>
                {col.render ? col.render(row[col.key], row) : (row[col.key] || '—')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── CRM Leads view ────────────────────────────────────────────────────────────
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
    const matchQ = !q || l.name?.toLowerCase().includes(q) || l.email?.toLowerCase().includes(q) || l.company?.toLowerCase().includes(q);
    const matchStage = stageFilter === 'all' || l.stage === stageFilter;
    return matchQ && matchStage;
  });

  const handleUpdate = (id, updates) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
    setSelected(prev => prev?.id === id ? { ...prev, ...updates } : prev);
  };

  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

  const cols = [
    { key: 'name', label: 'Name', render: (v, r) => (
      <div>
        <div style={{ color: colors.textPrimary, fontWeight: 600 }}>{v}</div>
        <div style={{ fontSize: 11, color: colors.textMuted }}>{r.email}</div>
      </div>
    )},
    { key: 'company', label: 'Company' },
    { key: 'source', label: 'Source', render: v => <Badge label={v || 'website'} stage="qualified" /> },
    { key: 'interest', label: 'Interest', render: v => Array.isArray(v) ? v.slice(0,2).join(', ') : (v || '—') },
    { key: 'stage', label: 'Stage', render: v => <Badge label={v || 'new'} stage={v || 'new'} /> },
    { key: 'deal_value', label: 'Value', render: v => v ? `£${Number(v).toLocaleString()}` : '—' },
    { key: 'created_at', label: 'Received', render: fmt },
  ];

  const stageCounts = LEAD_STAGES.reduce((acc, s) => {
    acc[s] = leads.filter(l => l.stage === s).length;
    return acc;
  }, {});

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
        <StatCard icon="📥" label="Total Leads" value={leads.length} sub="All time" accent={colors.cyan} />
        <StatCard icon="🆕" label="New" value={stageCounts.new || 0} sub="Awaiting contact" accent={colors.blue} />
        <StatCard icon="🏆" label="Won" value={stageCounts.won || 0} sub="Closed deals" accent={colors.success} />
      </div>

      <div style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
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
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: colors.textMuted }}>Loading…</div>
        ) : (
          <Table columns={cols} rows={filtered} onRowClick={setSelected} />
        )}
      </div>

      {selected && (
        <DetailDrawer item={selected} type="lead" onClose={() => setSelected(null)} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

// ─── Contact Submissions view ──────────────────────────────────────────────────
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
      setItems(data || []);
      setLoading(false);
    })();
  }, []);

  const filtered = items.filter(l => {
    const q = search.toLowerCase();
    const matchQ = !q || l.name?.toLowerCase().includes(q) || l.email?.toLowerCase().includes(q) || l.company?.toLowerCase().includes(q);
    const matchS = statusFilter === 'all' || l.status === statusFilter;
    return matchQ && matchS;
  });

  const handleUpdate = (id, updates) => {
    setItems(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
    setSelected(prev => prev?.id === id ? { ...prev, ...updates } : prev);
  };

  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

  const cols = [
    { key: 'name', label: 'Name', render: (v, r) => (
      <div>
        <div style={{ color: colors.textPrimary, fontWeight: 600 }}>{v}</div>
        <div style={{ fontSize: 11, color: colors.textMuted }}>{r.email}</div>
      </div>
    )},
    { key: 'company', label: 'Company' },
    { key: 'interest', label: 'Interest', render: v => v || '—' },
    { key: 'message', label: 'Message', render: v => v ? v.slice(0, 60) + (v.length > 60 ? '…' : '') : '—' },
    { key: 'status', label: 'Status', render: v => <Badge label={v || 'new'} stage={v || 'new'} /> },
    { key: 'created_at', label: 'Received', render: fmt },
  ];

  const counts = CONTACT_STATUSES.reduce((acc, s) => {
    acc[s] = items.filter(l => l.status === s).length;
    return acc;
  }, {});

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        <StatCard icon="📨" label="Total Contacts" value={items.length} accent={colors.cyan} />
        <StatCard icon="🆕" label="New" value={counts.new || 0} accent={colors.blue} />
        <StatCard icon="⚙️" label="In Progress" value={counts.in_progress || 0} accent={colors.warning} />
        <StatCard icon="✅" label="Resolved" value={counts.resolved || 0} accent={colors.success} />
      </div>

      <div style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
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
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: colors.textMuted }}>Loading…</div>
        ) : (
          <Table columns={cols} rows={filtered} onRowClick={setSelected} />
        )}
      </div>

      {selected && (
        <DetailDrawer item={selected} type="contact" onClose={() => setSelected(null)} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

// ─── Feedback (Issues / Features) view ────────────────────────────────────────
const FeedbackView = ({ feedbackType }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase.from('fl_feedback').select('*')
        .eq('type', feedbackType)
        .order('created_at', { ascending: false });
      setItems(data || []);
      setLoading(false);
    })();
  }, [feedbackType]);

  const filtered = items.filter(l => {
    const q = search.toLowerCase();
    const matchQ = !q || l.user_email?.toLowerCase().includes(q) || l.message?.toLowerCase().includes(q) || l.page_url?.toLowerCase().includes(q);
    const matchS = statusFilter === 'all' || l.status === statusFilter;
    return matchQ && matchS;
  });

  const handleUpdate = (id, updates) => {
    setItems(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
    setSelected(prev => prev?.id === id ? { ...prev, ...updates } : prev);
  };

  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
  const fmtTime = (d) => d ? new Date(d).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : '—';

  const statusBadgeMap = {
    new: 'new', reviewing: 'reviewing', in_progress: 'in_progress', done: 'done', wont_fix: 'wont_fix',
  };

  const cols = [
    { key: 'user_email', label: 'User', render: (v) => (
      <span style={{ color: colors.textPrimary, fontWeight: 500 }}>{v || 'Anonymous'}</span>
    )},
    { key: 'message', label: 'Message', render: v => (
      <span style={{ color: colors.textSecondary }}>{v ? v.slice(0, 80) + (v.length > 80 ? '…' : '') : '—'}</span>
    )},
    { key: 'page_url', label: 'Page', render: v => v ? (
      <span style={{ fontSize: 11, color: colors.textMuted, fontFamily: 'monospace' }}>{v.replace(/^https?:\/\/[^/]+/, '').slice(0, 40)}</span>
    ) : '—' },
    { key: 'status', label: 'Status', render: v => <Badge label={(v || 'new').replace(/_/g, ' ')} stage={statusBadgeMap[v] || 'new'} /> },
    { key: 'created_at', label: 'Submitted', render: fmt },
  ];

  const counts = FEEDBACK_STATUSES.reduce((acc, s) => {
    acc[s] = items.filter(i => i.status === s).length;
    return acc;
  }, {});

  const isFault = feedbackType === 'fault';

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        <StatCard icon={isFault ? '🐛' : '💡'} label={`Total ${isFault ? 'Issues' : 'Features'}`} value={items.length} accent={isFault ? colors.error : colors.purple} />
        <StatCard icon="🆕" label="New" value={counts.new || 0} accent={colors.blue} />
        <StatCard icon="🔧" label="In Progress" value={counts.in_progress || 0} accent={colors.warning} />
        <StatCard icon="✅" label="Done" value={counts.done || 0} accent={colors.success} />
      </div>

      <div style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
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
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: colors.textMuted }}>Loading…</div>
        ) : (
          <Table columns={cols} rows={filtered} onRowClick={setSelected} />
        )}
      </div>

      {selected && (
        <DetailDrawer item={selected} type="feedback" onClose={() => setSelected(null)} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

// ─── Dashboard overview ────────────────────────────────────────────────────────
const DashboardView = () => {
  const [stats, setStats] = useState({ leads: 0, contacts: 0, issues: 0, features: 0, newLeads: 0, recentActivity: [] });
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
        ...(leads.data || []).slice(0, 5).map(r => ({ ...r, _type: 'lead', _label: 'New Lead', _color: colors.cyan })),
        ...(contacts.data || []).slice(0, 3).map(r => ({ ...r, _type: 'contact', _label: 'Contact Form', _color: colors.blue })),
        ...(issues.data || []).slice(0, 3).map(r => ({ ...r, _type: 'issue', _label: 'Issue Reported', _color: colors.error })),
        ...(features.data || []).slice(0, 3).map(r => ({ ...r, _type: 'feature', _label: 'Feature Request', _color: colors.purple })),
      ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10);

      setStats({
        leads: leads.data?.length || 0,
        contacts: contacts.data?.length || 0,
        issues: issues.data?.length || 0,
        features: features.data?.length || 0,
        newLeads: (leads.data || []).filter(l => l.stage === 'new').length,
        openIssues: (issues.data || []).filter(i => i.status === 'new' || i.status === 'in_progress').length,
        recentActivity: allActivity,
      });
      setLoading(false);
    })();
  }, []);

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: colors.textMuted }}>Loading…</div>;

  const fmtAgo = (d) => {
    const diff = Date.now() - new Date(d).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        <StatCard icon="👥" label="Total Leads" value={stats.leads} sub={`${stats.newLeads} awaiting contact`} accent={colors.cyan} />
        <StatCard icon="📨" label="Contact Forms" value={stats.contacts} sub="From cy-sec.co.uk" accent={colors.blue} />
        <StatCard icon="🐛" label="Open Issues" value={stats.openIssues || 0} sub={`${stats.issues} total reported`} accent={colors.error} />
        <StatCard icon="💡" label="Feature Requests" value={stats.features} sub="From FortifyOne/Learn" accent={colors.purple} />
      </div>

      <div style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: colors.textPrimary }}>Recent Activity</div>
        </div>
        <div>
          {stats.recentActivity.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: colors.textMuted }}>No recent activity</div>
          ) : stats.recentActivity.map((item, i) => (
            <div key={i} style={{
              padding: '12px 20px', borderBottom: `1px solid ${colors.border}20`,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: item._color, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: colors.textPrimary }}>
                    {item.name || item.user_email || 'Anonymous'}
                  </span>
                  <span style={{ fontSize: 10, padding: '1px 8px', borderRadius: 99, background: item._color + '20', color: item._color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {item._label}
                  </span>
                </div>
                {(item.email || item.message) && (
                  <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.email || (item.message?.slice(0, 80))}
                  </div>
                )}
              </div>
              <div style={{ fontSize: 11, color: colors.textMuted, flexShrink: 0 }}>{fmtAgo(item.created_at)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Platform Config / Admin Rules view ───────────────────────────────────────
const ConfigView = () => {
  const sections = [
    {
      title: 'Platform & Hosting',
      icon: '🏗️',
      color: colors.cyan,
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
      title: 'Database Tables',
      icon: '🗄️',
      color: colors.blue,
      items: [
        { label: 'leads', value: 'CRM — website contact forms & direct leads (source field identifies origin)' },
        { label: 'contact_submissions', value: 'Raw contact form submissions from cy-sec.co.uk' },
        { label: 'fl_feedback', value: 'Fault reports & feature requests (type: fault | feature) from FortifyLearn/One' },
        { label: 'organisations', value: 'FortifyOne GRC client organisations' },
        { label: 'profiles', value: 'User profiles (all platforms)' },
        { label: 'pbq_banks / pbq_questions', value: 'FortifyLearn PBQ question banks' },
        { label: 'pbq_packs', value: 'FortifyLearn paid practice packs' },
        { label: 'user_entitlements', value: 'FortifyLearn purchase records (Stripe-linked)' },
      ],
    },
    {
      title: 'Products & Pricing',
      icon: '💼',
      color: colors.purple,
      items: [
        { label: 'FortifyLearn', value: 'CompTIA PBQ simulator — Network+ (N10-009) & Security+ (SY0-701). Free Easy labs, paid packs £12.99–£19.99' },
        { label: 'FortifyOne', value: 'GRC platform for UK SMEs — from £149/month. ISO 27001:2022, NIST CSF 2.0, GDPR, SOC 2, DORA, NIS2' },
        { label: 'vCISO', value: 'From £995/month (FortifyOne included). Delivered via eSentire and direct.' },
        { label: 'DORA Sprint', value: 'Fixed price from £4,000 (Jan 2025 mandatory enforcement)' },
        { label: 'NIS2 Review', value: 'From £2,500' },
        { label: 'Tabletop Exercises', value: 'DDoS, BEC, ransomware scenarios' },
        { label: 'AI Security Assessment', value: 'AI Security Readiness Assessment' },
        { label: 'Certification Training', value: 'CISM, CRISC, AAISM, BCS CISMP via Firebrand Training' },
      ],
    },
    {
      title: 'Outstanding Items',
      icon: '⚠️',
      color: colors.warning,
      items: [
        { label: 'Privacy Policy', value: '3 placeholders need real values: (1) Company registration number, (2) Registered office address, (3) ICO registration number. Page: cy-sec.co.uk/privacy' },
      ],
    },
    {
      title: 'Content & Brand Rules',
      icon: '✏️',
      color: colors.success,
      items: [
        { label: 'Wordmark', value: "Always 'Cy-Sec' — not all caps (CY-SEC) and not lowercase" },
        { label: 'Tone', value: 'Direct, practitioner-led, no jargon for jargon\'s sake. Real credentials, real pricing.' },
        { label: 'CompTIA', value: 'Use "Authorised" (UK spelling), not "Authorized"' },
        { label: 'eSentire', value: 'Managed security partner — not a Cy-Sec product' },
        { label: 'DORA', value: 'Enforcement since January 2025 — mandatory' },
        { label: 'Font', value: 'Bricolage Grotesque (headings, weight 800–900), system-ui (body)' },
        { label: 'Primary Colour', value: '#1a6fc4 (Cy-Sec blue), #0ea5e9 (cyan accent)' },
        { label: 'FortifyLearn', value: 'Do not change without explicit approval from Gaz' },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {sections.map(section => (
        <div key={section.title} style={{
          background: colors.bgCard, border: `1px solid ${colors.border}`,
          borderRadius: 12, overflow: 'hidden',
          borderTop: `2px solid ${section.color}`,
        }}>
          <div style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 16 }}>{section.icon}</span>
            <span style={{ fontWeight: 800, fontSize: 13, color: colors.textPrimary, letterSpacing: '-0.01em' }}>{section.title}</span>
          </div>
          <div>
            {section.items.map((item, i) => (
              <div key={i} style={{
                padding: '10px 20px', borderBottom: i < section.items.length - 1 ? `1px solid ${colors.border}20` : 'none',
                display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16, alignItems: 'start',
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: section.color, textTransform: 'uppercase', letterSpacing: '0.06em', paddingTop: 1, fontFamily: 'monospace' }}>{item.label}</span>
                <span style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 1.5 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Navigation items ──────────────────────────────────────────────────────────
const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '⬡' },
  { id: 'leads', label: 'CRM Leads', icon: '👥' },
  { id: 'contacts', label: 'Contact Forms', icon: '📨' },
  { id: 'issues', label: 'Issues', icon: '🐛' },
  { id: 'features', label: 'Feature Requests', icon: '💡' },
  { id: 'config', label: 'Platform Config', icon: '⚙️' },
];

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  leads: 'CRM Leads',
  contacts: 'Contact Forms',
  issues: 'Bug Reports & Issues',
  features: 'Feature Requests',
  config: 'Platform Configuration',
};

// ─── Root Admin component ──────────────────────────────────────────────────────
export default function AdminHomePage() {
  const [view, setView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderView = () => {
    switch (view) {
      case 'dashboard': return <DashboardView />;
      case 'leads':     return <LeadsView />;
      case 'contacts':  return <ContactsView />;
      case 'issues':    return <FeedbackView feedbackType="fault" />;
      case 'features':  return <FeedbackView feedbackType="feature" />;
      case 'config':    return <ConfigView />;
      default:          return <DashboardView />;
    }
  };

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: colors.bg, fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
      color: colors.textPrimary,
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 220 : 64, flexShrink: 0,
        background: colors.bgCard, borderRight: `1px solid ${colors.border}`,
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.2s ease',
        overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{
          padding: '20px 16px', borderBottom: `1px solid ${colors.border}`,
          display: 'flex', alignItems: 'center', gap: 10, justifyContent: sidebarOpen ? 'space-between' : 'center',
        }}>
          {sidebarOpen && (
            <div>
              <div style={{ fontSize: 15, fontWeight: 900, color: colors.textPrimary, letterSpacing: '-0.03em' }}>Cy-Sec</div>
              <div style={{ fontSize: 10, color: colors.textMuted, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Admin</div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(p => !p)}
            style={{ background: 'none', border: 'none', color: colors.textMuted, cursor: 'pointer', fontSize: 14, padding: 4, lineHeight: 1 }}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ padding: '12px 8px', flex: 1 }}>
          {NAV.map(item => {
            const active = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                title={!sidebarOpen ? item.label : undefined}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: sidebarOpen ? '9px 12px' : '9px 0', justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  fontSize: 13, fontWeight: active ? 700 : 500, marginBottom: 2,
                  background: active ? `${colors.blue}20` : 'transparent',
                  color: active ? colors.cyan : colors.textSecondary,
                  transition: 'all 0.15s',
                  borderLeft: active ? `2px solid ${colors.cyan}` : '2px solid transparent',
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = colors.bgHover; e.currentTarget.style.color = colors.textPrimary; }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = colors.textSecondary; }}}
              >
                <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        {sidebarOpen && (
          <div style={{ padding: '12px 16px', borderTop: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: 10, color: colors.textMuted, lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, color: colors.textSecondary }}>Gary Cocklin</div>
              <div>CISSP-ISSAP · CISM · CRISC</div>
            </div>
          </div>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <div style={{
          padding: '16px 28px', borderBottom: `1px solid ${colors.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: colors.bgCard,
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 900, letterSpacing: '-0.03em', color: colors.textPrimary }}>
              {PAGE_TITLES[view]}
            </h1>
            <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>
              {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
          <a
            href="/"
            style={{
              fontSize: 12, color: colors.textMuted, textDecoration: 'none',
              padding: '6px 12px', borderRadius: 6, border: `1px solid ${colors.border}`,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = colors.textPrimary; e.currentTarget.style.borderColor = colors.blue; }}
            onMouseLeave={e => { e.currentTarget.style.color = colors.textMuted; e.currentTarget.style.borderColor = colors.border; }}
          >
            ← Back to site
          </a>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
          {renderView()}
        </div>
      </div>
    </div>
  );
}
