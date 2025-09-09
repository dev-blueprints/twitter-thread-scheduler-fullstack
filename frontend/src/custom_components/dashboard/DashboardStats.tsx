'use client';
import React, { useEffect, useState } from 'react';
import { 
  DocumentTextIcon, 
  EyeIcon, 
  HeartIcon,
  ArrowTrendingUpIcon 
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Card, CardContent } from '../ui/Card';
import { useThreadStore } from '../../store/threadStore';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  change?: string;
  trend?: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, change, trend }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-8 w-8 text-primary-600" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{value}</div>
              {change && (
                <div className={clsx(
                  'ml-2 flex items-baseline text-sm font-semibold',
                  trend === 'up' ? 'text-green-600' : 'text-red-600'
                )}>
                  <ArrowTrendingUpIcon className={clsx(
                    'h-4 w-4 flex-shrink-0 self-center',
                    trend === 'down' && 'transform rotate-180'
                  )} />
                  <span className="sr-only">{trend === 'up' ? 'Increased' : 'Decreased'} by</span>
                  {change}
                </div>
              )}
            </dd>
          </dl>
        </div>
      </div>
    </CardContent>
  </Card>
);

const DashboardStats: React.FC = () => {
  const { threads, fetchThreads } = useThreadStore();
  const [stats, setStats] = useState({
    totalThreads: 0,
    publishedThreads: 0,
    totalViews: 0,
    totalEngagement: 0,
  });

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  useEffect(() => {
    if (threads.length > 0) {
      const published = threads.filter(thread => thread.status === 'published').length;
      const totalViews = threads.reduce((sum, thread) => 
        sum + (thread.engagement_data?.views || 0), 0
      );
      const totalLikes = threads.reduce((sum, thread) => 
        sum + (thread.engagement_data?.likes || 0), 0
      );

      setStats({
        totalThreads: threads.length,
        publishedThreads: published,
        totalViews,
        totalEngagement: totalLikes,
      });
    }
  }, [threads]);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Threads"
        value={stats.totalThreads}
        icon={DocumentTextIcon}
      />
      
      <StatCard
        title="Published"
        value={stats.publishedThreads}
        icon={EyeIcon}
      />
      
      <StatCard
        title="Total Views"
        value={stats.totalViews.toLocaleString()}
        icon={ArrowTrendingUpIcon}
      />
      
      <StatCard
        title="Total Likes"
        value={stats.totalEngagement.toLocaleString()}
        icon={HeartIcon}
      />
    </div>
  );
};

export default DashboardStats;