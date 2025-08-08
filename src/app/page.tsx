// Redirect root to /vault
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/vault');
}
