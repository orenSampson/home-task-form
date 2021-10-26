import React, { useRef } from "react";

type UserNameProps = {
  userName: string;
  setUserName: (userName: string) => void;
};

const UserName: React.FC<UserNameProps> = (props) => {
  const userNameInputRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = () => {
    const userName = userNameInputRef.current!.value;
    props.setUserName(userName);
  };

  return (
    <div>
      <label htmlFor="userName">Name</label>
      <input
        onChange={onChangeHandler}
        type="text"
        id="userName"
        required
        ref={userNameInputRef}
        defaultValue={props.userName}
      />
    </div>
  );
};

export default UserName;
