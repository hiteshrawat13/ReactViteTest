import React, { Suspense } from 'react'



const CTAEditor = React.lazy(() => import("./CTAEditor"));
const CheckBoxEditor = React.lazy(() => import( "./CheckBoxEditor"));
const CheckGroupEditor = React.lazy(() => import( "./CheckGroupEditor"));
const HiddenInputEditor = React.lazy(() => import( "./HiddenInputEditor"));
const  HtmlEditor = React.lazy(() => import( "./HtmlEditor"));
const  RadioGroupEditor= React.lazy(() => import( "./RadioGroupEditor"));
const SelectBoxEditor = React.lazy(() => import( "./SelectBoxEditor"));
const TextBoxEditor = React.lazy(() => import( "./TextBoxEditor"));
const TextEditor = React.lazy(() => import( "./TextEditor"));

export const fields={
    TextBox:"TextBox",
    SelectBox:"SelectBox",
    CheckBox:"CheckBox",
    CheckGroup:"CheckGroup",
    RadioGroup:"RadioGroup",
    Text:"Text",
    Html:"Html",
    HiddenInput:"HiddenInput",
    CTA:"CTA"
}

export const editors={
    "TextBox":<Suspense fallback={<div>Loading...</div>}><TextBoxEditor key={Math.random()} /></Suspense>,
    "SelectBox":<Suspense fallback={<div>Loading...</div>}><SelectBoxEditor key={Math.random()} /></Suspense>,
    "CheckBox":<Suspense fallback={<div>Loading...</div>}><CheckBoxEditor key={Math.random()} /></Suspense>,
    "CheckGroup":<Suspense fallback={<div>Loading...</div>}><CheckGroupEditor key={Math.random()} /></Suspense>,
    "RadioGroup":<Suspense fallback={<div>Loading...</div>}><RadioGroupEditor key={Math.random()} /></Suspense>,
    "Text":<Suspense fallback={<div>Loading...</div>}><TextEditor key={Math.random()} /></Suspense>,
    "Html":<Suspense fallback={<div>Loading...</div>}><HtmlEditor key={Math.random()} /></Suspense>,
    "HiddenInput":<Suspense fallback={<div>Loading...</div>}><HiddenInputEditor key={Math.random()} /></Suspense>,
    "CTA":<Suspense fallback={<div>Loading...</div>}><CTAEditor key={Math.random()} /></Suspense>
}




