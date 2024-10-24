import styled from "styled-components";
import { Link } from "react-router-dom";

// Header
export const HeaderStyles = styled.header`
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 10px 0 black;

  * {
    display: inline;
  }
`;

export const NavDiv = styled.nav`
  li {
    margin: 20px;
  }
`;

export const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export const MainContentPageStyles = styled.div`
  margin-top: 100px;
`;

// Card list

export const CardListStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  padding: 20px;
`;

export const CardStyles = styled.div`
  width: 250px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 10px;
  cursor: pointer;
  margin: 10px;
`;

export const HeroImageStyles = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

export const HeroNameStyles = styled.h3`
  font-size: 18px;
  margin: 10px 0;
  color: #333;
`;

// Modal

export const ModalOverlayStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContentStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 600px;
  max-width: 90%;
  text-align: center;
  position: relative;
`;

export const CloseButtonStyles = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

export const DeleteButtonStyles = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

export const UpdateButtonStyles = styled.button`
  background-color: rgba(51, 51, 51, 0.05);
  border-radius: 8px;
  border-width: 0;
  color: #333333;
  cursor: pointer;
  display: inline-block;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  margin: 0;
  padding: 10px 12px;
  text-align: center;
  transition: all 200ms;
  vertical-align: baseline;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
`;

// Update

export const FileInputFieldStyles = styled.input`
  display: none;
`;

export const FileInputLabelStyles = styled.label`
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 5px;
`;

// Create

export const FormDivStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

export const LabelStyles = styled.label`
  font-size: 20px;
  font-weight: bold;
  color: #34495e;
`;

export const InputFieldStyles = styled.input`
  width: 300px;
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

export const TextareaStyles = styled.textarea`
  width: 30%;
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

export const SubmitButtonStyles = styled.button`
  align-items: center;
  appearance: none;
  background-color: #fcfcfd;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395a;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono", monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;

  &:focus {
    box-shadow: #d6d6e7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
  }

  &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: #d6d6e7 0 3px 7px inset;
    transform: translateY(2px);
  }
`;
