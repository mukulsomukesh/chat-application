import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeGroupName, getChats } from '../../../redux/appReducer/action';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function RenameGroup() {
    const selectedUserForChat = useSelector((state) => state.appReducer.selectedUserForChat);
    const isRenameGroupFail = useSelector((state) => state.appReducer.isRenameGroupFail);
    const isRenameGroupSuccess = useSelector((state) => state.appReducer.isRenameGroupSuccess);
    const isRenameGroupProcessing = useSelector((state) => state.appReducer.isRenameGroupProcessing);
    const [groupName, setGroupName] = useState('');
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    // toggle modal
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    //   handel rename group 
    const handleChangeButtonClick = () => {

        // if group name not present
        if (groupName.trim().length === 0) {
            toast.error('Enter valid name.', { position: toast.POSITION.BOTTOM_LEFT });
            return
        }

        // set max length
        if (groupName.trim().length > 30) {
            toast.error('Name length not more then 30 char.', { position: toast.POSITION.BOTTOM_LEFT });
            return
        }

        // dispatch changeGroupName
        const obj = {
            chatId: selectedUserForChat._id,
            chatName: groupName.trim()
        }
        dispatch(changeGroupName(obj))
    };


    //   use effect
    useEffect(() => {

        if (!isRenameGroupProcessing && groupName) {
            // if request success
            if (!isRenameGroupFail && isRenameGroupSuccess) {
                toast.success('Group successfully renamed.', { position: toast.POSITION.BOTTOM_LEFT });
                dispatch(getChats());
                setGroupName("")
                toggleModal()
            }
            // if request faikl
            else if (isRenameGroupFail && !isRenameGroupSuccess) {
                toast.error('Group not renamed.', { position: toast.POSITION.BOTTOM_LEFT });
                setGroupName("")
            }
        }
    }, [isRenameGroupFail, isRenameGroupSuccess, isRenameGroupProcessing])

    return (
        <section>

            <button className="cursor-pointer w-full py-2 px-4 text-sm font-bold hover:bg-primary-800 hover:text-primary-50" onClick={toggleModal}>
                Change Name
            </button>

            {showModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
                    <div className="bg-primary-50 text-primary-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-lg font-bold"> Change Group Name </h2>
                            <button className="hover:text-primary-500 text-primary-800 rounded-md py-1 px-2" onClick={toggleModal}>
                                <AiOutlineCloseCircle size={'25px'} />
                            </button>
                        </div>

                        {/* input with button flex */}
                        <input
                            className="w-full bg-primary-50 border border-primary-300 text-primary-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-white dark:focus:ring-primary-800 dark:focus:border-primary-800"
                            type="text"
                            value={groupName}
                            placeholder={selectedUserForChat.chatName}
                            onChange={(e) => { setGroupName(e.target.value) }}
                        />

                        {/* submit button */}
                        <button
                            className={`bg-primary-800 float-right mt-5 hover:bg-primary-900 text-primary-50 rounded-md py-1 px-4  ${isRenameGroupProcessing ? 'opacity-50 cursor-not-allowed' : ""}`}
                            onClick={handleChangeButtonClick}
                        >
                            {isRenameGroupProcessing ? (
                                <div className="flex items-center justify-center">
                                    <span className="mr-2">Renaming</span>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                </div>
                            ) : (
                                'Rename'
                            )}
                        </button>
                    </div>
                </div>
            )}

        </section>
    );
}
