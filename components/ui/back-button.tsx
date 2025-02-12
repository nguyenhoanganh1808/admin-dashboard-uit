'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BackButton() {
  return (
    <Button variant="ghost" asChild className="">
      <Link href="/">
        <ArrowLeft className="mr-2 h-4 w-4" />
      </Link>
    </Button>
  );
}
