import { useState } from 'react';
import './contacts.css'

function Contacts(props) {
  return (
    <div Class="contacts">
      <h1>Hello World!</h1>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
      <p>Hobbies: {props.hobbies}</p>
      <p>PhoneNumber: {props.phoneNumber}</p>
    </div>
  );
}

export default Contacts;