(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/layout/Navigation.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navigation",
    ()=>Navigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/portfolio.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Navigation() {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "site-header",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                className: "wordmark",
                href: "#home",
                "aria-label": "Karthikeya home",
                children: [
                    "KARTHIKEYA",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: ".DEV"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Navigation.tsx",
                        lineNumber: 6,
                        columnNumber: 118
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Navigation.tsx",
                lineNumber: 6,
                columnNumber: 42
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "menu-toggle",
                "aria-expanded": open,
                "aria-controls": "primary-nav",
                onClick: ()=>setOpen(!open),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                        fileName: "[project]/src/components/layout/Navigation.tsx",
                        lineNumber: 7,
                        columnNumber: 117
                    }, this),
                    open ? "CLOSE" : "MENU"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Navigation.tsx",
                lineNumber: 7,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                id: "primary-nav",
                className: open ? "nav-links is-open" : "nav-links",
                "aria-label": "Primary navigation",
                children: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigation"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: item === "01_HOME" ? "#home" : "#",
                            onClick: ()=>setOpen(false),
                            children: item
                        }, item, false, {
                            fileName: "[project]/src/components/layout/Navigation.tsx",
                            lineNumber: 8,
                            columnNumber: 138
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "nav-resume",
                        href: "#resume",
                        "data-cursor": "hand",
                        children: [
                            "RESUME ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": "true",
                                children: "↗"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Navigation.tsx",
                                lineNumber: 8,
                                columnNumber: 304
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Navigation.tsx",
                        lineNumber: 8,
                        columnNumber: 237
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Navigation.tsx",
                lineNumber: 8,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Navigation.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
_s(Navigation, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c = Navigation;
var _c;
__turbopack_context__.k.register(_c, "Navigation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/portfolio.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "navigation",
    ()=>navigation,
    "portfolio",
    ()=>portfolio
]);
const portfolio = {
    name: "KODURU KARTHIKEYA",
    shortName: "KARTHIKEYA",
    location: "Vijayawada, Andhra Pradesh, India",
    role: "Final-year BCA student / Developer",
    education: {
        degree: "BCA",
        institution: "KL University",
        cgpa: "8.44/10",
        expectedGraduation: 2027
    },
    strengths: [
        "Full Stack Web Development",
        "Java",
        "JavaScript",
        "TypeScript",
        "Python",
        "SQL",
        "React",
        "Node.js",
        "Express.js",
        "Spring Boot",
        "MongoDB",
        "MySQL"
    ],
    certification: [
        "Azure AI Fundamentals"
    ],
    internships: [
        "Thiranex",
        "LearnFlu"
    ],
    projects: [
        "NIVOR",
        "MEDISHIELD",
        "tmfy."
    ]
};
const navigation = [
    "01_HOME",
    "02_ABOUT",
    "03_PROJECTS",
    "04_SKILLS",
    "05_EXPERIENCE",
    "06_CONTACT"
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=src_04czqim2x5nqy._.js.map