import React, { useRef } from "react";

type UserNameProps = {
  userName: string;
  setUserName: (userName: string) => void;
  checkUserNameNotValid: (userNameParam: string) => void;
  checkUserNameValid: (userNameParam: string) => void;
  userNameErrorMsg: string;
};

const UserName: React.FC<UserNameProps> = (props) => {
  const userNameInputRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = () => {
    const userName = userNameInputRef.current!.value;
    props.setUserName(userName);
    props.checkUserNameValid(userName);
  };

  const onBlurHandler = () => {
    const userName = userNameInputRef.current!.value;
    props.checkUserNameNotValid(userName);
  };

  return (
    <div>
      <label htmlFor="userName">Name</label>
      <input
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        type="text"
        id="userName"
        required
        ref={userNameInputRef}
        defaultValue={props.userName}
      />
      <div>{props.userNameErrorMsg}</div>
    </div>
  );
};

export default UserName;
