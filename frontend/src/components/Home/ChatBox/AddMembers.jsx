import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMembersInGroup, changeGroupName, getChats, searchUsers } from '../../../redux/appReducer/action';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import CustomInput from '../../CommonComponents/CustomInput';
import AddUser from '../../CommonComponents/AddUser';
import Badge from '../../CommonComponents/Badge';

export default function AddMembers() {
    const [showModal, setShowModal] = useState(false);
    const [userInput, setUserInput] = useState({ searchUser: '', addUsers: [] });
    const searchedUser = useSelector((state) => state.appReducer.searchedUser);
    const isSearchUserProcessing = useSelector((state) => state.appReducer.isSearchUserProcessing);
    const addMembersInGroupProcessing = useSelector((state) => state.appReducer.addMembersInGroupProcessing);
    const addMembersInGroupSuccess = useSelector((state) => state.appReducer.addMembersInGroupSuccess);
    const addMembersInGroupFail = useSelector((state) => state.appReducer.addMembersInGroupFail);
    const selectedUserForChat = useSelector((state) => state.appReducer.selectedUserForChat);   
    const dispatch = useDispatch();

    // handel input change 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // add users 
    const addUser = (userId, name) => {
        if (!userInput.addUsers.some((user) => user.userId === userId)) {
            setUserInput((prevState) => ({
                ...prevState,
                addUsers: [...prevState.addUsers, { userId, name }],
            }));
        }
    };

    // remove selected user 
    const removeUser = (userId) => {
        setUserInput((prevState) => ({
            ...prevState,
            addUsers: prevState.addUsers.filter((user) => user.userId !== userId),
        }));
    };

    // find group admin
    const groupAdmin = () => {
        const admin = selectedUserForChat.users.find((user) => user._id === selectedUserForChat.groupAdmin);
        return admin.name;
    };

    // toggle modal
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // add members in group
    const handelAddMemberRequest = ()=>{

        if (userInput.addUsers.length < 1) {
            toast.warn('Select atleast one user.', { position: toast.POSITION.BOTTOM_LEFT });
            return;
        }

        const obj = {
            chatId: selectedUserForChat._id,
            userId: userInput.addUsers.map((user) => user.userId),
        };

        dispatch(addMembersInGroup(obj));
    }

    useEffect(() => {
        if (addMembersInGroupSuccess && !addMembersInGroupProcessing && userInput.addUsers.length>=1) {
            toast.success('Members successfully added to group.', { position: toast.POSITION.BOTTOM_LEFT });
            setUserInput({ searchUser: '', addUsers: [] });
            setTimeout(() => {
                toggleModal();
            }, 1000);
        }

        if (addMembersInGroupFail && !addMembersInGroupProcessing && userInput.addUsers.length>=1) {
            setUserInput({ searchUser: '', addUsers: [] });
            toast.error('Failed to add members in group.', { position: toast.POSITION.BOTTOM_LEFT });
        }
    }, [addMembersInGroupSuccess, addMembersInGroupProcessing, addMembersInGroupFail]);

    // dispatch seach users function
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            dispatch(searchUsers(userInput.searchUser.trim()));
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [userInput.searchUser, dispatch]);

    return (
        <section>

            <button className="cursor-pointer w-full py-2 px-4 text-sm font-bold hover:bg-primary-800 hover:text-primary-50" onClick={toggleModal}>
                Add members
            </button>

            {showModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
                    <div className="bg-primary-50 text-primary-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-lg font-bold"> Add members in group </h2>
                            <button className="hover:text-primary-500 text-primary-800 rounded-md py-1 px-2" onClick={toggleModal}>
                                <AiOutlineCloseCircle size={'25px'} />
                            </button>
                        </div>

                        {/* total members */}
                        <p className="text-md font-semibold text-primary-800 truncate mt-4"> Group Admin - <span className='font-normal'> {groupAdmin()} </span></p>
                        <p className="text-md font-semibold text-primary-800 truncate mt-1 mb-4"> Total Members - <span className='font-normal'> {selectedUserForChat.users.length}  </span> </p>

                        {/* search and add user input */}
                        <CustomInput
                            label="Add User"
                            value={userInput.searchUser}
                            onChange={handleInputChange}
                            name="searchUser"
                            placeholder="Enter User"
                            required
                        />

                        {/* Badge status */}
                        {userInput.addUsers?.map((item) => (
                            <Badge label={item.name} userId={item.userId} removeUser={removeUser} key={item.userId} />
                        ))}

                        {/* loading status */}
                        {isSearchUserProcessing && (
                            <div className="mt-5 mx-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
                        )}

                        {/* if no user found */}
                        {!isSearchUserProcessing && searchedUser.length === 0 && (
                            <p className="text-gray-500 text-center mt-4">No User Found.</p>
                        )}

                        {/* map searched result */}
                        <div className="max-h-[30vh] overflow-y-auto p-2">
                            {searchedUser.length !== 0 &&
                                searchedUser?.map((item) => (
                                    <AddUser addUser={addUser} userId={item._id} name={item.name} email={item.email} imageSrc={item.pic} key={item._id} />
                                ))}
                        </div>
                        <div className='float-right' >

                            {/* cancel button */}
                            <button
                                onClick={toggleModal}
                                type="button"
                                disabled={addMembersInGroupProcessing}
                                className="text-gray-800 mr-3  bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-800 text-sm font-medium px-5 py-2.5  focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            >
                                Cancel
                            </button>

                            {/* create button */}
                            <button
                                onClick={handelAddMemberRequest}
                                type="button"
                                disabled={addMembersInGroupProcessing}
                                className="text-white mt-5 bg-primary-700 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            >
                                {addMembersInGroupProcessing ? (
                                    <>
                                        <div className="flex items-center justify-center">
                                            <span className="mr-2">Please wait</span>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        </div>
                                    </>
                                ) : (
                                    'Add Members'
                                )}
                            </button>

                        </div>

                    </div>
                </div>
            )}

        </section>
    );
}
