import Card from '@/components/cards';
import Link from 'next/link';

export default function ArchivedNotifications() {
	return (
		<Card>
			<div>archived </div>
			<Link href="/dashboard"> go back</Link>
		</Card>
	);
}
