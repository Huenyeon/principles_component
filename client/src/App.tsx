import { useState } from "react";
import { ButtonComponent } from "./components/button";
import { DrawerComponent } from "./components/drawer";
import "./App.css";
import { ToastNotif, showToast } from "./components/toast";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOtherDrawerOpen, setisOtherDrawerOpen] = useState(false);
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");

  const submit = async () => {
    if (!userName && !password) {
      showToast("Need input", "error");
      return
    }

    if (!userName || !password) {
      showToast("Missing input on either password or username", "error");
      return
    }

    const response = await fetch("http://localhost:5003/api/post/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: userName, password: password }),
    });

    if (!response.ok) {
      const { error } = await response.json();
      showToast(`Failed to submit ${error}`, "error");
      return
    }


    showToast(`Successfully submitted!`, "success");
    setpassword("");
    setuserName("");
  };

  return (
    <>
      <h1 className="p-10 text-4xl font-bold text-center text-violet-500 drop-shadow-[0_0_10px_rgba(138,43,226,0.8)]">
        TRY SOME STUFFS
      </h1>
      <ToastNotif />
      <div className="text-white p-3">
        <ButtonComponent
          onClick={() => setIsDrawerOpen(true)}
          disabled={isDrawerOpen || isOtherDrawerOpen}
          className=" text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0px_0px_15px_3px_#3b82f6,0px_0px_20px_5px_#6366f1,0px_0px_25px_7px_#db2777]"
        >
          Auth
        </ButtonComponent>
      </div>

      <div className="text-white p-3 ">
        <ButtonComponent
          onClick={() => setisOtherDrawerOpen(true)}
          disabled={isDrawerOpen || isOtherDrawerOpen}
          className=" text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0px_0px_15px_3px_#fb7185,0px_0px_20px_5px_#a21caf,0px_0px_25px_7px_#6366f1]"
        >
          Information
        </ButtonComponent>
      </div>

      <div className="text-white p-3">
        <button
          onClick={() => showToast("What's up! Need some toasts?", "info")}
        >
          Different button
        </button>
      </div>

      <div>
        <button
          className=" text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0px_0px_15px_3px_#3b82f6,0px_0px_20px_5px_#6366f1,0px_0px_25px_7px_#db2777]"
          onClick={() => showToast("This is a success toast", "success")}
        >
          Success
        </button>
      </div>

      {isOtherDrawerOpen && (
        <DrawerComponent
          opened={isOtherDrawerOpen}
          onClose={() => setisOtherDrawerOpen(false)}
          title="Information"
        >
          <h2>HELLO I AM DRAWER NUMBER 2</h2>
          <h6>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Laoreet tempor
            nulla, condimentum parturient sociosqu orci quisque cubilia. Duis ut
            sodales augue, euismod laoreet lorem. Metus finibus proin duis
            integer ultrices dictumst, lobortis fermentum. Praesent blandit ex
            pulvinar phasellus elit vulputate torquent. Facilisi porttitor
            inceptos ligula; fringilla eget posuere etiam. Posuere sem
            condimentum viverra diam amet. Dignissim justo quam inceptos magna
            potenti varius orci mollis. Faucibus purus purus dolor ante
            himenaeos efficitur.
          </h6>

          <h6>
            Dis mattis molestie conubia platea vitae phasellus. Nam class nec
            dignissim morbi sagittis rutrum ultricies. Parturient purus justo
            condimentum semper imperdiet fermentum pulvinar. Cubilia magna mi
            sollicitudin netus facilisis lectus. Nec gravida penatibus neque
            metus vulputate nulla rutrum mi. Suscipit penatibus a magnis fusce
            aptent et adipiscing. Tellus suspendisse rhoncus platea torquent
            ridiculus parturient erat. Suscipit amet donec, eu sociosqu in arcu.
          </h6>
        </DrawerComponent>
      )}

      {isDrawerOpen && (
        <DrawerComponent
          opened={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title="Authentication"
        >
          <h2>HELLO I AM DRAWER NUMBER 1</h2>
          <p>Input your username and password</p>
          <div className="py-5">
            <input
              className="border rounded-md my-5"
              placeholder="Input your username here "
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            ></input>
            <input
              className="border rounded-md"
              placeholder="Input your password here"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            ></input>
          </div>
          <div className="flex justify-end bottom-0">
            <ButtonComponent
              onClick={() => {
                submit();
              }}
              className="text-black"
            >
              Submit
            </ButtonComponent>
          </div>
        </DrawerComponent>
      )}
    </>
  );
}

export default App;
