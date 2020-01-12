import React, { useState, useEffect } from 'react';
import 'rbx/index.css';
import { Button, Container, Title, Message } from 'rbx';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import CourseList from './components/CourseList';

const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const firebaseConfig = {
  apiKey: "AIzaSyCswQt2y-FdVL8t3Pt7dFOL_2lzKLIsZeQ",
  authDomain: "course-scheduler-fe519.firebaseapp.com",
  databaseURL: "https://course-scheduler-fe519.firebaseio.com",
  projectId: "course-scheduler-fe519",
  storageBucket: "course-scheduler-fe519.appspot.com",
  messagingSenderId: "907270760093",
  appId: "1:907270760093:web:1a4164c449285952a2d674",
  measurementId: "G-99EX39BLYG"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();


const Banner = ({ user, title }) => (
  <React.Fragment>
    {user ? <Welcome user={user} /> : <SignIn />}
    <Title>{title || '[loading...]'}</Title>
  </React.Fragment>
);

const Welcome = ({ user }) => (
  <Message color="info">
    <Message.Header>
      Welcome, {user.displayName}
      <Button primary onClick={() => firebase.auth().signOut()}>
        Log out
      </Button>
    </Message.Header>
  </Message>
);

const SignIn = () => (
  <StyledFirebaseAuth
    uiConfig={uiConfig}
    firebaseAuth={firebase.auth()}
  />
);







const timeParts = meets => {
  const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
  return !match ? {} : {
    days,
    hours: {
      start: hh1 * 60 + mm1 * 1,
      end: hh2 * 60 + mm2 * 1
    }
  };
};



const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: Object.values(schedule.courses).map(addCourseTimes)
});



const App = () => {
  const [schedule, setSchedule] = useState({ title: '', courses: [] });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) setSchedule(addScheduleTimes(snap.val()));
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return (
    <Container>
      <Banner title={schedule.title} user={user} />
      <CourseList courses={schedule.courses} user={user} />
    </Container>
  );
};

export default App;
export { db };