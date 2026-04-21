import { Component, OnInit } from "@angular/core";
import { ModalService } from "../../../services/modal.service";

import { InputFieldComponent } from "../../form/input/input-field.component";
import { ButtonComponent } from "../../ui/button/button.component";
import { LabelComponent } from "../../form/label/label.component";
import { ModalComponent } from "../../ui/modal/modal.component";
import { UserStateService } from "../../../services/api/common/user-stage-service";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { UserService } from "../../../services/api/user.service";

@Component({
  selector: "app-user-info-card",
  imports: [
    InputFieldComponent,
    ButtonComponent,
    LabelComponent,
    ModalComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./user-info-card.component.html",
  styles: ``,
})
export class UserInfoCardComponent implements OnInit {
  fullName = "";
  email = "";
  limit = 0;

  warning = "";
  error = "";

  constructor(
    private readonly userState: UserStateService,
    private readonly _userService: UserService,
    public modal: ModalService,
  ) {}

  form = new FormGroup({
    full_name: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
    this.userState.user$.subscribe((user) => {
      ((this.fullName = user?.full_name || ""),
        (this.email = user?.email || ""),
        (this.limit = user?.money_limit || 0));

      this.form.patchValue({
        full_name: user?.full_name || "",
        email: user?.email || "",
      });
    });
  }

  isOpen = false;
  openModal() {
    this.isOpen = true;
  }
  closeModal() {
    this.isOpen = false;
    this.error = "";
    this.warning = "";
  }

  async handleSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = "Plaease fill in all required fields";
      return;
    }
    const user = this.userState.user;
    if (!user) return;

    const payload = this.buildDirtyPayload();

    if (Object.keys(payload).length === 0) {
      this.form.markAsPristine();
      this.warning = "have no change";
      return;
    }

    try {
      const res = await this._userService.patchUserProfile(
        user.user_id,
        payload,
      );

      if (res?.status && res?.resultData) {
        this.userState.setUser(res.resultData);
        this.form.markAsPristine();
        this.closeModal();
      }
    } catch (e: any) {
      console.log(e);
      this.error = "Fail to edit profile";
    } finally {
      this.error = "";
      this.warning = "";
    }
  }

  private buildDirtyPayload() {
    const payload: any = {};
    const ctrls = this.form.controls;

    for (const key of Object.keys(ctrls) as Array<keyof typeof ctrls>) {
      const c = ctrls[key];

      if (!c.dirty) continue;

      const v = c.value;
      payload[key] = typeof v === "string" ? v.trim() : v;
    }

    return payload;
  }
}
