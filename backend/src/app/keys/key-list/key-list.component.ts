import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from "rxjs";

import { Key } from '../key.model';
import {KeysService} from "../key.service";
import {PageEvent} from "@angular/material/paginator";
import {AuthService} from "../../auth/auth.service";
@Component({
  selector: 'app-key-list',
  templateUrl: './key-list.component.html',
  styleUrls: ['./key-list.component.css']
})

export class KeyListComponent implements OnInit, OnDestroy {
  // keys = [
  //   {title: 'Key #1', content: 'Mala Škoda'},
  //   {title: 'Key #2', content: 'Velika Škoda'},
  //   {title: 'Key #3', content: 'KP DC'}
  // ];
keys: Key[] = [];
isLoading = false;
totalKeys = 0;
keysPerPage = 2;
currentPage = 1;
pageSizeOptions = [1, 2, 5, 10];
userIsAuthenticated = false;
userId: string;
private keysSub: Subscription;
private authStatusSub: Subscription;

  constructor(public keysService: KeysService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.keysService.getKeys(this.keysPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.keysSub = this.keysService
      .getKeyUpdateListener()
      .subscribe((keyData: {keys: Key[], keyCount: number}) => {
        this.isLoading = false;
        this.totalKeys = keyData.keyCount;
        this.keys = keyData.keys;
        });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.keysPerPage = pageData.pageSize;
    this.keysService.getKeys(this.keysPerPage, this.currentPage);
  }

  onDelete(keyId: string) {
    this.isLoading = true;
    this.keysService.deleteKey(keyId).subscribe(() => {
      this.keysService.getKeys(this.keysPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.keysSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
