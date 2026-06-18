import { useSettings } from '@/hooks/use-settings';
import React, { useEffect } from 'react';
import SettingsModal from '../modals/settings-modal';

export const SettingsCommand = () => {
    const {onToggle} = useSettings();

    useEffect(() => {
            const down = (event: KeyboardEvent) => {
                if (event.key === "m" && (event.metaKey || event.ctrlKey)) {
                    event.preventDefault();
    
                    onToggle();
                }
            }
    
            document.addEventListener("keydown", down);
    
            return () => document.removeEventListener("keydown", down);
        }, [onToggle]);

    return (
        <SettingsModal />
    );
}