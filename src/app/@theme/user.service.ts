import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Router } from '@angular/router';
import { IAuthTokenUser } from '../@core/auth/models/auth.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthUserService {
    private currentUser: IAuthTokenUser
    constructor(
        private http: HttpClient,
        private authService: NbAuthService,
        private _router: Router,
    ) {
    }

    private async getAuthandUser() {
        try {
            const authUser = this.authService.getToken().toPromise()
            this.getUser(authUser)
                .subscribe((user) => {
                    return Promise.resolve(user)
                })
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    }

    getUser(authUser): Observable<IAuthTokenUser> {
        if (authUser.id) {
            return this.http.get<IAuthTokenUser>(`/api/users/${authUser.id}`)
                .pipe(
                    map((user) => {
                        const currentUser = JSON.stringify(user);
                        localStorage.setItem('currentUser', currentUser);
                        this.currentUser = user;
                        return user as IAuthTokenUser;
                    })
                );
        } else {
            return
        }
    }

    async getUserFromLocal() {
        const stringUser = localStorage.getItem('currentUser');
        const user = JSON.parse(stringUser);
        return user as IAuthTokenUser;
        // if (stringUser) {
        //     try {
        //         const user = JSON.parse(stringUser);
        //         return user as IAuthTokenUser;
        //     } catch (error) {

        //     }
        // } else {
        //     await this.getAuthandUser()
        //     this.getUserFromLocal()
        // }
    }

    private clearUser() {
        localStorage.removeItem('currentUser');
    }

}
