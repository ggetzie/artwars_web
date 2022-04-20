import React from "react";

type ErrorProps = {children: React.ReactNode};

type ErrorState = {hasError: boolean};

class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: {}) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Hmm...Something went wrong.</h1>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
