import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../models/user.model';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'wb-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.scss']
})
export class UserListsComponent implements OnInit {
  public listNameForm: FormGroup;
  public listName: FormControl;
  public userLists: Array<any>;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }

  ngOnInit() {
    this.listName = this.formBuilder.control(null, Validators.required);
    this.listNameForm = this.formBuilder.group({ listName: this.listName });

    this.userLists = this.data.lists;
  }

  public createList() {
    console.log(this.listName.value);
  }

}
