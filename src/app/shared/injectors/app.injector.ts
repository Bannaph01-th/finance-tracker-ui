import { Injector } from "@angular/core";

let appInjector: Injector | null = null;

// set injector once at app bootstrap
export function setAppInjector(injector: Injector): void {
    appInjector = injector;
}

// get any service outside Angular context
export function getAppInjector(): Injector {
    if (!appInjector) {
        throw new Error("AppInjector is not set");
    }
    return appInjector;
}
