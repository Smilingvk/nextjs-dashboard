import { invoices, customers } from '@/app/lib/placeholder-data';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';
import { lusitana } from '@/app/ui/fonts';

export default function InvoicesPage() {
  const rows = [...invoices]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((invoice) => ({
      ...invoice,
      customer: customers.find((customer) => customer.id === invoice.customer_id),
    }));

  return (
    <main className="space-y-6">
      <header>
        <p className="text-sm font-medium text-blue-600">Billing</p>
        <h1 className={`${lusitana.className} mt-1 text-3xl font-bold text-gray-900`}>Invoices</h1>
        <p className="mt-2 text-sm text-gray-500">Browse the sample invoices in this dashboard.</p>
      </header>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((invoice) => (
                <tr key={`${invoice.customer_id}-${invoice.date}`}>
                  <td className="whitespace-nowrap px-5 py-4">
                    <p className="font-medium text-gray-900">{invoice.customer?.name ?? 'Customer'}</p>
                    <p className="text-xs text-gray-500">{invoice.customer?.email}</p>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">{formatDateToLocal(invoice.date)}</td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${invoice.status === 'paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {invoice.status === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-right font-medium text-gray-900">{formatCurrency(invoice.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="border-t border-gray-100 px-5 py-3 text-xs text-gray-500">Demo data · {rows.length} invoices</p>
      </div>
    </main>
  );
}
