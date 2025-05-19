
"use client";

import React, { useEffect, useState, ReactNode } from "react";

export function ClientOnly({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return <div>Loading...</div>;

    return <>{children}</>;
}
