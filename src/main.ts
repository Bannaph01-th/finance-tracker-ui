import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import { register as registerSwiperElements } from "swiper/element/bundle";
import { setAppInjector } from "./app/shared/services/injectors/app.injector";

registerSwiperElements();

bootstrapApplication(AppComponent, appConfig)
  .then((appRef) => {
    setAppInjector(appRef.injector);
  })
  .catch((err: unknown) => console.error(err));
