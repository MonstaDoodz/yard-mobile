import { yardApi } from '@/lib/yard-api';

export type CustomerAccount = {
  accountType: 'customer';
  name: string;
  email: string;
  phone: string;
  active: null;
  priority: false;
  fleetName: null;
  poolAccess: null;
  avatarUrl: string | null;
};

export async function getCustomerAccount() {
  return yardApi<CustomerAccount>('/api/account');
}

export async function updateCustomerAccount(input: {
  fullName: string;
  phone: string;
}) {
  return yardApi<{ success: true }>('/api/account', {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export async function requestAccountDeletion() {
  return yardApi<{ success?: boolean; ok?: boolean }>(
    '/api/account/deletion-request',
    { method: 'POST' },
  );
}
