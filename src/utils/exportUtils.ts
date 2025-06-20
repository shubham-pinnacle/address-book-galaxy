import { Contact } from '../types/contact';

export function exportContactsAsCSV(contacts: Contact[]) {
  if (!contacts.length) return;
  const header = ['Name', 'Email', 'Phone', 'Address', 'Favourite'];
  const rows = contacts.map(c => [
    c.name,
    c.email,
    c.phone,
    c.address,
    c.favourite ? 'Yes' : 'No',
  ]);
  const csvContent = [header, ...rows]
    .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'contacts.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export function exportContactsAsVCF(contacts: Contact[]) {
  if (!contacts.length) return;
  const vcfContent = contacts.map(c => `BEGIN:VCARD\nVERSION:3.0\nFN:${c.name}\nEMAIL:${c.email}\nTEL:${c.phone}\nADR:${c.address}\nNOTE:Favourite: ${c.favourite ? 'Yes' : 'No'}\nEND:VCARD`).join('\n');
  const blob = new Blob([vcfContent], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'contacts.vcf';
  a.click();
  URL.revokeObjectURL(url);
}
