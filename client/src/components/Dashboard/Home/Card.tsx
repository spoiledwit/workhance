import React from 'react'

const Card = ({ borderColor, textColor, label, data, twClass }: { borderColor: string, textColor: string, label: string, data: string | number, twClass: string }) => {
    return (
        <>
            <div className={"rounded-lg border-2 h-[15rem] p-3 flex flex-col items-center justify-center " + twClass}>
                <h1 className={`text-2xl py-2 text-[${textColor}]`}>{label}</h1>
                <p className={`text-3xl font-semibold py-2 text-[${textColor}]`}>{data}</p>
            </div>
        </>
    )
}

export default Card