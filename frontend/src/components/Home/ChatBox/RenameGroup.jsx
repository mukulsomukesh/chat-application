import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeGroupName } from '../../../redux/appReducer/action';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function RenameGroup() {
    const selectedUserForChat = useSelector((state) => state.appReducer.selectedUserForChat);
    const isRenameGroupFail = useSelector((state) => state.appReducer.isRenameGroupFail);
    const isRenameGroupSuccess = useSelector((state) => state.appReducer.isRenameGroupSuccess);
    const isRenameGroupProcessing = useSelector((state) => state.appReducer.isRenameGroupProcessing);
    const [isChecked, setIsChecked] = useState(false);
    const [groupName, setGroupName] = useState('');
    const dispatch = useDispatch();


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
        console.log('val change');
    };


    //   use effect
    useEffect(() => {

        if (!isRenameGroupProcessing && groupName) {
            // if request success
            if (!isRenameGroupFail && isRenameGroupSuccess) {
                toast.success('Group successfully renamed.', { position: toast.POSITION.BOTTOM_LEFT });
                setGroupName("")
            }
            // if request faikl
            else if (isRenameGroupFail && !isRenameGroupSuccess) {
                toast.error('Group not renamed.', { position: toast.POSITION.BOTTOM_LEFT });
                setGroupName("")
            }
        }
    }, [isRenameGroupFail, isRenameGroupSuccess, isRenameGroupProcessing])

    return (

        <div className="mt-4">

            {/* checkbox */}
            <div className="flex items-center mb-2">
                <input
                    className="text-primary-800 h-5 w-5 mr-2"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => { setIsChecked(!isChecked) }}
                />
                <label htmlFor="groupName">Change Group Name</label>
            </div>

            {/* input with button flex */}
            <div className="flex">
                <input
                    type="text"
                    className="border rounded-l-md py-1 px-2 flex-grow"
                    disabled={!isChecked}
                    value={groupName}
                    onChange={(e) => { setGroupName(e.target.value) }}
                />
                <button
                    className={`bg-primary-800 hover:bg-primary-900 text-primary-50 rounded-r-md py-1 px-4  ${isChecked && !isRenameGroupProcessing ? '' : 'opacity-50 cursor-not-allowed'
                        }`}
                    onClick={handleChangeButtonClick}
                    disabled={!isChecked && !isRenameGroupProcessing}
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
    );
}
