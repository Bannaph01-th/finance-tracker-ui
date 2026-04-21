import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  private _user = new BehaviorSubject<User | null>(null);
  user$ = this._user.asObservable();

  private _refetchUser = new Subject<void>();
  refetchUser$ = this._refetchUser.asObservable();

  get user() { return this._user.value; }

  requestRefetchUser() {
    this._refetchUser.next();
  }

  patchUser(user: Partial<User>) {
    const current = this._user.value;
    if (!current) return;
    this._user.next({ ...current, ...user });
  }

  setUser(user: User | null) {
    this._user.next(user);
  }

  clear() {
    this._user.next(null);
  }
}