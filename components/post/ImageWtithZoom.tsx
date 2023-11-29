"use client";
// Import necessary modules and types
// Import necessary modules and types
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "./overlayStyle.css";
import { shimmer, toBase64 } from "@/utils/shimmer";

// Define the props type for the ErrorBoundary component
type ErrorBoundaryProps = {
  children: React.ReactNode;
};

// Error boundary class component
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // Called when an error occurs in a child component
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  // Called after an error has been thrown
  componentDidCatch(error: any, errorInfo: any) {
    console.error("Error caught by error boundary:", error, errorInfo);
    // Reload the website upon encountering an error
    window.location.reload();
  }

  render() {
    // Render the child components
    return this.props.children;
  }
}

// ImageWithZoom component
const ImageWithZoom = ({
  src,
  alt,
  id,
}: {
  src: string;
  alt: string;
  id?: string;
}) => {
  return (
    // Wrap the component with the ErrorBoundary
    <ErrorBoundary>
      <Zoom key={id ? id : Math.random()} wrapElement="span">
        <Image
          className="w-full object-cover object-center h-auto"
          src={src}
          alt={alt}
          width={1280}
          height={620}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(500, 500),
          )}`}
        />
      </Zoom>
    </ErrorBoundary>
  );
};

export default ImageWithZoom;
