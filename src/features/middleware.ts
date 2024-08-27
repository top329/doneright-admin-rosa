import { AnyAction, Middleware } from "redux";

export const rtkQueryLoadingHandler: Middleware =
  () => (next) => (action: AnyAction) => {
    if (action?.payload?.originalStatus === 401) {
      typeof window !== "undefined" && window.location.replace("/?auth=0");
    }

    return next(action);
  };
