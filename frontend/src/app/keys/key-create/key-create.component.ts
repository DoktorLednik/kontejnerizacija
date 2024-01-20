import {Component, OnDestroy, OnInit} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { KeysService } from "../key.service";
import { Key } from "../key.model";
import { mimeType } from "./mime-type.validator";
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: "app-key-create",
  templateUrl: "./key-create.component.html",
  styleUrls: ["./key-create.component.css"]
})
export class KeyCreateComponent implements OnInit, OnDestroy {
  enteredTitle = "";
  enteredContent = "";
  key: Key;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private keyId: string;
  private authStatusSub: Subscription;

  constructor(
    public keysService: KeysService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false
      }
    );
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("keyId")) {
        this.mode = "edit";
        this.keyId = paramMap.get("keyId");
        this.isLoading = true;
        this.keysService.getKey(this.keyId).subscribe(keyData => {
          this.isLoading = false;
          this.key = {
            id: keyData._id,
            title: keyData.title,
            content: keyData.content,
            imagePath: keyData.imagePath,
            creator: keyData.creator
          };
          this.form.setValue({
            title: this.key.title,
            content: this.key.content,
            image: this.key.imagePath
          });
        });
      } else {
        this.mode = "create";
        this.keyId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveKey() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.keysService.addKey(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.keysService.updateKey(
        this.keyId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
