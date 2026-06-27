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
import React, { useState } from 'react';
import { ModeToggle } from "../shared/mode-toggle";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Settings2 } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

const SettingsModal = () => {
    const { user } = useUser();

    const settings = useSettings();

    const {isOpen, onClose} = settings;

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async () => {
        setIsSubmitting(true);

        try {
            const {data} = await axios.post('/api/stripe/manage', {
                email: user?.emailAddresses[0].emailAddress,
            });

            if (!data.status) {
                setIsSubmitting(false);

                toast.error("You are not subscribed to any plan.");

                return;
            }

            // console.log(data);

            window.open(data.url, "_self");

            setIsSubmitting(false);
        } catch {
            setIsSubmitting(false);

            toast.error("Something went wrong. Please try again.");
        }
    }

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
                    <Button 
                        className="cursor-pointer" 
                        onClick={onSubmit}
                    >
                        {
                            isSubmitting ? (
                                <Spinner />
                            ) : (
                                <Settings2 />
                            )
                        }
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default SettingsModal;