"use client";

import { useQRCode } from "next-qrcode";
import React, { useState } from "react";

export default function Home() {
    const { Image } = useQRCode();
    const [text, setText] = useState("https://arweb.dev");

    const handleChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setText(event.target.value);
    };

    const handleCopyImg = async () => {
        const qrCodeContainer = document.getElementById("qrcode");
        if (qrCodeContainer) {
            const qrCodeImage = qrCodeContainer.querySelector("img");
            if (qrCodeImage) {
                try {
                    const blob = await fetch(qrCodeImage.src).then((response) =>
                        response.blob()
                    );
                    const item = new ClipboardItem({ "image/png": blob });
                    await navigator.clipboard.write([item]);
                    alert("Image copied to clipboard!");
                } catch (error) {
                    console.error("Failed to copy image to clipboard:", error);
                }
            }
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    qr code generator
                </p>

                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <a
                        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-1"
                        href="https://arweb.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        by arweb
                    </a>
                    <a
                        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-1"
                        href="https://github.com/arwebSE/qrgen"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        | github repo
                    </a>
                </div>
            </div>

            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                <div id="qrcode">
                    <Image
                        text={text || "https://arweb.dev"}
                        options={{
                            type: "image/png",
                            quality: 0.3,
                            errorCorrectionLevel: "M",
                            margin: 2,
                            scale: 4,
                            width: 500,
                            color: {
                                dark: "#fff",
                                light: "#000",
                            },
                        }}
                    />
                </div>
            </div>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
                <a
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        <form>
                            <label>
                                URL:{" "}
                                <input
                                    className="text-black"
                                    type="text"
                                    value={text}
                                    onChange={handleChange}
                                />
                            </label>
                        </form>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        the destination for the QR code
                    </p>
                </a>
                <a
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleCopyImg}
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        save image{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        to clipboard
                    </p>
                </a>
            </div>
        </main>
    );
}
