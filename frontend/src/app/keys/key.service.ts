import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { Key } from "./key.model";
import {environment} from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + '/keys/';

@Injectable({ providedIn: "root" })
export class KeysService {
  private keys: Key[] = [];
  private keysUpdated = new Subject<{keys: Key[], keyCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getKeys(keysPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${keysPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; keys: any, maxKeys: number }>(BACKEND_URL + queryParams)
      .pipe(
        map(keyData => {
          return { keys: keyData.keys.map(key => {
            return {
              title: key.title,
              content: key.content,
              id: key._id,
              imagePath: key.imagePath,
              creator: key.creator
            };
          }), maxKeys: keyData.maxKeys};
        })
      )
      .subscribe(transformedKeyData => {
        this.keys = transformedKeyData.keys;
        this.keysUpdated.next({keys: [...this.keys], keyCount: transformedKeyData.maxKeys});
      });
  }

  getKeyUpdateListener() {
    return this.keysUpdated.asObservable();
  }

  getKey(id: string) {
    return this.http.get<{
      _id: string,
      title: string,
      content: string,
      imagePath: string,
      creator: string
    }>(
      BACKEND_URL + id
    );
  }

  addKey(title: string, content: string, image: File) {
    const keyData = new FormData();
    keyData.append("title", title);
    keyData.append("content", content);
    keyData.append("image", image, title);
    this.http
      .post<{ message: string; key: Key }>(
        BACKEND_URL,
        keyData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updateKey(id: string, title: string, content: string, image: File | string) {
    let keyData: Key | FormData;
    if (typeof image === "object") {
      keyData = new FormData();
      keyData.append("id", id);
      keyData.append("title", title);
      keyData.append("content", content);
      keyData.append("image", image, title);
    } else {
      keyData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null
      };
    }
    this.http
      .put(BACKEND_URL + id, keyData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deleteKey(keyId: string) {
    return this.http
      .delete(BACKEND_URL + keyId);
  }
}
