'use client';

import { Textarea } from '@/components/ui/textarea';

import { banUser, unbanUser } from './actions';

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Lecturer, Student } from '@/types/db';
import { useActionState } from 'react';

export default function FormChangeUserStatus({
  user
}: {
  user: Student | Lecturer;
}) {
  const { accountStatus } = user;
  const [banState, banUserAction, banPending] = useActionState(banUser, {
    message: ''
  });
  const [unbanState, unbanUserAction, unbanPending] = useActionState(
    unbanUser,
    {
      message: ''
    }
  );

  return accountStatus === 'ACTIVE' ? (
    <Dialog>
      <DialogTrigger className="text-sm hover:bg-slate-200 w-full text-left rounded-md py-2 pl-3">
        Ban
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-5">
          <DialogTitle>Reason ban this user?</DialogTitle>
          <form className="space-y-5" action={banUserAction}>
            <input type="hidden" name="id" value={user.id} required />
            <Textarea name="reason" />
            {banState?.message && (
              <p className="text-red-500">{banState.message}</p>
            )}
            <Button type="submit" disabled={banPending}>
              {banPending && <Loader2 className="animate-spin" />}
              Ban
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ) : (
    <Dialog>
      <DialogTrigger className="text-sm hover:bg-slate-200 w-full text-left rounded-md py-2 pl-3">
        Unban
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-5">
          <DialogTitle>Reason unban this user?</DialogTitle>
          <form className="space-y-5" action={unbanUserAction}>
            <input type="hidden" name="id" value={user.id} required />
            <Textarea name="reason" />
            {unbanState.message && (
              <p className="text-red-500">{unbanState.message}</p>
            )}
            <Button type="submit" disabled={unbanPending}>
              {unbanPending && <Loader2 className="animate-spin" />}
              Unban
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
