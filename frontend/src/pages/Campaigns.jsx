import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Send, Calendar, FileText, X } from 'lucide-react';
import api from '../api';

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        content: '',
        scheduledAt: '',
        status: 'Draft'
    });

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            const res = await api.get('/campaigns');
            setCampaigns(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/campaigns', formData);
            setFormData({ name: '', subject: '', content: '', scheduledAt: '', status: 'Draft' });
            setIsModalOpen(false);
            fetchCampaigns();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 className="page-title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Campaigns</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Manage and schedule your email marketing campaigns.</p>
                </div>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} style={{ marginRight: '0.5rem' }} />
                    New Campaign
                </button>
            </div>

            <div className="grid-list">
                {campaigns.map((camp) => (
                    <motion.div
                        key={camp._id}
                        className="card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span className={`status-badge status-${camp.status.toLowerCase()}`}>{camp.status}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                {new Date(camp.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>{camp.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                            <FileText size={14} />
                            <span>{camp.subject}</span>
                        </div>
                        {camp.scheduledAt && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.9rem' }}>
                                <Calendar size={14} />
                                <span>Scheduled: {new Date(camp.scheduledAt).toLocaleDateString()}</span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            className="modal-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            style={{
                                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                                background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: 50
                            }}
                        />
                        <motion.div
                            className="modal-content glass-panel"
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            style={{
                                position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                width: '500px', maxWidth: '90%', padding: '2rem', zIndex: 51
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Create Campaign</h3>
                                <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Campaign Name</label>
                                    <input
                                        className="input-field"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Summer Sale"
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email Subject</label>
                                    <input
                                        className="input-field"
                                        required
                                        value={formData.subject}
                                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                        placeholder="e.g. 50% Off Everything!"
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Content</label>
                                    <textarea
                                        className="input-field"
                                        required
                                        rows={4}
                                        value={formData.content}
                                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                                        placeholder="Email body content..."
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Status</label>
                                        <select
                                            className="input-field"
                                            value={formData.status}
                                            onChange={e => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option value="Draft">Draft</option>
                                            <option value="Scheduled">Scheduled</option>
                                            <option value="Sent">Sent</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Schedule Date</label>
                                        <input
                                            type="date"
                                            className="input-field"
                                            value={formData.scheduledAt}
                                            onChange={e => setFormData({ ...formData, scheduledAt: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Create Campaign</button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Campaigns;
