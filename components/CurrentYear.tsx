"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();

// Pages are prerendered, so the server snapshot is the build year;
// the browser then renders the actual current year.
export default function CurrentYear() {
  return <>{useSyncExternalStore(subscribe, getYear, getYear)}</>;
}
