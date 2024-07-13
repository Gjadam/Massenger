
// Icons
import { RiChatSmile2Line } from "react-icons/ri";

export default function ContactAlert({ text }) {
    return (
        <>
            <div className=" flex justify-center items-center flex-col gap-2 mt-10 p-5">
                <RiChatSmile2Line className=' text-zinc-700 text-6xl dark:text-zinc-300' />
                <span className=' text-zinc-700 font-bold text-center dark:text-zinc-300'>You have no {text} on ChatOnly yet</span>
                <ul className=' list-disc ml-5 mt-3'>
                    {
                        text === 'contacts' && <li className='text-zinc-500 dark:text-zinc-400 text-sm leading-6'>Search people by username </li>
                    }
                    <li className='text-zinc-500 dark:text-zinc-400 text-sm leading-6'>Invite friends to try ChatOnly</li>
                    {
                        text === 'chats' && <li className='text-zinc-500 dark:text-zinc-400 text-sm leading-6'>Select your contact from the contact list </li>
                    }
                </ul>
            </div>
        </>
    )
}
