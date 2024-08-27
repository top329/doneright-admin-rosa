"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { App } from "antd";
import store from "@/features/store";
import { RootStyleRegistry } from "@/component/RootStyleRegistry";
import { AuthProvider } from "@/component";

export default function RootTemplate({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <AuthProvider>
          <RootStyleRegistry>
            <App>{children}</App>
          </RootStyleRegistry>
        </AuthProvider>
      </DndProvider>
    </Provider>
  );
}
