import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateProfile } from "../Api";
import { toast } from "react-toastify";
import { useUserContext } from "../context";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Setting = () => {
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [data, setdata] = useState({
    fisrtName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    oldPassword: "",
    newPassword: "",
  });
  const { id } = useParams();
  const navigation = useNavigate();

  const { user, setUser } = useUserContext();
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);
  const getUser = () => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    } else {
      setUser(null);
    }
  };

  const handlefile = (event) => {
    setFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };
  console.log(file, "file");
  const handleFormData = (values) => {
    var formData = new FormData();
    formData.append("firstName", values?.fisrtName);
    formData.append("lastName", values?.lastName);
    if (!!file) formData.append("filename", file);
    formData.append("email", values?.email);
    formData.append("phoneNumber", values?.phoneNumber);
    formData.append("oldPassword", values?.oldPassword);
    formData.append("newPassword", values?.newPassword);
    console.log(formData, "formdata");
    return formData;
  };

  const updateUserProfile = async (values) => {
    try {
      const res = await updateProfile(id, handleFormData(values));
      const userData = {
        ...JSON.parse(localStorage.getItem("user")),
        firstName: res?.data?.user?.firstName,
        lastName: res?.data?.user?.lastName,
        email: res?.data?.user?.email,
        phoneNumber: res?.data?.user?.phoneNumber,
        filename: res?.data?.user?.filename,
      };
      if (res?.status) {
        localStorage.setItem("user", JSON.stringify(userData));
        navigation(`/doc/${id}`);
        window.location.reload();
        toast.success("Profile Updated successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  return (
    <div className="bg_img">
      <div className="setting_icon">
        <img src="/images/Group 3.svg" alt="setting" />
      </div>

      <div className="content_part setting_part">
        {/* <img className="setting_img" src="/images/Group 389.svg" alt="" /> */}
        <div className="setting_img">
          <label htmlFor="fileInput" class="image-container">
            {(user?.filename !== null &&
              user?.filename !== "" &&
              user?.filename !== undefined) ||
            previewImage ? (
              <img
                src={
                  previewImage ??
                  `${process.env.REACT_APP_IMAGE_BASE_URL}/${user?.filename}`
                }
                alt="Profile"
                className="h-full w-full rounded-full"
              />
            ) : (
              <img
                src="/images/Group 389.svg"
                alt="Profile"
                className="h-full w-full rounded-full"
              />
            )}
            {/* {user?.filename ? (
              <img
                src={
                  previewImage ??
                  `${process.env.REACT_APP_IMAGE_BASE_URL}/${user?.filename}`
                }
                alt="Clickable"
              />
            ) : (
              <img
                src={previewImage ? previewImage : "/images/Group 389.svg"}
                alt="Clickable"
              />
            )} */}

            <input
              onChange={(e) => handlefile(e)}
              type="file"
              id="fileInput"
              class="file-input"
            />
          </label>
        </div>
        <div className="fields_flex justify_content">
          <div className="item_fields pr_4">
            <div className="pb-4 pr_4">
              <label htmlFor="fisrtName">First name</label>
              <br></br>
              <input
                className="input_cls"
                type="text"
                id="fisrtName"
                name="fisrtName"
                onChange={(e) =>
                  setdata({ ...data, fisrtName: e.target.value })
                }
              />
            </div>
            <div className="pb_4">
              <label htmlFor="lastName">Last name:</label>
              <br></br>
              <input
                className="input_cls"
                type="text"
                id="lastName"
                name="lastName"
                onChange={(e) => setdata({ ...data, lastName: e.target.value })}
              />
            </div>
          </div>
          <div>
            <div className="pb-4">
              <label htmlFor="email">Email</label>
              <br></br>
              <input
                className="input_cls"
                type="email"
                id="email"
                name="email"
                onChange={(e) => setdata({ ...data, email: e.target.value })}
              />
            </div>
            <label htmlFor="phoneNumber">Phone No</label>
            <br></br>
            {/* <input
              className="input_cls"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              onChange={(e) =>
                setdata({ ...data, phoneNumber: e.target.value })
              }
            /> */}
            <PhoneInput
              country={"us"}
              // value={values?.phoneNumber}
              className="input_cls"
              onChange={(phone) => setdata({ ...data, phoneNumber: phone })}
              inputStyle={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="fields_flex pt-0">
          <div className="item_fields_2 justify_content">
            <div className="pr-4 pb_4">
              <label htmlFor="oldPassword">Old Password</label>
              <br></br>
              <input
                className="input_cls"
                type="text"
                id="oldPassword"
                name="oldPassword"
                onChange={(e) =>
                  setdata({ ...data, oldPassword: e.target.value })
                }
              />
            </div>
            <div className="pb_4 cpad">
              <label htmlFor="newPassword">New Password</label>
              <br></br>
              <input
                className="input_cls"
                type="text"
                id="newPassword"
                name="newPassword"
                onChange={(e) =>
                  setdata({ ...data, newPassword: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className=" btn_setting">
          <button
            onClick={() => updateUserProfile(data)}
            className="signup_btn setting_btn"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
