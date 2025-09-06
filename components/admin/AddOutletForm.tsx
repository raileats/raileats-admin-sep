// components/admin/AddOutletForm.tsx
'use client';

import React, { useState } from 'react';

type Props = {
  onClose: () => void;
};

export default function AddOutletForm({ onClose }: Props) {
  const [name, setName] = useState('');
  const [station, setStation] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!name.trim()) {
      setError('Please provide a name for the outlet.');
      return;
    }
    setLoading(true);
    try {
      const body = { name: name.trim(), station: station.trim(), contact: contact.trim() };
      const res = await fetch('/api/admin/outlets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Failed to create outlet');
      }

      setSuccess('Outlet created successfully.');
      setName('');
      setStation('');
      setContact('');
      // optional: close automatically after success
      setTimeout(() => {
        onClose();
      }, 900);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
