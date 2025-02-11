'use  ser';

import { DateRange } from 'react-day-picker';
import api from './api-server';
import { cookies } from 'next/headers';

export const StatisticsService = {
  async getStatstics(dateRange: DateRange): Promise<void> {
    try {
      const { data } = await api.get('statistics/getStatistics', {
        params: {
          startDate: dateRange.from,
          endDate: dateRange.to
        }
      });
      console.log(data);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }
};
