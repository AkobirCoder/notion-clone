import Image from 'next/image';
import React from 'react';
import { PricingCard } from './pricing-card';

const teams = [
    '/teams/1.svg',
    '/teams/2.svg',
    '/teams/3.svg',
    '/teams/4.svg',
    '/teams/5.svg',
];

const cards = [
	{
		title: 'Free',
		subtitle: 'For organizing every corner of your work & life.',
		options:
			'Collaborative workspace, Integrate with Slack, GitHub & more, Basic page analytics, 7 day page history, Invite 10 guests',
		price: 'Free',
	},
	{
		title: 'Plus',
		subtitle: 'A place for small groups to plan & get organized.',
		options:
			'Unlimited blocks for teams, Unlimited file uploads, 30 day page history, Invite 100 guests',
		price: '8',
		priceId: 'price_1QS4yl4IqGSzSUOJuRZqNE2B',
	},
	{
		title: 'Business',
		subtitle: 'For companies using Notion to connect several teams & tools.',
		options:
			'SAML SSO, Private teamspaces, Bulk PDF export, Advanced page analytics, 90 day page history, Invite 250 guests',
		price: '15',
		priceId: 'price_1QS4zK4IqGSzSUOJsaizL0gg',
	},
];

export const Pricing = () => {
    return (
        <div className='max-w-7xl mx-auto container'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold max-w-2xl'>
                One tool for your whole company. Free for teams to try.
            </h1>
            <p className='uppercase opacity-70'>
                TRUSTED BY TEAMS AT
            </p>

            <div className='flex gap-4 flex-row flex-wrap mt-4'>
                {
                    teams.map((team, index) => {
                        return (
                            <Image
                                key={index}
                                src={team}
                                alt='Team image'
                                width={50}
                                height={50}
                            />
                        );
                    })
                }
            </div>

            <div className='mt-6'>
                <div className='lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 space-y-8'>
                    {
                        cards.map((card, index) => {
                            return (
                                <PricingCard 
                                    key={index}
                                    {...card}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}