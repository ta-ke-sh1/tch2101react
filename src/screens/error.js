import React from "react";

export default function ErrorPage() {
    return (
        <>
            <div
                className="w-90"
                style={{
                    top: "10%",
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                Error 303, the page route does not exist!
            </div>
        </>
    )
}