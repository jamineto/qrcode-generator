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
        const size = 256; // adjust size if needed
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

        img.src =
            "data:image/svg+xml;base64," +
            btoa(unescape(encodeURIComponent(svgString)));
    };

    const handleTextChange = (e) => {
        const newString = e.target.value;
        setQrCodeData((prevData) => ({...prevData, string: newString}));
    };

    const handleColorChange = (e) => {
        const newColor = e.target.value;
        setQrCodeData((prevData) => ({...prevData, color: newColor}));
    };

    const handleBgColorChange = (e) => {
        const newColor = e.target.value;
        setQrCodeData((prevData) => ({...prevData, bgColor: newColor}));
    };

    const handleTransparencyToggle = () => {
        setQrCodeData((prevData) => ({
            ...prevData,
            transparent: !prevData.transparent,
            bgColor: !prevData.transparent ? "transparent" : "#FFFFFF",
        }));
    };

    return (
        <div className="container mx-auto p-6 max-w-3xl">
            <header className="text-center shadow-lg rounded-lg p-6">
                <h1 className="text-4xl font-semibold text-primary">QR Code Generator</h1>
                <p className="text-lg text-gray-600 mt-2">Sim, é de graça e não precisa de login ;)</p>
            </header>

            <div className="grid grid-cols-2 gap-6 mt-6">
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
                                onClick={handleTransparencyToggle}
                            />
                            <label className="text-md cursor-pointer">Fundo transparente</label>
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
                                <button
                                    className="btn rounded-md w-full"
                                    onClick={handleDownload}
                                >
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
            <footer className="fixed bottom-0 left-0 w-full bg-neutral text-neutral-content z-50">
                <div className="container mx-auto max-w-3xl">
                    <div className="footer sm:footer-horizontal items-center p-6">
                        <aside className="grid-flow-col items-center">
                            <svg
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                className="fill-current">
                                <path d="M22.672 15.226l-2.432.811..."></path>
                            </svg>
                            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                        </aside>
                        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                            {/* social icons */}
                        </nav>
                    </div>
                </div>
            </footer>

        </div>
    )
        ;
}
