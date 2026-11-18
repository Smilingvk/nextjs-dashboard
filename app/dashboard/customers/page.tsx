import { customers, invoices } from '@/app/lib/placeholder-data';
import { formatCurrency } from '@/app/lib/utils';
import { lusitana } from '@/app/ui/fonts';

export default function CustomersPage() {
  const rows = customers.map((customer) => {
    const customerInvoices = invoices.filter((invoice) => invoice.customer_id === customer.id);
    return {
      ...customer,
      invoiceCount: customerInvoices.length,
      paid: customerInvoices
        .filter((invoice) => invoice.status === 'paid')
        .reduce((total, invoice) => total + invoice.amount, 0),
      pending: customerInvoices
        .filter((invoice) => invoice.status === 'pending')
        .reduce((total, invoice) => total + invoice.amount, 0),
    };
  });

  return (
    <main className="space-y-6">
      <header>
        <p className="text-sm font-medium text-blue-600">People</p>
        <h1 className={`${lusitana.className} mt-1 text-3xl font-bold text-gray-900`}>Customers</h1>
        <p className="mt-2 text-sm text-gray-500">Customer activity from the sample invoices.</p>
      </header>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Invoices</th>
                <th className="px-5 py-3 font-medium">Pending</th>
                <th className="px-5 py-3 text-right font-medium">Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((customer) => (
                <tr key={customer.id}>
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                        {customer.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">{customer.invoiceCount}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">{formatCurrency(customer.pending)}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-right font-medium text-gray-900">{formatCurrency(customer.paid)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="border-t border-gray-100 px-5 py-3 text-xs text-gray-500">Demo data · {rows.length} customers</p>
      </div>
    </main>
  );
}
