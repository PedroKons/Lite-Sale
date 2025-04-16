

const Spinner = ({size, color}: {size: number, color: string}) => {
  return (
    <div className="flex justify-center items-center h-screen">
        <div className={`inline-block h-${size} w-${size} animate-spin rounded-full border-4 border-solid border-${color} border-r-transparent align-[-0.125em] text-${color} motion-reduce:animate-[spin_1.5s_linear_infinite]`} role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Carregando...
            </span>
        </div>
    </div>
  )
}

export default Spinner