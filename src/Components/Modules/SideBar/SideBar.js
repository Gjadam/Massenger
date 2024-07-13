import { useEffect, useState } from 'react'

// Icons
import { PiChatsCircleDuotone } from "react-icons/pi";
import { RiContactsBookFill } from "react-icons/ri";
import { BiSolidPencil } from "react-icons/bi";
import { IoClose } from 'react-icons/io5';

// Components
import Contact from '../Contact/Contact'
import ContactAlert from '../ContactAlert/ContactAlert';
import HeaderSideBar from '../HeaderSideBar/HeaderSideBar';

export default function SideBar({ chats, openChat }) {
    const [searchValue, setSearchValue] = useState('')
    const [searchData, setSearchData] = useState([])
    const [contacts, setContacts] = useState([])
    const [isContactBoxOpen, setIsContactBoxOpen] = useState(false)
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    const getSearchData = () => {
        fetch(`https://chattak-alirh.koyeb.app/users/search/?username=${searchValue}`, {
            headers: {
                'Authorization': `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setSearchData(data)
            })
    }

    useEffect(() => {
        // Get Search Datas from server
        if (searchValue.length > 0) {
            getSearchData()
        }
    }, [searchValue])

    useEffect(() => {
        if (localStorageData) {
            fetch(`https://chattak-alirh.koyeb.app/users/contacts/`, {
                headers: {
                    'Authorization': `Bearer ${localStorageData.token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setContacts(data)
                })
        }
    }, [contacts])


    const openContactsBox = () => {
        setIsContactBoxOpen(!isContactBoxOpen)
    }


    return (
        <>
            <div className=" relative">
                <div className="">
                    <HeaderSideBar icon={<PiChatsCircleDuotone className='text-2xl mr-1 ' />} text={'chats'} />
                    {
                        chats.length ? (
                            chats.map(chat => (
                                <div key={chat.id} onClick={openChat}>
                                    <Contact  chatID={chat.id} userID={chat.target_user_id} username={chat.target_username} lastMessage={chat.last_message} />
                                </div>
                            ))
                        ) : (
                            <ContactAlert text={'chats'} />
                        )
                    }
                </div>
                <div className=" group fixed left-6  bottom-6 z-40 p-3 rounded-full  bg-blue-600 dark:bg-zinc-700 dark:hover:bg-zinc-800 hover:bg-blue-700 cursor-pointer transition-colors " onClick={openContactsBox}>
                    <div className=" flex justify-center items-center   ">
                        <div className="relative overflow-hidden p-3 flex justify-center items-center">
                            <div className={` absolute  ${isContactBoxOpen ? 'right-0' : '-right-8'}  transition-all ease-in-out`}>
                                <IoClose className=' text-2xl text-white' />
                            </div>
                            <div className={` absolute ${isContactBoxOpen ? '-left-8' : 'left-4'} -translate-x-4 transition-all ease-in-out`}>
                                <BiSolidPencil className=' text-2xl text-white' />
                            </div>
                        </div>
                    </div>
                    <div className=" absolute left-0 opacity-0 top-3 group-hover:left-12 group-hover:opacity-100  transition-all delay-75 ease-out ">
                        <span className=' text-sm ml-1 inline-block select-none min-w-36 font-bold text-blue-600 dark:text-zinc-100'>{isContactBoxOpen ? 'Close' : 'New Message'} </span>
                    </div>
                </div>
                <div className={` absolute top-0 bottom-0 ${isContactBoxOpen ? " -left-0" : " -left-[50rem]"} w-full  transition-all`}>
                    <div className="bg-white dark:bg-zinc-900 w-full h-full">

                        <div className="  m-2">
                            <input type="search" placeholder='Search' onChange={(e) => setSearchValue(e.target.value)} className=' placeholder:select-none rounded-full sticky top-0  w-full outline-none px-5 py-2  bg-zinc-100 dark:bg-zinc-800 dark:text-white' />
                            {
                                searchValue.length &&
                                    searchData.length > 0 ? (
                                    <div className=" rounded-xl mt-1  w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                                        {
                                            searchData?.map(search => (
                                                <div key={search.id} onClick={openChat}>
                                                    <Contact  userID={search.id} username={search.username} type={'search'} />
                                                </div>
                                            ))
                                        }

                                    </div>

                                ) : null
                            }
                        </div>
                        <HeaderSideBar icon={<RiContactsBookFill className='text-2xl mr-1 ' />} text={'Contacts'} />
                        {
                            contacts.length ? (
                                contacts.map(contact => (
                                    <div key={contact.id} onClick={openChat}>
                                        <Contact  userID={contact.id} username={contact.username} />
                                    </div>
                                ))
                            ) : (
                                <ContactAlert text={'contacts'} />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
