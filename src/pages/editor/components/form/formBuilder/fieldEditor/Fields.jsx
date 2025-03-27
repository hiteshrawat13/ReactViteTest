import React, { Suspense } from 'react'



const CTAEditor = React.lazy(() => import("./CTAEditor"));
const CheckBoxEditor = React.lazy(() => import( "./CheckBoxEditor"));
const CheckGroupEditor = React.lazy(() => import( "./CheckGroupEditor"));
const HiddenInputEditor = React.lazy(() => import( "./HiddenInputEditor"));
const HtmlEditor = React.lazy(() => import( "./HtmlEditor"));
const RadioGroupEditor= React.lazy(() => import( "./RadioGroupEditor"));
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
    "TextBox":<TextBoxEditor key={Math.random()} />,
    "SelectBox":<SelectBoxEditor key={Math.random()} />,
    "CheckBox":<CheckBoxEditor key={Math.random()} />,
    "CheckGroup":<CheckGroupEditor key={Math.random()} />,
    "RadioGroup":<RadioGroupEditor key={Math.random()} />,
    "Text":<TextEditor key={Math.random()} />,
    "Html":<HtmlEditor key={Math.random()} />,
    "HiddenInput":<HiddenInputEditor key={Math.random()} />,
    "CTA":<CTAEditor key={Math.random()} />
}




