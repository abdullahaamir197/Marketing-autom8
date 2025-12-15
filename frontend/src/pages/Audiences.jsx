import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, User, Mail, X, Activity } from 'lucide-react';
import api from '../api';

const Audiences = () => {
    const [audiences, setAudiences] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        segment: 'New User'
    });

    useEffect(() => {
        fetchAudiences();
    }, []);

    const fetchAudiences = async () => {
        try {
            const res = await api.get('/audiences');
            setAudiences(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/audiences', formData);
            setFormData({ name: '', email: '', segment: 'New User' });
            setIsModalOpen(false);
            fetchAudiences();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 className="page-title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Audiences</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your contacts and segments.</p>
                </div>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                    <User size={18} style={{ marginRight: '0.5rem' }} />
                    Add Contact
                </button>
            </div>

            <div className="card" style={{ padding: '0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-main)' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Name</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Email</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Segment</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Engagement</th>
                        </tr>
                    </thead>
                    <tbody>
                        {audiences.map((user) => (
                            <tr key={user._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem', fontWeight: 500 }}>{user.name}</td>
                                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{user.email}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '99px',
                                        fontSize: '0.8rem',
                                        background: 'rgba(139, 92, 246, 0.1)',
                                        color: '#c4b5fd'
                                    }}>
                                        {user.segment}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Activity size={14} color="var(--success)" />
                                        <span>{user.engagementScore || 0}%</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {audiences.length === 0 && (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No contacts found. Add some!
                    </div>
                )}
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
                                width: '400px', maxWidth: '90%', padding: '2rem', zIndex: 51
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Add Contact</h3>
                                <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Name</label>
                                    <input
                                        className="input-field"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email</label>
                                    <input
                                        type="email"
                                        className="input-field"
                                        required
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Segment</label>
                                    <select
                                        className="input-field"
                                        value={formData.segment}
                                        onChange={e => setFormData({ ...formData, segment: e.target.value })}
                                    >
                                        <option value="New User">New User</option>
                                        <option value="Premium">Premium</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Add Contact</button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Audiences;
