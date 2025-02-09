import React from "react";

type AddBtnProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const AddBtn: React.FC<AddBtnProps> = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-4 right-4 btn-circle bg-primary btn-md outline-none cursor-pointer"
      onClick={onClick}
    >
      +
    </button>
  );
};

export default AddBtn;
