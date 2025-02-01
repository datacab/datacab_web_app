interface props {
    color:string;
    text:string;
}

const GraphIndicator = ({color,text}:props) => {
  return (
    <div className='flex items-center gap-x-[10px]'>
        <div 
        style={{
            backgroundColor:color
        }}
        className={`w-[40px] h-[25px]`}></div>
        <div>{text}</div>
    </div>
  )
}

export default GraphIndicator