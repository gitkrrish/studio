'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { issueCategories } from '@/lib/data';
import type { Issue } from '@/lib/types';
import { useEffect, useState } from 'react';
import { getIssues } from '@/services/issue-service-client';


export function CategoryChart() {
  const [data, setData] = useState<{name: string, total: number}[]>([]);

  useEffect(() => {
    async function loadChartData() {
        const issues = await getIssues();
        const chartData = issueCategories.map(category => ({
            name: category,
            total: issues.filter(issue => issue.category === category).length,
        }));
        setData(chartData);
    }
    loadChartData();
  }, [])


  return (
    <Card>
      <CardHeader>
        <CardTitle>Issues by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={value => `${value}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
              }}
            />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
