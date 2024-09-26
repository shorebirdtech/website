import { motion } from 'framer-motion';

import { config } from '../config';
import { CheckArrowIcon } from '../assets/icons/CheckArrowIcon';
import { useState } from 'react';

interface Feature {
  title: string;
  tooltip?: string;
  free?: string;
  pro?: string;
  teams?: string;
  enterprise?: string;
}

const features: Feature[] = [
    { title: 'Unlimited Apps, Releases and Patches', free: '✓', pro: '✓', teams: '✓', enterprise: '✓' },
    { title: 'Console', free: '✓', pro: '✓', teams: '✓', enterprise: '✓' },
    { title: 'Rollbacks', free: '✓', pro: '✓', teams: '✓', enterprise: '✓' },
    { title: 'Notifications', free: '✓', pro: '✓', teams: '✓', enterprise: '✓' },
    { title: 'Staging', free: '✓', pro: '✓', teams: '✓', enterprise: '✓' },
    { title: 'Storage', free: '1 Month', pro: '1 Year', teams: 'Unlimited', enterprise: 'Unlimited' },
    { title: 'Analytics', free: 'Basic', pro: 'Basic', teams: 'Advanced', enterprise: 'Advanced' },
    { title: 'Support', free: 'Community', pro: 'Semi-Private', teams: 'Private', enterprise: 'Personal' },
    { title: 'Assets', free: '1mb', pro: '10mb', teams: 'Unlimited', enterprise: 'Unlimited' },
    { title: 'Organizations', pro: 'Basic', teams: 'Advanced', enterprise: 'Custom' },
    { title: 'User Roles', free: 'Admin, Developer', pro: 'Admin, Developer', teams: 'Admin, Developer, Billing, View-Only', enterprise: 'Custom' },
    { title: 'Annual Billing', teams: '✓', enterprise: '✓' },
    { title: 'White-Label Support', teams: '✓', enterprise: '✓' },
    { title: 'Signed Patches', pro: '✓', teams: '✓', enterprise: '✓' },
    { title: 'SAML', enterprise: 'Custom' },
];

export const PricingDetails = () => {
  return (
    <section className="relative flex w-screen justify-center bg-shorebirdBg2">
      <div className="absolute -top-16" id="details" />
      <div className="container mx-auto px-4">
        <table>
            <thead>
              <tr>
                <th className="text-left">Feature</th>
                <th className="text-left">Free</th>
                <th className="text-left">Pro</th>
                <th className="text-left">Teams</th>
                <th className="text-left">Enterprise</th>
              </tr>
            </thead>
            <tbody>
                {features.map((feature) => (
                    <FeatureRow key={feature.title} {...feature} />
                ))}
            </tbody>
        </table>
      </div>
    </section>
  );
};

function FeatureRow(feature: Feature) {
    return (
      <tr>
        <td>{feature.title}</td>
        <td>{feature.free}</td>
        <td>{feature.pro}</td>
        <td>{feature.teams}</td>
        <td>{feature.enterprise}</td>
      </tr>
    );
  }
  