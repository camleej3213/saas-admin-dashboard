export interface Order {
  id: string;
  customer: string;
  email: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
}

export type TimeRange = '7d' | '30d' | '1y';

export const REVENUE_DATA_7D = [
  { month: 'Mon', revenue: 1200, profit: 800 },
  { month: 'Tue', revenue: 1900, profit: 1100 },
  { month: 'Wed', revenue: 1500, profit: 900 },
  { month: 'Thu', revenue: 2200, profit: 1400 },
  { month: 'Fri', revenue: 3100, profit: 1900 },
  { month: 'Sat', revenue: 2800, profit: 1700 },
  { month: 'Sun', revenue: 2100, profit: 1300 },
];

export const REVENUE_DATA_30D = [
  { month: 'Week 1', revenue: 8400, profit: 5100 },
  { month: 'Week 2', revenue: 11200, profit: 6800 },
  { month: 'Week 3', revenue: 9800, profit: 5900 },
  { month: 'Week 4', revenue: 14500, profit: 8900 },
];

export const REVENUE_DATA_1Y = [
  { month: 'Jan', revenue: 4200, profit: 2400 },
  { month: 'Feb', revenue: 5800, profit: 3200 },
  { month: 'Mar', revenue: 8100, profit: 4500 },
  { month: 'Apr', revenue: 7400, profit: 3900 },
  { month: 'May', revenue: 10200, profit: 6100 },
  { month: 'Jun', revenue: 12500, profit: 7800 },
  { month: 'Jul', revenue: 14800, profit: 9200 },
  { month: 'Aug', revenue: 13900, profit: 8600 },
  { month: 'Sep', revenue: 16100, profit: 10100 },
  { month: 'Oct', revenue: 18400, profit: 11500 },
  { month: 'Nov', revenue: 21000, profit: 13200 },
  { month: 'Dec', revenue: 25400, profit: 15800 },
];

export const RECENT_ORDERS: Order[] = [
  { id: 'ORD-001', customer: 'Sarah Jenkins', email: 'sarah.j@example.com', amount: '$249.00', status: 'Completed', date: '2026-07-26' },
  { id: 'ORD-002', customer: 'Alex Rivera', email: 'arivera@tech.co', amount: '$1,299.00', status: 'Completed', date: '2026-07-26' },
  { id: 'ORD-003', customer: 'David Kim', email: 'dkim99@gmail.com', amount: '$89.50', status: 'Pending', date: '2026-07-25' },
  { id: 'ORD-004', customer: 'Elena Rostova', email: 'elena@designstudio.io', amount: '$450.00', status: 'Completed', date: '2026-07-25' },
  { id: 'ORD-005', customer: 'Marcus Thorne', email: 'm.thorne@startup.com', amount: '$15.00', status: 'Failed', date: '2026-07-24' },
];