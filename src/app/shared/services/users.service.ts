import { Injectable } from '@angular/core';
import { 
  AngularFirestore,
  AngularFirestoreCollection, 
  AngularFirestoreDocument 
} from 'angularfire2/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: AngularFirestoreCollection<any>;
  private usersDoc: AngularFirestoreDocument<any>;

  constructor(private db: AngularFirestore) {
    this.users = db.collection('users');
  }

  public createUser(uid, name) {
    return this.users.add({ uid, name })
  }
}
