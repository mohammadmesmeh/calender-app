export const DayNum = ({content , className})=>{
    return(
        <>
        <span className= {` text-center w-full px-1 py-1 cursor-pointer transition-all hover:bg-[#E0EDFF] hover:rounded-[8px] ${className}  `} >{content}</span>
        </>
    )
}