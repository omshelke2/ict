"use client"


import { useRef, useEffect } from "react"

type Props = {
    title: string,
    onClose: () => void,
    onOk: () => void,
    children: React.ReactNode,
    showDialog: boolean, // Add this line
}

export default function Dialog({ children, showDialog }: Props) {
    const dialogRef = useRef<null | HTMLDialogElement>(null)

    useEffect(() => {
        if (showDialog) {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [showDialog])

    

    

    const dialog: JSX.Element | null = showDialog
        ? (
            <dialog  ref={dialogRef} className="backdrop:bg-gray-800/50 rounded-3xl">
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        {/* <h1 className="">{title}</h1> */}

                        {/* <button className="" onClick={closeDialog}>
                            x
                        </button> */}
                    </div>
                    <div className="justify-items-center text-center">
                        {children}
                        <div>
                            {/* <button onClick={clickOk}>
                                OK
                            </button> */}
                        </div>
                    </div>
                </div>
            </dialog>
        ) : null

    return dialog
}