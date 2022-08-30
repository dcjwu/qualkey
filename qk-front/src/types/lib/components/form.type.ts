import type { FormEvent } from "react"
import React from "react"

import type { FormDataType } from "@customTypes/common"

export type FormType = {
    initialState: FormDataType
    handleFormSubmit: (event: FormEvent<HTMLFormElement>, formData: FormDataType) => void
    resetValueOnQueryChange?: boolean
    children: React.ReactNode
    [k: string]: unknown
}