import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListTodo, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { issues } from '@/lib/data';

export function OverviewCards() {
  const total = issues.length;
  const pending = issues.filter(i => i.status === 'Reported' || i.status === 'In Progress').length;
  const resolved = issues.filter(i => i.status === 'Resolved').length;
  const urgent = issues.filter(i => i.priority === 'Urgent').length;

  const cardData = [
    { title: 'Total Issues', value: total, icon: ListTodo, color: 'text-primary' },
    { title: 'Pending Issues', value: pending, icon: Clock, color: 'text-yellow-500' },
    { title: 'Resolved Issues', value: resolved, icon: CheckCircle, color: 'text-green-500' },
    { title: 'Urgent Priority', value: urgent, icon: AlertTriangle, color: 'text-red-500' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cardData.map(card => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className={`h-4 w-4 text-muted-foreground ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
