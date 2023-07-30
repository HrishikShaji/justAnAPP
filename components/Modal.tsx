"use client";
import { onClose } from "@/redux/slices/ModalSlice";
import { useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AuthForm from "./AuthForm";
import { IoIosCloseCircle } from "react-icons/io";
import UpdateForm from "./UpdateForm";

const Modal = () => {
  const isOpen = useAppSelector((state) => state.modalReducer.value.isOpen);
  const modalName = useAppSelector(
    (state) => state.modalReducer.value.modalName
  );

  const dispatch = useDispatch();
  const handleModal = () => {
    dispatch(onClose());
  };
  return (
    <>
      {isOpen && (
        <div className="h-screen w-full inset-0 bg-black/70 fixed z-50 top-0 left-0 flex justify-center items-center">
          <div className="p-10 rounded-3xl w-[50%] relative bg-neutral-700">
            <IoIosCloseCircle
              onClick={handleModal}
              className="text-white absolute top-3 cursor-pointer right-3"
              size={20}
            />

            {modalName === "Auth" && <AuthForm />}
            {modalName === "Settings" && <UpdateForm />}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
