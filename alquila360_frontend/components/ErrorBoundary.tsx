"use client";

import { Component, ReactNode } from "react";

type Props = { children: ReactNode };

type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: any) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 text-center text-red-600 font-semibold">
          Algo salió mal al cargar esta sección.
        </div>
      );
    }

    return this.props.children;
  }
}
