import React from 'react'

const Card = ({ bgColor, borderColor, textColor, label, data }: { bgColor: string, borderColor: string, textColor: string, label: string, data: string | number }) => {
    return (
        <>
            <div className={`bg-[${bgColor}] rounded-lg border-2 border-[${borderColor}] h-[15rem] w-full p-3 flex flex-col items-center justify-center`}>
                <h1 className={`text-2xl py-2 text-[${textColor}]`}>{label}</h1>
                <p className={`text-3xl font-semibold py-2 text-[${textColor}]`}>{data}</p>
            </div>
        </>
    )
}

export default Card