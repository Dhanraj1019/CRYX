export default function HorizontalLine({title,status}){
    return (
        <div className='flex justify-between items-center mb-7 mt-7'>
            <h1 className='text-green-400'>{title}</h1>
            <div className='w-2/4 border-t-red-500 border-t-2'></div>
            <span className='border-red-500 border-2 p-1 text-red-400'>{status}</span>
        </div>
    )
}