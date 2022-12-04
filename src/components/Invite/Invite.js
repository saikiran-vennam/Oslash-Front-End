import React, { useState } from "react";
import cancel from "../../images/Vectorcross.png";
import questionIcon from "../../images/question.png"
import { useMyContext } from "../../context/useContext";
import { useNavigate } from "react-router-dom";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Invite.css";

const Invite = () => {
  const navigate = useNavigate();
  const [selectedaccess, setSelectedAccess] = useState("No access");
  const { setMemberlist, memberslist, grouplist, setGrouplist, selectedUser, setSelectedUser, isselect, setIsselect } = useMyContext();
  
  const myfunction = (e) => {
    let search = e.target.value.toUpperCase().trim();
    if (search === "")  document.location.reload();
    let updatedGroup = [...grouplist];

    updatedGroup = updatedGroup.filter((group) => {
      let name = group.branch.toUpperCase();
      return name.indexOf(search) !== -1;
    });

    let updatedList = [...memberslist];
    updatedList = updatedList.filter((member) => {
      let name = member.name.toUpperCase();
      return name.indexOf(search) !== -1;
    });

    setGrouplist(updatedGroup);
    setMemberlist(updatedList);
  };

  const handleCancel = (idx) => {
    let filerarry = selectedUser.filter((user, i) => i !== idx);

    if (filerarry.length === 0)  document.location.reload();
    setSelectedUser(filerarry);
  };

  function checkPresentData(arr, data) {
    for (let i = 0; i < arr.length; i++)  if (arr[i].name === data.name)  return i;
    return -1;
  }

  const handleInvite = () => {
    if (selectedUser.length === 0) return;
    else if (selectedUser.length === 1) {
      let [data] = selectedUser;
      data.access = selectedaccess;
      if (localStorage.getItem("selectedUser") === null) localStorage.setItem("selectedUser", "[]");
      const oldData = JSON.parse(localStorage.getItem("selectedUser"));
      let i = checkPresentData(oldData, data);
      if (i === -1) {
        oldData.push(data);
        localStorage.setItem("selectedUser", JSON.stringify(oldData));
      } else {
        oldData[i].access = selectedaccess;
        localStorage.setItem("selectedUser", JSON.stringify(oldData));
      }
      navigate("/");
      document.location.reload();
    } else {
      alert("please select one person");
    }
  };

    const  checkSelected=(data)=>{
      let usercount=0;
      let branchcount=0;
       for(let i=0;i<selectedUser.length;i++){
          if(selectedUser[i].name===data.name) usercount++;
          if(selectedUser[i].branch===data.branch) branchcount++;
       }
     if(usercount===0 || branchcount===0) return false
     else return true
  }
  
      const handleSelect=(data)=>{
          if(checkSelected(data))return
          else setSelectedUser([...selectedUser,data]);
      }
  return (
    <div className="invite-container">
      <div className="invite-card">
        <div className="invite-card-top">
            <div id="invite-card-top-input">
              {selectedUser.length === 0 ? (
                <input type="text" placeholder="Search emails, names or groups" onChange={myfunction}/>
              ) : (
                <div className="selected-name-container">
                {selectedUser.map((user, i) => {
                  return (
                    <span className="selected-name" key={i}>
                      {user.name === undefined ? ( <span>{user.branch}</span> ) : ( <span>{user.name}</span> )}
                      <img src={cancel} alt="Cancel" onClick={() => handleCancel(i)}/>
                    </span>
                  );
                })}

                </div>
              )}
            </div>
            <div className="invite-card-top-right">
              <div className="drop-down-container">
                {isselect ? (
                  <DropdownButton title="Full access" id="dropdown-menu-align-right" onSelect={(e) => setSelectedAccess(e)} variant="none">
                    <Dropdown.Item eventKey="Full Access">Full Access</Dropdown.Item>
                    <Dropdown.Item eventKey="Can edit">Can edit</Dropdown.Item>
                    <Dropdown.Item eventKey="Can view">Can view</Dropdown.Item>
                    <Dropdown.Item eventKey="No access" style={{ color: "red" }}>No access</Dropdown.Item>
                  </DropdownButton>
                ) : (
                  <>
                    <span>
                      <Dropdown.Toggle variant="failure" title="Full access" id="dropdown-menu-align-right" onClick={() => selectedUser.length > 0 && setIsselect(!isselect)}>Full access</Dropdown.Toggle>
                    </span>
                  </>
                )}
              </div>
              <div className="invite-top-btn"><button onClick={handleInvite}>Invite</button></div>
            </div>
        </div>
        <div className="invite-card-main">
        <div className="invite-select-person">Select a person</div>
        {memberslist.slice(0,2).map((member,i)=>{
                return(
                    <div className="member-container" key={i} onClick={()=>handleSelect(member)} >                  
                        <img src={member.profileImg} alt="" />
                        <h6>{member.name}</h6>              
                    </div>
                )
            })
        }
         <div  className="invite-select-person">Select a group</div>
        {grouplist.slice(0,2).map((group,i)=>{
                return(
                    <div className="member-container" key={i} onClick={()=>handleSelect(group)}>
                        <img src={group.profileImg} alt="" />
                        <h6>{group.branch}</h6>  
                    </div>
                )
            })
        }
        </div>
        <div className="invite-card-footer">
        <div className="invite-card-footer-left">
          <img className="invite-card-footer-img" src={questionIcon} alt="Question Mark"/>
          <span className="invite-card-footer-text">learn about sharing</span>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Invite;
