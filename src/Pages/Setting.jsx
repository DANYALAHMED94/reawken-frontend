import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getUserById, updateProfile } from "../Api";
import { toast } from "react-toastify";
import { useUserContext } from "../context";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import profile from "../assests/profile-dummy.jpg";

const Setting = () => {
  const initailValue = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    oldPassword: "",
    newPassword: "",
  };
  const [isClicked, setIsClicked] = useState(false);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [data, setdata] = useState(initailValue);
  const { id } = useParams();
  const navigation = useNavigate();

  const { user } = useUserContext();

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const getUser = async () => {
    try {
      const res = await getUserById(id);
      if (res?.data?.success) {
        setdata(res?.data?.user);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const { firstName, lastName, email, phoneNumber } = data;

  const handlefile = (event) => {
    setFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleFormData = (values) => {
    var formData = new FormData();
    formData.append(
      "firstName",
      values?.firstName ? values?.firstName : data?.firstName
    );
    formData.append(
      "lastName",
      values?.lastName ? values?.lastName : data?.lastName
    );
    if (!!file) formData.append("filename", file);
    formData.append("email", values?.email);
    formData.append("phoneNumber", values?.phoneNumber);
    formData.append(
      "oldPassword",
      values?.oldPassword ? values?.oldPassword : ""
    );
    formData.append(
      "newPassword",
      values?.newPassword ? values?.newPassword : ""
    );
    return formData;
  };

  const updateUserProfile = async (values) => {
    setIsClicked(true);
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

  const notifyWithPromise = () => {
    toast.promise(updateUserProfile(data), {
      pending: "Loading Changes...",
      success: (data) => `Data fetched successfully: ${data}`,
      error: (error) => `Error fetching data: ${error.message}`,
    });
  };

  const handleChange = async (e) => {
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  console.log(data);
  return (
    <div className="bg_img">
      <div className="setting_icon">
        <Link to="/">
          <img className="arrow2" src="/images/left-arrow (2).png" alt="" />
        </Link>
        <img src="/images/Group 3.svg" alt="setting" />
      </div>

      <div className="setting_container">
        <div className="content_part setting_part">
          {/* <img className="setting_img" src="/images/Group 389.svg" alt="" /> */}
          <div className="setting_img">
            <label htmlFor="fileInput" className="image-container">
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
                  src={profile}
                  alt="Profile"
                  className="h-full w-full rounded-full"
                />
              )}

              <input
                onChange={(e) => handlefile(e)}
                type="file"
                id="fileInput"
                className="file-input"
              />
            </label>
          </div>
          <div className="fields_flex justify_content">
            <div className="item_fields pr_4">
              <div className="pb-4 pr_4">
                <label htmlFor="firstName">First name</label>
                <br></br>
                <input
                  onChange={handleChange}
                  className="input_cls"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                />
              </div>
              <div className="pb_4">
                <label htmlFor="lastName">Last name:</label>
                <br></br>
                <input
                  onChange={handleChange}
                  className="input_cls"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                />
              </div>
            </div>
            <div>
              <div className="pb-4">
                <label htmlFor="email">Email</label>
                <br></br>
                <input
                  onChange={handleChange}
                  className="input_cls"
                  type="email"
                  id="email"
                  name="email"
                  readOnly
                  value={email}
                />
              </div>
              <label htmlFor="phoneNumber">Phone No</label>
              <br></br>

              <PhoneInput
                onChange={(phone) => setdata({ ...data, phoneNumber: phone })}
                name="phoneNumber"
                country={"us"}
                className="input_cls"
                inputStyle={{ width: "100%" }}
                value={phoneNumber}
              />
            </div>
          </div>
          <div className="fields_flex pt-0">
            <div className="item_fields_2 justify_content">
              <div className="pr-4 p-0 pb_4">
                <label htmlFor="oldPassword">Old Password</label>
                <br></br>
                <input
                  onChange={handleChange}
                  className="input_cls"
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                />
              </div>
              <div className="pb_4 p-0 cpad">
                <label htmlFor="newPassword">New Password</label>
                <br></br>
                <input
                  onChange={handleChange}
                  className="input_cls"
                  type="password"
                  id="newPassword"
                  name="newPassword"
                />
              </div>
            </div>
          </div>
          <div className=" btn_setting">
            <button
              disabled={isClicked}
              onClick={() => notifyWithPromise()}
              className="signup_btn setting_btn"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
