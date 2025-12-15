import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, PlayCircle, PauseCircle } from 'lucide-react';
import api from '../api';

const Automations = () => {
    const [automations, setAutomations] = useState([]);

    useEffect(() => {
        fetchAutomations();
    }, []);

    const fetchAutomations = async () => {
        try {
            const res = await api.get('/automations');
            setAutomations(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 className="page-title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Automations</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Manage automated workflows and triggers.</p>
                </div>
                <button className="btn-primary">
                    <Zap size={18} style={{ marginRight: '0.5rem' }} />
                    New Workflow
                </button>
            </div>

            <div className="grid-list">
                {automations.map((auto) => (
                    <motion.div
                        key={auto._id}
                        className="card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                color: auto.active ? 'var(--success)' : 'var(--text-muted)',
                                fontWeight: 600, fontSize: '0.85rem'
                            }}>
                                {auto.active ? <PlayCircle size={16} /> : <PauseCircle size={16} />}
                                {auto.active ? 'Active' : 'Paused'}
                            </div>
                        </div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>{auto.name}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                            Trigger: <span style={{ color: 'var(--text-main)' }}>{auto.trigger}</span>
                        </p>

                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</div>
                            {auto.actions.map((action, idx) => (
                                <div key={idx} style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>• {action}</div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
            {automations.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No automations found. Create one!
                </div>
            )}
        </div>
    );
};

export default Automations;
