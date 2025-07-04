import { useState } from "react";

function AllContacts() {
  const [contactList, setContactList] = useState([
    {
      firstName: "dhana",
      lastName: "Lakshmi",
      number: 8248586535,
    },
    {
      firstName: "shathika",
      lastName: "radhika",
      number: 123456789,
    },
  ]);

  const [newContact, setNewContact] = useState({
    avator: "",
    firstName: "",
    lastName: "",
    number: "",
  });

  const [editContact, setEditContact] = useState({
    firstName: "",
    lastName: "",
    number: "",
  });

  const [modal, setModal] = useState("default");
  const [selectedContactIndex, setSelectedContactIndex] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [edit, setEdit] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleViewContact = (index) => {
    if (selectedContactIndex === index && modal === "viewContact") {
      setModal("default");
      setSelectedContactIndex(null);
      setEdit(false);
    } else {
      setSelectedContactIndex(index);
      setModal("viewContact");
      setEdit(false);
      setEditContact(contactList[index]);
    }
  };

  const avator = (firstName, secondName) => {
    const letter1 = firstName.charAt(0);
    const letter2 = secondName.charAt(0);
    return (letter1 + letter2).toUpperCase();
  };

  const deleteTask = (indexToDelete) => {
    const updatedList = contactList.filter(
      (_, index) => index !== indexToDelete
    );
    setContactList(updatedList);
    setModal("default");
    setSelectedContactIndex(null);
  };

  const addNewContact = (event) => {
    const regexp = /^\d{10}$/;
    event.preventDefault();
    if (
      newContact.firstName.trim() === "" ||
      newContact.lastName.trim() === "" ||
      newContact.number.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }
    if (!regexp.test(newContact.number)) {
      alert("Phone number is invalid");
      return;
    }

    setContactList((prevList) => [...prevList, newContact]);
    setNewContact({ firstName: "", lastName: "", number: "" });
    setModal("default");
  };

  const saveEdit = (e) => {
    e.preventDefault();
    setContactList((prev) =>
      prev.map((c, i) => (i === selectedContactIndex ? editContact : c))
    );
    setModal("default");
    setSelectedContactIndex(null);
    setEdit(false);
  };

  const sortedContact = [...contactList].sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );

  const filteredContact = sortedContact.filter((contact) => {
    const lower = searchInput.toLowerCase();
    return (
      contact.firstName.toLowerCase().includes(lower) ||
      contact.lastName.toLowerCase().includes(lower) ||
      contact.number.toString().includes(lower)
    );
  });

  return (
    <div className="mainContainer">
      <div className="firstHalf">
        <h1 className="title">Contacts</h1>
        <div className="searchBarAndCreate">
          <input
            type="text"
            placeholder="Search for contacts"
            className="searchBar"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            onClick={() => setModal("addContact")}
            className="designForButton"
          >
            New Contact
          </button>
        </div>

        <ul className="contactBar">
          {filteredContact.map((contact, index) => (
            <div className="singleContact" key={index}>
              <div className="avatorAndName">
                <li className="avatorDesign">
                  {avator(contact.firstName, contact.lastName)}
                </li>
                <div className="names">
                  {contact.firstName} {contact.lastName}
                </div>
              </div>
              <div className="viewAndDeleteButton">
                <button
                  className="viewAndDeleteButtonDesign"
                  onClick={() => handleViewContact(index)}
                >
                  {modal === "viewContact" && selectedContactIndex === index
                    ? "Close"
                    : "View"}
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="viewAndDeleteButtonDesign"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>

      <div className="second-half">
        {modal === "addContact" && (
          <div className="modal">
            <form onSubmit={addNewContact} className="viewModalFixed">
              <h2>Add New Contact</h2>
              <label className="viewNames">
                First name
                <input
                  type="text"
                  name="firstName"
                  value={newContact.firstName}
                  onChange={handleChange}
                  className="inputBox"
                />
              </label>
              <label className="viewNames">
                Last name
                <input
                  type="text"
                  name="lastName"
                  value={newContact.lastName}
                  onChange={handleChange}
                  className="inputBox"
                />
              </label>
              <label className="viewNames">
                Number
                <input
                  type="text"
                  name="number"
                  value={newContact.number}
                  onChange={handleChange}
                  className="inputBox"
                />
              </label>
              <div>
                <button className="designForButton" type="submit">
                  Add Contact
                </button>
                <button
                  className="designForButton"
                  type="button"
                  onClick={() => setModal("default")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )
        }
        {modal === "viewContact" && selectedContactIndex !== null ? (
          <div className="viewModalFixed">
            {edit ? (
              <form onSubmit={saveEdit} className="editForm">
                <input
                  name="firstName"
                  value={editContact.firstName}
                  onChange={handleEditChange}
                />
                <input
                  name="lastName"
                  value={editContact.lastName}
                  onChange={handleEditChange}
                />
                <input
                  name="number"
                  value={editContact.number}
                  onChange={handleEditChange}
                />
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => {
                    setEdit(false);
                    setModal("default");
                    setSelectedContactIndex(null);
                  }}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div className="viewDetails">
                <h2>{contactList[selectedContactIndex].firstName}</h2>
                <h3>{contactList[selectedContactIndex].lastName}</h3>
                <p>{contactList[selectedContactIndex].number}</p>
                <button
                  className="designForButton"
                  onClick={() => setEdit(true)}
                >
                  Edit
                </button>
                <button
                  className="designForButton"
                  onClick={() => {
                    setModal("default");
                    setSelectedContactIndex(null);
                  }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        ) : (
          <img
            className="imageDesign"
            src="./assests/image.png"
            alt="profile"
          />
        )}
      </div>
    </div>
  );
}

export default AllContacts;
