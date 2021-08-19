import { ReactNode } from 'react';
import { Intent, Spinner } from "@blueprintjs/core";

export interface LoadingWrapperProps {
  loading?: boolean;
  children?: ReactNode;
}

const LoadingWrapper = (props: any) => {
  if (props.loading) {
    return (
      <Spinner intent={Intent.PRIMARY} />
    )
  }

  return props.children;
};

export default LoadingWrapper