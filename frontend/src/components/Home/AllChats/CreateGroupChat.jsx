import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup, searchUsers } from '../../../redux/appReducer/action';
import AddUser from './AddUser';
import Badge from './Badge';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomInput from '../../CommonComponents/CustomInput';
import { AiOutlinePlus } from 'react-icons/ai';

export default function CreateGroupChat() {
    const [isModalVisible, setModalVisibility] = useState(false);
    const [userInput, setUserInput] = useState({ groupName: '', searchUser: '', addUsers: [] });
    const searchedUser = useSelector((state) => state.appReducer.searchedUser);
    const isSearchUserProcessing = useSelector((state) => state.appReducer.isSearchUserProcessing);
    const createGroupChatSuccess = useSelector((state) => state.appReducer.createGroupChatSuccess);
    const createGroupChatFail = useSelector((state) => state.appReducer.createGroupChatFail);
    const createGroupChatProcessing = useSelector((state) => state.appReducer.createGroupChatProcessing);
    const dispatch = useDispatch();

    const toggleModal = () => {
        setModalVisibility(!isModalVisible);
    };

    useEffect(() => { }, [userInput]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const addUser = (userId, name) => {
        if (!userInput.addUsers.some((user) => user.userId === userId)) {
            setUserInput((prevState) => ({
                ...prevState,
                addUsers: [...prevState.addUsers, { userId, name }],
            }));
        }
    };

    const removeUser = (userId) => {
        setUserInput((prevState) => ({
            ...prevState,
            addUsers: prevState.addUsers.filter((user) => user.userId !== userId),
        }));
    };

    const handelCreateGroup = () => {
        if (userInput.groupName.length <= 0) {
            toast.warn('Please give a group name.', { position: toast.POSITION.BOTTOM_LEFT });
            return;
        }

        if (userInput.addUsers.length < 2) {
            toast.warn('Add a minimum of two users to create a group.', { position: toast.POSITION.BOTTOM_LEFT });
            return;
        }

        const obj = {
            name: userInput.groupName,
            users: JSON.stringify(userInput.addUsers.map((user) => user.userId)),
        };

        dispatch(createGroup(obj));
    };

    useEffect(() => {
        if (createGroupChatSuccess && !createGroupChatProcessing) {
            toast.success('Group successfully created.', { position: toast.POSITION.BOTTOM_LEFT });
            setUserInput({ groupName: '', searchUser: '', addUsers: [] });
            setTimeout(() => {
                toggleModal();
            }, 1000);
        }

        if (createGroupChatFail && !createGroupChatProcessing) {
            toast.error('Failed to create group.', { position: toast.POSITION.BOTTOM_LEFT });
        }
    }, [createGroupChatSuccess, createGroupChatProcessing, createGroupChatFail]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            dispatch(searchUsers(userInput.searchUser.trim()));
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [userInput.searchUser, dispatch]);

    return (
        <section>
            <button
                onClick={toggleModal}
                className="flex border-2 border-primary-400 items-center gap-2 text-white bg-primary-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                type="button"
            >
                <AiOutlinePlus size={"20px"} />
                Create Group
            </button>

            {isModalVisible && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow p-6 max-w-md w-full">
                        <div className="text-left">
                            <h3 className="mb-5 text-lg font-normal">Create Group</h3>

                            {/* group name input */}
                            <CustomInput
                                label="Group Name"
                                value={userInput.groupName}
                                onChange={handleInputChange}
                                name="groupName"
                                placeholder="Enter Group Name"
                                required
                            />

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
                                    disabled={createGroupChatProcessing}
                                    className="text-gray-800 mr-3  bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-800 text-sm font-medium px-5 py-2.5  focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                >
                                    Cancel
                                </button>

                                {/* create button */}
                                <button
                                    onClick={handelCreateGroup}
                                    type="button"
                                    disabled={createGroupChatProcessing}
                                    className="text-white mt-5 bg-primary-700 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                >
                                    {createGroupChatProcessing ? (
                                        <>
                                            <div className="flex items-center justify-center">
                                                <span className="mr-2">Please wait</span>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            </div>
                                        </>
                                    ) : (
                                        'Create Group'
                                    )}
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </section>
    );
}
