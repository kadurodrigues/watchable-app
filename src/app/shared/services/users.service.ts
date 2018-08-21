import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: AngularFirestoreCollection<any>;
  // private usersDoc: AngularFirestoreDocument<any>;

  constructor(private db: AngularFirestore) {
    this.users = db.collection('users');
  }

  public createUser({name, email, uid}) {
    // return this.users.doc(email).set({name, lists: []});
    // return this.users.add({ name, email, lists: [] });
    return this.users.doc(uid).set({name, email, lists: []});
  }

  public getUsers(userUID: string) {
    return this.users.doc(userUID).ref.get();
  }
}
