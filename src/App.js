import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [date, setDate] = useState("")
  const [time, setTime] = useState('')
  const [url, setUrl] = useState("")
  const [exp, setExp] = useState("")
  const [mexp, setMexp] = useState("")

  const inputDate = new Date(date);  
  const currentDate = new Date();

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [skills, setSkills] = useState({
    javascript: false,
    css: false,
    python: false,
    react: false,
    firebase: false
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSkills((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    
    let isValid = true

    const showSuccessMessage = () => {
      toast.success("Successfully Submitted ", {
        position: "bottom-center",
      });
    };

    const showEmptyMessage = (field) => { 
      toast.error(field + " can't be left blank", {
        position: "top-right",
      });

      isValid = false
    };

    const showInvalidMessage = (field) => {    
      toast.error(field + " should contain valid data", {
        position: "top-right",
      });

      isValid = false
    };

    const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);
    const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone)
    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const validateUrl = (url) => /^(https?:\/\/)?((([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,})|localhost|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/[a-zA-Z0-9\-._~:\/?#[@\]!$&'()*+,;=]*)?$/.test(url);

    const combinedDateTimeString = `${date}T${time}:00`;
    const inputTime = new Date(combinedDateTimeString);
    const currentTimeMs = currentDate.getHours() * 3600000 + currentDate.getMinutes() * 60000;
    const inputTimeMs = inputTime.getHours() * 3600000 + inputTime.getMinutes() * 60000;
        
    const utcDate1 = new Date(Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate()));
    const utcDate2 = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));

    if (name == '') { showEmptyMessage('Name') }
    else if (email == '') { showEmptyMessage('Email') }
    else if (phone == '') { showEmptyMessage('Phone') }
    else if (role == '') { showEmptyMessage('Role') }
    else if (date == '') { showEmptyMessage('Date') }
    else if (time == '') { showEmptyMessage('Time') }
    else if (!skills.javascript && !skills.css && !skills.python && !skills.react && !skills.firebase) { showEmptyMessage('Skills') }
    else if (!validateName(name)) { showInvalidMessage('Name') }
    else if (!validateEmail(email)) { showInvalidMessage('Email') }
    else if (!validatePhone(phone)) { showInvalidMessage('Phone') }
    else if (role == 'Developer' && exp <= 0) { showInvalidMessage('Experience') }
    else if (role == 'Manager' && mexp <= 0) { showInvalidMessage('Managerial Experience') }
    else if (role == 'Designer' && !validateUrl(url)) { showInvalidMessage('Url') }
    else if (utcDate1 < utcDate2) { showInvalidMessage('Date') }
    else if (inputTimeMs < currentTimeMs) { showInvalidMessage('Time') } 

    if (isValid) { showSuccessMessage(); onOpen() }
  }

  return (
    <>
      <section className="w-screen h-screen p-10 overflow-x-hidden">
        <div className="text-2xl font-bold">Job Application Form</div>
        <div className="mt-10"><hr /></div>
        <div className="flex py-10">
        <div className={`w-2/3 border border-l-0 border-t-0 border-b-0 ${role != '' ? 'border-r-[1.5px] border-gray-100' : 'border-r-0'}`}>
          <form>
            <div className="grid grid-cols-2">
              <div>
                <div className="mt-1">
                  <label className="font-semibold">Full Name <span className="text-red-500">*</span></label>
                </div>
                <div className="mt-7">
                  <label className="font-semibold">Email Address <span className="text-red-500">*</span></label>
                </div>
                <div className="mt-7">
                  <label className="font-semibold">Phone Number <span className="text-red-500">*</span></label>
                </div>
                <div className="mt-9">
                  <label className="font-semibold">Applying For Position <span className="text-red-500">*</span></label>
                </div>
                <div className="mt-10">
                  <label className="font-semibold">Additional Skills <span className="text-red-500">*</span></label>
                </div>
                <div className="mt-16">
                  <label className="font-semibold">Preferred Interview Time <span className="text-red-500">*</span></label>
                </div>               
              </div>
              <div>
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-3/4 text-black bg-transparent focus:outline-none border p-1 px-2 tracking-wider text-sm"                    
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-3/4 mt-5 text-black bg-transparent focus:outline-none p-1 px-2 border tracking-wider text-sm"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-3/4 text-black mt-7 bg-transparent focus:outline-none border p-1 px-2 tracking-wider text-sm"
                  />
                </div>
                <div>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-3/4 mt-7 bg-transparent focus:outline-none border p-1 px-2 tracking-wider text-sm"       
                  >
                  <option value="">Select your role</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                <div className="mt-7">
                  <Checkbox colorScheme="green" isChecked={skills.javascript} onChange={handleCheckboxChange} name="javascript"> Javascript </Checkbox>
                  <Checkbox colorScheme="green" isChecked={skills.css} onChange={handleCheckboxChange} name="css" marginLeft={3}> CSS </Checkbox>
                  <Checkbox colorScheme="green" isChecked={skills.python} onChange={handleCheckboxChange} name="python" marginLeft={3}> Python </Checkbox>
                  <Checkbox colorScheme="green" isChecked={skills.react} onChange={handleCheckboxChange} name="react" marginLeft={3}> React </Checkbox>
                  <Checkbox colorScheme="green" isChecked={skills.firebase} onChange={handleCheckboxChange} name="firebase" marginTop={3}> Firebase </Checkbox>
                </div>
                <div>
                  <input
                    type="date"
                    className="w-3/4 text-black mt-8 bg-transparent focus:outline-none border p-1 px-2 tracking-wider text-sm"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Enter preferred time"
                    className="w-3/4 text-black mt-2 bg-transparent focus:outline-none border p-1 px-2 tracking-wider text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center w-2/3">
                  <button onClick={handleSubmit} className="border-2 border-indigo-800 rounded-lg w-[8rem] h-[2.4rem] mt-10 text-white bg-indigo-500">Submit</button>
                </div>
          </form>
          </div>

          <div className="w-1/3 px-10">
            {role == 'Designer' && <>
              <div>
              <label className="font-semibold">Portfolio Link: <span className="text-red-500">*</span></label>
                <br />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Link to your portfolio"
                  className="w-full mt-2 bg-transparent focus:outline-none border p-1 px-2 tracking-wider text-sm"
                />
              </div>
            </>}

            {(role == 'Designer' || role == 'Developer') && <>
              <div className={`${role == 'Designer' ? 'mt-4' : ''}`}>
              <label className="font-semibold">Relevant Experience: <span className="text-red-500">*</span></label>
                <br />
                <input
                  type="number"
                  value={exp}
                  onChange={(e) => setExp(e.target.value)}
                  placeholder="Enter relevant experience"
                  className="w-full mt-2 bg-transparent focus:outline-none border p-1 px-2 tracking-wider text-sm"
                />
              </div>
            </>}

            {(role == 'Manager') && <>
              <div>
              <label className="font-semibold">Managerial Experience: <span className="text-red-500">*</span></label>
                <br />
                <input
                  type="number"
                  value={mexp}
                  onChange={(e) => setMexp(e.target.value)}
                  placeholder="Enter relevant experience"
                  className="w-full mt-2 bg-transparent focus:outline-none border p-1 px-2 tracking-wider text-sm"
                />
              </div>
            </>}
          </div>
        </div>
      </section>

      <ToastContainer />

      <AlertDialog motionPreset='slideInBottom' isOpen={isOpen} onClose={onClose} isCentered>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Submitted Data</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>

          <div><span className="font-semibold">Name:</span> {name}</div>
          <div><span className="font-semibold">Email Address:</span> {email}</div>
          <div><span className="font-semibold">Phone Number:</span> {phone}</div>
          <div><span className="font-semibold">Role:</span> {role}</div>
          <div><span className="font-semibold">Skills:</span> {skills.javascript && 'Javascript, '}{skills.css && 'CSS, '}{skills.python && 'Python, '}{skills.firebase && 'Firebase'}</div>
          <div><span className="font-semibold">Date:</span> {date}</div>
          <div><span className="font-semibold">Time:</span> {time}</div>

          {role == 'Manager' ? <>
            <div><span className="font-semibold">Managerial Experience:</span> {mexp}</div>
          </> ? role == 'Designer' : <>
          <div><span className="font-semibold">Relevant Experience:</span> {exp}</div>
          <div><span className="font-semibold">Portfolio Url:</span> {url}</div>
          </> : <div><span className="font-semibold">Relevant Experience:</span> {exp}</div>}
  
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>           
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default App;
