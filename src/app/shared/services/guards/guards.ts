import { inject } from "@angular/core";
import {
  Router,
  type CanActivateFn,
  type UrlTree
} from "@angular/router";
import { TokenStorageService } from "../api/common/token-storage-service";

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router: Router = inject(Router);
  const tokenStorage: TokenStorageService =
    inject(TokenStorageService);

  const isLoggedIn: boolean = tokenStorage.hasSession();
  const inAuthPath: boolean =
    state.url.startsWith("/sign-in")
  // not signed in will redirect to sign-in
  if (!isLoggedIn && !inAuthPath) {
    return router.createUrlTree(["/sign-in"]);
  }

  if (isLoggedIn && inAuthPath) {
    return router.createUrlTree(["/home-page"]);
  }

  return true;
};