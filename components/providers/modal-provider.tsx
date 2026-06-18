"use client"

import React, { useEffect, useState } from 'react';
// import SettingsModal from '../modals/settings-modal';
import { SettingsCommand } from '../shared/settings-command';

const ModalProvider = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <SettingsCommand />
        </>
    );
}

export default ModalProvider;