import React from "react";

export default function LayoutWrapper({ children }) {
    return (
        <SectionContainer>
            <div className="flex h-screen flex-col justify-between">
                <main className="mb-auto">{children}</main>
                <Footer />
            </div>
        </SectionContainer>
    )
}