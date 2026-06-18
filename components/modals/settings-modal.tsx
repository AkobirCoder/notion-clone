"use client"

import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from "@/components/ui/dialog";
import { useSettings } from "@/hooks/use-settings";
import React from 'react';
import { ModeToggle } from "../shared/mode-toggle";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Settings2 } from "lucide-react";

const SettingsModal = () => {
    const settings = useSettings();

    const {isOpen, onClose} = settings;

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                <DialogHeader className="border-b pb-3">
                    <DialogTitle className="font-medium">My settings</DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                        <Label>Appearance</Label>
                        <span className="text-[0.8rem] text-accent-foreground">
                            Customize how Notion looks on your device
                        </span>
                    </div>
                    <ModeToggle />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                        <Label>Payments</Label>
                        <span className="text-[0.8rem] text-accent-foreground">
                            Manage your subscription and billing information
                        </span>
                    </div>
                    <Button className="cursor-pointer">
                        <Settings2 />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default SettingsModal;