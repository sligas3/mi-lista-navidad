'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}

export function AnimatedTabs({ tabs, value, onChange, children }: AnimatedTabsProps) {
  const activeIndex = tabs.findIndex((t) => t.id === value);

  return (
    <div className="w-full">
      <div
        role="tablist"
        className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6 bg-white/5 p-1 rounded-xl relative"
      >
        <motion.div
          layoutId="activeTab"
          className="absolute inset-y-1 bg-white/20 rounded-lg"
          style={{
            left: activeIndex === 0 ? '0.25rem' : '50%',
            right: activeIndex === 0 ? '50%' : '0.25rem',
          }}
          transition={{ type: 'tween', duration: 0.2 }}
          aria-hidden="true"
        />
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={value === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => onChange(tab.id)}
            className={`relative z-10 flex-1 min-h-[44px] py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
              value === tab.id ? 'text-white' : 'text-white/70 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${value}`} aria-labelledby={`tab-${value}`}>
        {children}
      </div>
    </div>
  );
}
