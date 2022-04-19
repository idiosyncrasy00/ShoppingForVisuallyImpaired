import { useSelector } from "react-redux";

function MainSection() {
  return (
    <p>lorenthes sdfhdshfs
      fsadgfhjksdhfsad
      fsadjfahskdhf</p>
  );
}

function About() {
  const counter = useSelector((state) => state.counter);
  return (
    <>
      <h1>This is about page</h1>
      <h1>The counter is {counter}</h1>
      <MainSection />
    </>
  );
}

export default About;