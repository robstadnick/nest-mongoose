import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AuthUserService } from 'src/app/shared/services/user.service';
import { IUserSafe } from 'server/mongo/interfaces/users/user.safe.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(
        private http: HttpClient,
        private _authUserService: AuthUserService
    ) { }

    verifyEmail(user: IUserSafe): Observable<any> {
        return this.http.put<any>('/api/auth/verify/email', user)
            .pipe(
                map((safeUser) => {
                    return safeUser as any;
                })
            );
    }

    verifyConfirmEmail(user, token): Observable<IUserSafe> {
        return this.http.put<IUserSafe>('/api/auth/verify/email/confirm', { user, token })
            .pipe(
                map((safeUser) => {
                    return safeUser as IUserSafe;
                })
            );
    }

    verifyConfirmEmailAuto(token): Observable<IUserSafe> {
        return this.http.put<IUserSafe>('/api/auth/verify/email/confirm/auto', { token })
            .pipe(
                map((safeUser) => {
                    return safeUser as IUserSafe;
                })
            );
    }

    signUp(user): Observable<any> {
        return this.http.post<any>(`/api/auth/signup`, user)
            .pipe(
                map((user) => {
                    return user
                })
            );
    }
}
