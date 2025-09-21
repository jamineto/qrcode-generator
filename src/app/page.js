"use client";

import {useRef, useState} from "react";
import QRCode from "react-qr-code";

export default function Home() {
    const [qrCodeData, setQrCodeData] = useState({
        string: "https://www.instagram.com",
        color: "#000000",
        bgColor: "#FFFFFF",
        transparent: true
    });

    const wrapperRef = useRef(null);

    const handleDownload = () => {
        if (!wrapperRef.current) return;
        const svg = wrapperRef.current.querySelector("svg");
        if (!svg) return;

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);

        const canvas = document.createElement("canvas");
        const size = 256;
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext("2d");
        if (qrCodeData.transparent) {
            ctx.clearRect(0, 0, size, size);
        } else {
            ctx.fillStyle = qrCodeData.bgColor;
            ctx.fillRect(0, 0, size, size);
        }

        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0, size, size);
            const pngUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = "qrcode.png";
            link.href = pngUrl;
            link.click();
        };
        img.src = "data:image/svg+xml;base64," + btoa(decodeURIComponent(encodeURIComponent(svgString)));
    };

    const handleTextChange = (e) =>
        setQrCodeData((p) => ({...p, string: e.target.value}));

    const handleColorChange = (e) =>
        setQrCodeData((p) => ({...p, color: e.target.value}));

    const handleBgColorChange = (e) =>
        setQrCodeData((p) => ({...p, bgColor: e.target.value}));

    const handleTransparencyToggle = () =>
        setQrCodeData((p) => ({
            ...p,
            transparent: !p.transparent,
            bgColor: !p.transparent ? "transparent" : "#FFFFFF",
        }));

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main className="container mx-auto p-6 min-w-sm max-w-3xl flex-1">
                <header className="text-center shadow-lg rounded-lg p-6">
                    <h1 className="text-4xl font-semibold text-primary">QR Code Generator</h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="shadow-lg rounded-lg p-6 space-y-6">
                        <fieldset className="space-y-2">
                            <legend className="text-lg font-medium">Link</legend>
                            <input
                                type="text"
                                className="input input-primary w-full p-2 rounded-md border border-gray-300"
                                value={qrCodeData.string}
                                onChange={handleTextChange}
                                placeholder="https://www.instagram.com"
                            />
                        </fieldset>

                        <fieldset className="space-y-4">
                            <legend className="text-lg font-medium">Opções</legend>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={qrCodeData.transparent}
                                    className="checkbox"
                                    onChange={handleTransparencyToggle}
                                />
                                <label className="text-md cursor-pointer" onClick={handleTransparencyToggle}>
                                    Fundo transparente
                                </label>
                            </div>

                            <div className="space-y-2 flex gap-4">
                                <label className="text-md">Cor do QR Code</label>
                                <input
                                    type="color"
                                    value={qrCodeData.color}
                                    onChange={handleColorChange}
                                    className="w-16 h-8 p-0 border-none rounded-md"
                                />
                            </div>

                            {!qrCodeData.transparent && (
                                <div className="space-y-2 flex gap-4">
                                    <label className="text-md">Cor de Fundo</label>
                                    <input
                                        type="color"
                                        value={qrCodeData.bgColor}
                                        onChange={handleBgColorChange}
                                        className="w-16 h-8 p-0 border-none rounded-md"
                                    />
                                </div>
                            )}
                        </fieldset>
                    </div>

                    <div className="shadow-md rounded-lg p-6 space-y-6">
                        {qrCodeData.string && (
                            <>
                                <div ref={wrapperRef} className="flex justify-center">
                                    <QRCode
                                        value={qrCodeData.string}
                                        bgColor={qrCodeData.bgColor}
                                        fgColor={qrCodeData.color}
                                        size={256}
                                    />
                                </div>

                                <div className="flex justify-center mt-6">
                                    <button className="btn btn-soft rounded-md w-full" onClick={handleDownload}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6 inline mr-2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                            />
                                        </svg>
                                        Download PNG
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>

            <footer className="w-full">
                <div className="container mx-auto min-w-sm max-w-3xl">
                    <div className="footer footer-horizontal items-center p-6">
                        <aside className="grid-flow-col items-center">
                            <p>© {new Date().getFullYear()} - By Jamineto</p>
                        </aside>
                        <nav className="grid-flow-col gap-4 place-self-center justify-self-end">
                            <a href="https://www.github.com/jamineto" aria-label="GitHub">
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                     fillRule="evenodd" clipRule="evenodd" className="fill-current">
                                    <path
                                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                                </svg>
                            </a>
                        </nav>
                    </div>
                </div>
            </footer>
        </div>
    );
}
