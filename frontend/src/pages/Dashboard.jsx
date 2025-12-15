import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Mail, Users, MousePointerClick } from 'lucide-react';
import api from '../api';
import './Dashboard.css';

const StatCard = ({ title, value, icon: Icon, delay }) => (
    <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="stat-label">{title}</span>
            <Icon size={20} color="var(--primary)" />
        </div>
        <div className="stat-value">{value}</div>
    </motion.div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        campaigns: 0,
        activeAutomations: 3, // Mock default
        totalAudience: 0,
        engagementRate: '24%'
    });
    const [recentCampaigns, setRecentCampaigns] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [campRes, audRes] = await Promise.all([
                    api.get('/campaigns'),
                    api.get('/audiences')
                ]);
                setStats(prev => ({
                    ...prev,
                    campaigns: campRes.data.length,
                    totalAudience: audRes.data.length
                }));
                setRecentCampaigns(campRes.data.slice(0, 5));
            } catch (e) {
                console.error("Failed to fetch stats", e);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className="dashboard-grid">
                <StatCard title="Total Campaigns" value={stats.campaigns} icon={Mail} delay={0} />
                <StatCard title="Total Audience" value={stats.totalAudience} icon={Users} delay={0.1} />
                <StatCard title="Active Automations" value={stats.activeAutomations} icon={Activity} delay={0.2} />
                <StatCard title="Engagement Rate" value={stats.engagementRate} icon={MousePointerClick} delay={0.3} />
            </div>

            <motion.div
                className="recent-campaigns"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <h3 className="section-title">Recent Campaigns</h3>
                <div className="card">
                    <div className="campaign-list">
                        {recentCampaigns.length === 0 ? (
                            <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
                                No campaigns found. Start by creating one!
                            </div>
                        ) : (
                            recentCampaigns.map(camp => (
                                <div key={camp._id} className="campaign-item">
                                    <div>
                                        <div style={{ fontWeight: 600 }}>{camp.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{camp.subject}</div>
                                    </div>
                                    <span className={`status-badge status-${camp.status.toLowerCase()}`}>{camp.status}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
