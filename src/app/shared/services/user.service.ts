import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Router } from '@angular/router';
import { IAuthTokenUser } from '../../../../server/mongo/interfaces/users/auth.model';
import { map, catchError } from 'rxjs/operators';
import { IUserSafe} from 'server/mongo/interfaces/users/user.safe.interface'

@Injectable({ providedIn: 'root' })
export class AuthUserService {

    private _user = new BehaviorSubject<IUserSafe>(this.getUserFromLocal());

    constructor(
        private http: HttpClient,
        private authService: NbAuthService,
        private _router: Router,
    ) {
    }

    getUserFromLocal() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // console.log('Current User', currentUser);
        if (!currentUser) {
            return this.getUserFromToken()
        }
        else {
            return currentUser
        }
    }

    getUserFromToken() {
        return this.authService.onTokenChange()
            .subscribe((token: NbAuthJWTToken) => {
                if (token.isValid()) {
                    const authUser = token.getPayload();
                    // console.log(authUser);
                    this._user.next(authUser);
                    this.getHttpUser(authUser);
                    return authUser
                } else {
                    // this._router.navigate(['/auth/logout']);
                }
            }, (error) => {
                console.log(error);
                return error
            });
    }

    get user() {
        return this._user
    }

    setUserFromLogin(authUser): Observable<IUserSafe> {
        this._user.next(authUser);
        this.getHttpUser(authUser);
        return this._user.asObservable();
    }

    getHttpUser(auser: IAuthTokenUser) {
        // console.log('Getting HTTP User');
        return this.http.get<IUserSafe>(`/api/users/${auser._id}`)
            .pipe(
                map((user) => {
                    const currentUser = JSON.stringify(user);
                    localStorage.setItem('currentUser', currentUser);
                    this._user.next(user);
                    return user as IUserSafe;
                })
            );
    }

    updateUserFromResponse(user) {
        const currentUser = JSON.stringify(user);
        localStorage.setItem('currentUser', currentUser);
        this._user.next(user);
      }

    updateUser(user): Observable<IUserSafe> {
        return this.http.put<IUserSafe>(`/api/users/${user._id}`, user)
            .pipe(
                map((updatedUser) => {
                    const currentUser = JSON.stringify(updatedUser);
                    localStorage.setItem('currentUser', currentUser);
                    this._user.next(updatedUser);
                    return updatedUser
                })
            );
    }

    updateUserNextOnly(user) {
        console.log('Updating User');
        this._user.next(user);
        return this._user
    }

    public uploadProfile(file: File, _id: string): Subject<any> {
        // this will be the our resulting map
        // const status: { [key: string]: { progress: Observable<number> } } = {};
        // create a new multipart-form for every file
        const formData: FormData = new FormData();
        formData.append('file', file);
        let url: string
        // console.log('Location', location);
        url = `${location.origin}/api/users/profile/${_id}`;
        // create a http-post request and pass the form http://localhost:4081
        // tell it to report the upload progress
        const req = new HttpRequest('PUT', url, formData, {
            reportProgress: true
        });

        // create a new progress-subject for every file
        const progress = new Subject<any>();

        // send the http-request and subscribe for progress-updates

        const startTime = new Date().getTime();
        this.http.request(req).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                // calculate the progress percentage

                const percentDone = Math.round((100 * event.loaded) / event.total);
                // pass the percentage into the progress-stream
                progress.next(percentDone);
            } else if (event instanceof HttpResponse) {
                // Close the progress-stream if we get an answer form the API
                // The upload is complete
                progress.next(event.body)
                progress.complete();
            }
        }, (error) => {
            progress.error(error);
        });
        return progress
        // Save every progress-observable in a map of all observables
        // status[file.name] = {
        //     progress: progress.asObservable()
        // };

        // return the map of progress.observables
    }

}
