'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@/components/ui/card';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import {
  Activity,
  CreditCard,
  DollarSign,
  StickyNote,
  ThumbsUp,
  User,
  Users
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Overview } from './overview';

import { debounce } from 'lodash';
import StatCard from './stat-card';
import apiClient from '@/services/api-client';
import { Statistics } from '@/types/db';
import { SkeletonCard } from './skeleton-card';
import { EngagementDistribution } from './engagement-distribution';

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 1),
    to: new Date()
  });
  const [statistics, setStatistics] = useState<Statistics>({
    totalComments: 0,
    totalLikes: 0,
    totalPosts: 0
  });
  const [postStatistics, setPostStatistics] = useState<
    Record<string, number> | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userCount, setUserCount] = useState({
    student: 0,
    lecturer: 0
  });

  const fetchStatistics = useCallback(
    debounce(async (dateRange: DateRange | undefined) => {
      if (!dateRange || !dateRange.from || !dateRange.to) return;
      setLoading(true);
      setError(null);

      try {
        const [
          statisticsRes,
          studentCountRes,
          lecturerCountRes,
          postStatisticsRes
        ] = await Promise.all([
          apiClient.get('/statistics/getStatistics', {
            params: {
              startDate: dateRange.from.toISOString(),
              endDate: dateRange.to.toISOString()
            }
          }),
          apiClient.get('/users/getCountUsers', {
            params: {
              role: 'STUDENT'
            }
          }),
          apiClient.get('/users/getCountUsers', {
            params: {
              role: 'LECTURER'
            }
          }),
          apiClient.get('/statistics/getPostsStatistics')
        ]);

        setStatistics(statisticsRes.data.body);
        setUserCount({
          lecturer: lecturerCountRes.data.body,
          student: studentCountRes.data.body
        });

        setPostStatistics(postStatisticsRes.data);
      } catch (err) {
        console.log('err: ', err);
        setError('Failed to load statistics. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 500), // Debounce API calls to prevent too many requests
    []
  );

  useEffect(() => {
    fetchStatistics(selectedDate);
  }, [selectedDate, fetchStatistics]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            <p>Dashboard</p>
            <div className="flex space-x-4">
              <DateRangePicker
                date={selectedDate}
                setDateAction={setSelectedDate}
              />
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
            <StatCard
              title="Total Posts"
              value={statistics.totalPosts.toString()}
              percentage=""
              icon={<StickyNote className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Total Students"
              value={userCount.student.toString()}
              percentage=""
              icon={<User className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Total Lecturer"
              value={userCount.lecturer.toString()}
              percentage=""
              icon={<User className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Post Overview</CardTitle>
              <CardDescription>
                Posts distribution across different topics.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview
                chartData={
                  postStatistics
                    ? Object.entries(postStatistics).map(([topic, post]) => ({
                        topic,
                        post
                      }))
                    : []
                }
              />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Engagement Distribution</CardTitle>
              <CardDescription>
                Percentage distribution of posts, comments, and likes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EngagementDistribution
                chartData={[
                  {
                    name: 'Posts',
                    count: statistics.totalPosts,
                    fill: 'var(--color-posts)'
                  },
                  {
                    name: 'Comments',
                    count: statistics.totalComments,
                    fill: 'var(--color-comments)'
                  },
                  {
                    name: 'Likes',
                    count: statistics.totalLikes,
                    fill: 'var(--color-likes)'
                  }
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
