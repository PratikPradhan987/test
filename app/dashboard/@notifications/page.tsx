import Card from '@/components/cards';
import Link from 'next/link';

export default function Notifications() {
	return (
		<Card>
			<div>notifications </div>
			<Link href="/dashboard/archived"> archived</Link>
		</Card>
	);
}
