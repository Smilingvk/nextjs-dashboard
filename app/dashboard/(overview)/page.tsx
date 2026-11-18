import Link from 'next/link';
import { ArrowRightIcon, BanknotesIcon, ClockIcon, UserGroupIcon, InboxIcon } from '@heroicons/react/24/outline';
import { customers, invoices, revenue } from '@/app/lib/placeholder-data';
import { formatCurrency } from '@/app/lib/utils';
import { lusitana } from '@/app/ui/fonts';

const paidTotal = invoices
  .filter((invoice) => invoice.status === 'paid')
  .reduce((total, invoice) => total + invoice.amount, 0);
const pendingTotal = invoices
  .filter((invoice) => invoice.status === 'pending')
  .reduce((total, invoice) => total + invoice.amount, 0);

const cards = [
  { label: 'Collected', value: formatCurrency(paidTotal), Icon: BanknotesIcon },
  { label: 'Pending', value: formatCurrency(pendingTotal), Icon: ClockIcon },
  { label: 'Total invoices', value: invoices.length, Icon: InboxIcon },
  { label: 'Total customers', value: customers.length, Icon: UserGroupIcon },
];

export default function DashboardPage() {
  const recentInvoices = [...invoices]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)
    .map((invoice) => ({
      ...invoice,
      customer: customers.find((customer) => customer.id === invoice.customer_id),
    }));
  const maxRevenue = Math.max(...revenue.map((item) => item.revenue));

  return (
    <main className="space-y-8">
      <header>
        <p className="text-sm font-medium text-blue-600">Overview</p>
        <h1 className={`${lusitana.className} mt-1 text-3xl font-bold text-gray-900`}>
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          A quick look at your invoices, customers, and revenue.
        </p>
      </header>

      <section aria-label="Business summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, Icon }) => (
          <article key={label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-600">{label}</h2>
              <span className="rounded-lg bg-blue-50 p-2 text-blue-700">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
            </div>
            <p className={`${lusitana.className} mt-4 text-3xl font-semibold text-gray-900`}>{value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-5">
        <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-3">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className={`${lusitana.className} text-xl font-semibold text-gray-900`}>Revenue</h2>
              <p className="mt-1 text-sm text-gray-500">Monthly revenue for the last year</p>
            </div>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">Demo data</span>
          </div>
          <div className="flex h-56 items-end gap-2 sm:gap-3" role="img" aria-label="Bar chart of monthly revenue">
            {revenue.map((item) => (
              <div key={item.month} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
                <div
                  title={`${item.month}: ${formatCurrency(item.revenue)}`}
                  className="w-full max-w-10 rounded-t-md bg-blue-500 transition-colors hover:bg-blue-700"
                  style={{ height: `${Math.max(8, (item.revenue / maxRevenue) * 100)}%` }}
                />
                <span className="text-[10px] text-gray-500 sm:text-xs">{item.month}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className={`${lusitana.className} text-xl font-semibold text-gray-900`}>Latest invoices</h2>
              <p className="mt-1 text-sm text-gray-500">Recent activity</p>
            </div>
            <Link href="/dashboard/invoices" aria-label="View all invoices" className="rounded-full p-2 text-blue-700 hover:bg-blue-50">
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
          <ul className="divide-y divide-gray-100">
            {recentInvoices.map((invoice) => (
              <li key={`${invoice.customer_id}-${invoice.date}`} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900">{invoice.customer?.name ?? 'Customer'}</p>
                  <p className="text-xs text-gray-500">{invoice.date}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold text-gray-900">{formatCurrency(invoice.amount)}</p>
                  <p className={`text-xs capitalize ${invoice.status === 'paid' ? 'text-emerald-700' : 'text-amber-700'}`}>{invoice.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
