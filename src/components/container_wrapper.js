import React from "react";

export default function ContainerWrapper({ children }) {
    return (
        <>
            <div className="flex h-screen flex-col justify-between">
                <main className="mb-auto">
                    <div
                        className="w-90"
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "10%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}