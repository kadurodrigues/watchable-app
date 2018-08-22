import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
    this.users = db.collection('users');
  }

  public createUser({name, email, uid}) {
    return this.users.doc(uid).set({name, email, lists: []});
  }

  public getUser(userUID: string) {
    return this.users.doc(userUID).ref.get();
  }

  public createUserList(userUID: string, listName: string) {
    return this.users.doc(`${userUID}/lists`).set({ name: listName });
  }
}
