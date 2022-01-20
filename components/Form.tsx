import React, { useRef, useState } from "react";
import styled from "styled-components";
import { color, mixin } from "../shered/styles";

const StyledForm = styled.form`
  height: 20vh;
  background: linear-gradient(
    to left,
    ${mixin.lighten(color.primary, 0.15)},
    ${color.primary}
  );
  ${mixin.center}
  flex-wrap: wrap;
`;

const StyledFormInput = styled.input`
  ${mixin.placeholderColor(mixin.lighten(color.primary, 0.3))};
  color: ${mixin.darken(color.primary, 0.5)};
  width: 70%;
  max-width: 28rem;
  height: 4rem;
  line-height: 3rem;
  font-size: 1.8rem;
  padding: 0.25rem 2rem;
  border-top-left-radius: 2.1rem;
  border-bottom-left-radius: 2.1rem;
  border: none;
`;
const StyledFormButton = styled.button`
  background: linear-gradient(
    to right,
    ${color.primary},
    ${mixin.darken(color.primary, 0.15)}
  );
  color: white;
  height: 4rem;
  width: 30%;
  max-width: 13rem;
  font-size: 1.8rem;
  border-top-right-radius: 2.1rem;
  border-bottom-right-radius: 2.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${mixin.darken(color.primary, 0.35)};
  }
  svg {
    stroke: white;
    margin-right: 0.5rem;
  }
`;

interface FormProps {
  onSubmit: Function;
}

const Form = ({ onSubmit }: FormProps) => {
  const [input, setInput] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.length >= 3) {
      onSubmit(input);
    }
  };
  return (
    <StyledForm onSubmit={submitHandler}>
      <StyledFormInput
        type="text"
        placeholder="Search for the weather"
        value={input}
        onChange={changeHandler}
      />
      <StyledFormButton>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={"2rem"}
          height={"2rem"}
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        Search
      </StyledFormButton>
    </StyledForm>
  );
};

export default Form;
