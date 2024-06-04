import MessageForm from "./LiveChat/MessageForm"
import MessageList from "./LiveChat/MessageList"

const LiveDoubt = () => {

  return (
    <div className='w-[100%] h-[80rem] mt-[5rem] z-10'> 
      <div className='absolute w-[100%] h-[20rem]'>
        <MessageList />
        <MessageForm />
      </div>
    </div>
  )
}

export default LiveDoubt